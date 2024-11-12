using AuthScape.Document.Mapping.Models;
using AuthScape.Document.Mapping.Models.Attributes;
using AuthScape.Models.Exceptions;
using AuthScape.Services;
using ClosedXML.Excel;
using CsvHelper;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Services;
using Services.Context;
using System.Globalization;
using System.Reflection;
using System.Reflection.Metadata;

namespace AuthScape.Document.Mapping.Services
{
    public class DynamicTableMapping : DynamicTableMappingBase
    {
        readonly DatabaseContext databaseContext;
        readonly IFileMappingService fileMappingService;
        IFormRecognizerService formRecognizerService;
        public DynamicTableMapping(DatabaseContext databaseContext, IFileMappingService fileMappingService, IFormRecognizerService formRecognizerService) : base(databaseContext, fileMappingService, formRecognizerService)
        {
            this.databaseContext = databaseContext;
            this.fileMappingService = fileMappingService;
            this.formRecognizerService = formRecognizerService;
        }

        public async Task ExecutePublishedRows(long companyId, long documentComponentId, List<PublishedRow> PublishedRows)
        {
            var loadedObjects = new List<object>();

            var documentComponent = await databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .AsNoTracking()
                .Where(d => d.Id == documentComponentId && d.CompanyId == companyId)
                .FirstOrDefaultAsync();

            var newInstance = CreateInstanceOfObject(documentComponent.DocumentType.AssemblyFullName, documentComponent.DocumentType.TypeName);
            var databaseColumns = newInstance.Unwrap().GetType().GetProperties();

            var headerVals = new List<FileHeader>();

            int columnNumber = 0;
            foreach (var cells in databaseColumns)
            {
                var isRequired = !cells.IsMarkedAsNullable();

                // if the hidden attribute is added, then we can ignore the is required here...
                var customAttributes = cells.GetCustomAttributes();
                foreach (var customAttribute in customAttributes)
                {
                    if (customAttribute is HideColumnAttribute)
                    {
                        isRequired = false;
                        break;
                    }
                }

                headerVals.Add(new FileHeader()
                {
                    Name = cells.Name.Replace("\n", " "),
                    ColumnNumber = columnNumber,
                    ToValue = null,
                    RowNumber = documentComponent.HeaderRow - 1,
                    IsRequired = isRequired
                });
                columnNumber++;
            }

            await FindHeaderMatch(documentComponent.Id, headerVals, databaseColumns, companyId);


            // mapping (change this)
            var mappings = await databaseContext.DocumentMappings.Where(d =>
                d.DocumentComponentId == documentComponent.Id).ToListAsync();


            foreach (var row in PublishedRows)
            {
                await CreateObjectBasedOnHeader(mappings, null, loadedObjects, documentComponent, headerVals, true, (columnNumber, header, columnName) =>
                {
                    var cell = row.Cells
                        .Where(c => c.ColumnId.ToLower() == columnName.ToLower())
                        .FirstOrDefault();

                    if (cell != null)
                    {
                        return cell.Text;
                    }

                    return "";
                });
            }

            await CommitChanges(false, loadedObjects, documentComponent);
        }

        public async Task<List<object>> Execute(long companyId, string container, string baseUri, long documentComponentId, bool isTraining = false, bool isPreview = false)
        {
            string baseUrl = baseUri + "/" + container + "/"; // this will change soon!

            var documentComponent = await databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .AsNoTracking()
                .Where(d => d.Id == documentComponentId && d.CompanyId == companyId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                var uri = baseUrl + documentComponent.FileUri;

                // download the file into a stream
                var httpClient = new HttpClient();
                var response = await httpClient.GetAsync(uri);
                var stream = await response.Content.ReadAsStreamAsync();
                stream.Seek(0, SeekOrigin.Begin);

                PropertyInfo[] databaseColumns = null;
                if (documentComponent.DocumentType.Type != DocumentTypeEnum.DynamicMapping)
                {
                    var newInstance = CreateInstanceOfObject(documentComponent.DocumentType.AssemblyFullName, documentComponent.DocumentType.TypeName);
                    databaseColumns = newInstance.Unwrap().GetType().GetProperties();
                }
                else
                {
                    var testInstance = new
                    {
                        HelloWorld = "",
                        Weee = ""
                    };
                    databaseColumns = testInstance.GetType().GetProperties();
                }

                var fileInfo = new FileInfo(documentComponent.FileUri);
                var ext = fileInfo.Extension.ToLower();
                if (ext == ".xlsx")
                {
                    // read using closeXML
                    return await ReadExcelFile(companyId, documentComponent, stream, databaseColumns, isTraining, isPreview);
                }
                else if (ext == ".csv")
                {
                    // read the file stream (currently we will start with CSV)
                    return await ReadCSVFile(companyId, documentComponent, stream, databaseColumns, isTraining, isPreview);
                }
                else if (ext == ".sif")
                {
                    // testing for reading
                }
                else if (ext == ".pdf" || ext == ".jpeg" || ext == ".jpg" || ext == ".png" || ext == ".gif")
                {
                    // pdf/image process
                    return await OCRReader(companyId, documentComponent, stream, databaseColumns, isTraining, isPreview);
                }
            }

            throw new BadRequestException("Not supported");
        }

        private async Task<List<object>> ReadExcelFile(long companyId, DocumentComponent documentComponent, Stream openStream, PropertyInfo[] propertyInfos, bool isTraining = false, bool isPreviewMode = false)
        {
            var loadedObjects = new List<object>();
            var headerVals = new List<FileHeader>();

            using (var workbook = new XLWorkbook(openStream))
            {
                var worksheet = workbook.Worksheets.First(); // Assuming you want the first worksheet.

                var lookForHeaderRow = worksheet.RowsUsed().Skip(documentComponent.HeaderRow - 1);

                var header = lookForHeaderRow.FirstOrDefault();
                if (header != null)
                {
                    // store all the header values
                    foreach (var cells in header.Cells())
                    {
                        headerVals.Add(new FileHeader()
                        {
                            Name = cells.GetString().Replace("\n", " "),
                            ColumnNumber = cells.Address.ColumnNumber,
                            ToValue = null,
                            RowNumber = documentComponent.HeaderRow - 1
                        });
                    }

                    // find the header matches
                    await FindHeaderMatch(documentComponent.Id, headerVals, propertyInfos, companyId);

                    // mapping
                    var mappings = await databaseContext.DocumentMappings.Where(d =>
                        d.DocumentComponentId == documentComponent.Id).ToListAsync();


                    // Add the fields to the object based on the excel sheet and matching field names against the column positioning
                    var rowTrainingIndex = 0;
                    foreach (var row in lookForHeaderRow.Skip(1))
                    {
                        if (!isTraining)
                        {
                            if (documentComponent.DocumentType.Type == DocumentTypeEnum.Database || documentComponent.DocumentType.Type == DocumentTypeEnum.CustomModel)
                            {
                                // assign the values for the object
                                var shouldSkip = await CreateObjectBasedOnHeader(mappings, propertyInfos, loadedObjects, documentComponent, headerVals, false, (columnNumber, header, columnName) =>
                                {
                                    return row.Cell(columnNumber).GetString();
                                });

                                if (shouldSkip != null && shouldSkip.Value == true) // we are going to skip this row
                                {
                                    continue;
                                }
                            }
                            else if (documentComponent.DocumentType.Type == DocumentTypeEnum.DynamicMapping)
                            {
                                await AssignDynamicMappingData(companyId, documentComponent, (name) =>
                                {
                                    return row.Cell(name).GetString();
                                });
                            }
                        }
                        // Training 
                        else
                        {
                            if (rowTrainingIndex > 0)
                            {
                                break;
                            }

                            await AssignTrainingData(companyId, documentComponent, headerVals, propertyInfos);
                            rowTrainingIndex++;
                        }
                    }


                    if (!isPreviewMode)
                    {
                        await CommitChanges(isTraining, loadedObjects, documentComponent);
                    }
                }
            }

            return loadedObjects;
        }

        private async Task<List<object>> ReadCSVFile(long companyId, DocumentComponent documentComponent, Stream openStream, PropertyInfo[] propertyInfos, bool isTraining = false, bool isPreviewMode = false)
        {
            var loadedObjects = new List<object>();
            var data = new Dictionary<string, string>();

            var headerVals = new List<FileHeader>();

            openStream.Seek(0, SeekOrigin.Begin);

            using (var reader = new StreamReader(openStream))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // need to change this to read the position of the header
                int columnNumber = 0;

                for (int i = 0; i < documentComponent.HeaderRow; i++)
                {
                    csv.Read();
                }

                var rowTrainingIndex = 0;

                csv.ReadHeader();
                if (csv.HeaderRecord != null)
                {
                    foreach (var header in csv.HeaderRecord)
                    {
                        headerVals.Add(new FileHeader()
                        {
                            Name = header.Replace("\n", " "),
                            ColumnNumber = columnNumber,
                            ToValue = null,
                            RowNumber = documentComponent.HeaderRow
                        });
                        columnNumber++;
                    }
                }

                await FindHeaderMatch(documentComponent.DocumentTypeId, headerVals, propertyInfos, companyId);


                // mapping
                var mappings = await databaseContext.DocumentMappings.Where(d =>
                    d.DocumentComponentId == documentComponent.Id).ToListAsync();


                while (csv.Read())
                {
                    bool allowRead = false;
                    foreach (var rec in csv.Parser.Record)
                    {
                        if (!string.IsNullOrWhiteSpace(rec))
                        {
                            allowRead = true;
                        }
                    }

                    if (!allowRead)
                    {
                        continue;
                    }

                    if (!isTraining)
                    {
                        if (documentComponent.DocumentType.Type == DocumentTypeEnum.Database || documentComponent.DocumentType.Type == DocumentTypeEnum.CustomModel)
                        {
                            // assign the values for the object
                            var shouldSkip = await CreateObjectBasedOnHeader(mappings, propertyInfos, loadedObjects, documentComponent, headerVals, false, (columnNumber, header, columnName) =>
                            {
                                var fieldValue = csv.GetField(columnNumber);
                                if (!String.IsNullOrWhiteSpace(fieldValue))
                                {
                                    return fieldValue;
                                }
                                else
                                {
                                    return "";
                                }
                            });

                            if (shouldSkip != null && shouldSkip.Value == true) // we are going to skip this row
                            {
                                continue;
                            }
                        }
                        else if (documentComponent.DocumentType.Type == DocumentTypeEnum.DynamicMapping)
                        {
                            await AssignDynamicMappingData(companyId, documentComponent, (name) =>
                            {
                                var fieldValue = csv.GetField(name);

                                if (!String.IsNullOrWhiteSpace(fieldValue))
                                {
                                    return fieldValue;
                                }
                                else
                                {
                                    return "";
                                }

                            });
                        }
                    }
                    // training data
                    else
                    {
                        if (rowTrainingIndex > 0)
                        {
                            break;
                        }

                        await AssignTrainingData(companyId, documentComponent, headerVals, propertyInfos);
                        rowTrainingIndex++;
                    }
                }


                if (!isPreviewMode)
                {
                    await CommitChanges(isTraining, loadedObjects, documentComponent);
                }
            }

            return loadedObjects;
        }

        private async Task<List<object>> OCRReader(long companyId, DocumentComponent documentComponent, Stream openStream, PropertyInfo[] propertyInfos, bool isTraining = false, bool isPreviewMode = false)
        {
            string azureModuleId = "prebuilt-invoice";

            var loadedObjects = new List<object>();
            var headerVals = new List<FileHeader>();

            var response = await formRecognizerService.RunAnalysis(openStream, azureModuleId);

            foreach (var header in response.FormRecognizerDocument)
            {
                foreach (var field in header.Fields)
                {
                    headerVals.Add(new FileHeader()
                    {
                        Name = field.FieldName.Replace("\n", " "),
                        ColumnNumber = 0,
                        ToValue = null,
                        RowNumber = 0
                    });
                }
            }

            await FindHeaderMatch(documentComponent.Id, headerVals, propertyInfos, companyId);

            // mapping
            var mappings = await databaseContext.DocumentMappings.Where(d =>
                d.DocumentComponentId == documentComponent.Id).ToListAsync();

            if (!isTraining)
            {
                await CreateObjectBasedOnHeader(mappings, propertyInfos, loadedObjects, documentComponent, headerVals, false, (columnNumber, header, columnName) =>
                {
                    // we are only reading one document at a time right now
                    var firstDocument = response.FormRecognizerDocument.FirstOrDefault();
                    if (firstDocument != null)
                    {
                        var field = firstDocument.Fields.Where(f => f.FieldName.ToLower() == columnName.ToLower()).FirstOrDefault();
                        if (field != null)
                        {
                            return field.Value;
                        }
                    }

                    return "";
                });
            }
            // training
            else
            {
                await AssignTrainingData(companyId, documentComponent, headerVals, propertyInfos);
            }

            if (!isPreviewMode)
            {
                await CommitChanges(isTraining, loadedObjects, documentComponent);
            }

            return loadedObjects;
        }
    }
}