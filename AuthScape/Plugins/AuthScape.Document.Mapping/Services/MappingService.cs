using ClosedXML.Excel;
using CoreBackpack;
using CsvHelper;
using Microsoft.AspNetCore.Http;
using Services.Context;
using System.Globalization;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using AuthScape.Document.Mapping.Models;
using System.Text;
using System.Runtime.Remoting;
using AuthScape.OpenAI;
using AuthScape.Models.Exceptions;
using CoreBackpack.Azure;
using Services.Database;
using Microsoft.Extensions.Options;
using AuthScape.Spreadsheet;
using AuthScape.Spreadsheet.Models;
using AuthScape.Spreadsheet.Models.Elements;
using Services;
using AuthScape.Document.Mapping.Models.Attributes;
using AuthScape.Services;
using CoreBackpack.Time;

namespace AuthScape.Document.Mapping.Services
{
    public interface IMappingService
    {
        Task TrainDocument(IFormFile file, long documentComponentId, int rowsToTrain = 50, long? companyId = null, long? locationId = null, long? userId = null, string azureModuleId = "prebuilt-invoice");
        //Task<T?> Execute<T>(IFormFile file, DocumentOptions documentOptions, Action<T> Row = null);
        Task<List<object>> Execute(IFormFile file, long documentTypeId, DocumentOptions documentOptions, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic>? Row = null);
        Task<DocumentMappingQuery> GetMapping(long documentComponentId, long? companyId = null, long? locationId = null, long? userId = null);
        Task<PagedList<DocumentType>> GetDocumentTypes(int? offset = null, int? length = null);
        Task AssignNameValue(Guid Id, string field, string value);
        Task AssignFileColumnFromColumn(string tableName, string columnName, string fileColumn, long? companyId = null, long? locationId = null, long? userId = null);
        Task<List<string>> GetMappingFieldsForDocument(long documentId);
        Task AssignToName(Guid Id, string field, string value);
        Task<DocumentComponent> CreateDocument(string name, long typeOfDocumentId, long? companyId = null, long? locationId = null, long? userId = null);
        Task<PagedList<DocumentComponent>> GetDocumentComponents(DocumentComponentStatus status = DocumentComponentStatus.Open, long? companyId = null, long? userId = null, long? locationId = null, int? offset = null, int? length = null);
        Task<List<DatabaseTable>> GetAllTablesFromDatabase();
        Task<long?> AddDataSource(DocumentAddDataSource document);
        Task RemoveMatch(long companyId, long documentId, Guid documentMappingId);
        Task RemoveColumnFromDocumentMapping(Guid documentMappingId, long documentComponentId);
        Task SubmittedMappedDocument(long CompanyId, long DocumentComponentId);

        Task UpdateHeaderRow(long DocumentComponentId, int headerRow);

        Task<int> GetHeaderRow(long documentComponentId);

        Task<DocumentComponent> SyncDocument(IFormFile file, long companyId, long documentTypeId);
        Task<AuthScape.Spreadsheet.Models.SpreadSheetData?> GetDynamicDocument(long companyId);
        Task<List<Models.Attribute>> GetMappedDynamicFieldsForCompany(long companyId, long documentId);
        Task AddNewColumnAndMapping(NewColumnWithMapping mapping);
        Task AssignMapping(long companyId, long documentId, string FileColumnName, string MatchedColumn, bool OnlyAddRowIfColumnFound, bool RememberForNextTime);
        Task CancelUpload(long documentId, long? companyId = null);
        Task Publish(long companyId, long documentId, List<PublishedRow>? PublishedRows);
        Task<Spreadsheet.Models.SpreadSheetData> PreviewSpreadsheet(long companyId, long documentComponentId);
        Task AssignAdvancedRules(DocumentFilterForPreview documentFilter);
        Task<string?> GetRules(long documentComponentId);
    }

    public class MappingService : IMappingService
    {
        readonly IFileMappingService fileMappingService;
        readonly DatabaseContext databaseContext;
        readonly IOpenAIService openAIService;
        readonly IFormRecognizerService formRecognizerService;
        readonly IBlobStorage blobStorage;
        readonly AppSettings appSettings;
        readonly ISpreadsheetService spreadsheetService;
        readonly IUserManagementService userManagementService;
        public MappingService(DatabaseContext databaseContext, IUserManagementService userManagementService, IOpenAIService openAIService, ISpreadsheetService spreadsheetService, IFormRecognizerService formRecognizerService, IFileMappingService fileMappingService, IBlobStorage blobStorage, IOptions<AppSettings> appSettings)
        {
            this.databaseContext = databaseContext;
            this.openAIService = openAIService;
            this.formRecognizerService = formRecognizerService;
            this.blobStorage = blobStorage;
            this.appSettings = appSettings.Value;
            this.spreadsheetService = spreadsheetService;
            this.fileMappingService = fileMappingService;
            this.userManagementService = userManagementService;
        }

        public async Task AssignAdvancedRules(DocumentFilterForPreview documentFilter)
        {
            var documentComponent = await databaseContext.DocumentComponents
                .Where(d => d.Id == documentFilter.DocumentComponentId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                documentComponent.Rules = documentFilter.Rules;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<string?> GetRules(long documentComponentId)
        {
            var documentComponent = await databaseContext.DocumentComponents
                .Where(d => d.Id == documentComponentId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                return documentComponent.Rules;
            }

            return null;
        }

        public async Task AssignMapping(long companyId, long documentId, string FileColumnName, string MatchedColumn, bool OnlyAddRowIfColumnFound, bool RememberForNextTime)
        {
            var documentMapping = await databaseContext.DocumentMappings.Where(d =>
                    d.CompanyId == companyId &&
                    d.DocumentComponentId == documentId &&
                    d.Name.ToLower() == FileColumnName.ToLower()
                ).FirstOrDefaultAsync();

            if (documentMapping != null)
            {
                documentMapping.ToName = MatchedColumn;

                documentMapping.OnlyAddRowIfColumnFound = OnlyAddRowIfColumnFound;
                documentMapping.RememberForNextTime = RememberForNextTime;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<long?> AddDataSource(DocumentAddDataSource newDocument)
        {
            if (newDocument.DocumentType == DocumentTypeEnum.Database)
            {
                var document = await databaseContext.DocumentTypes.Where(d => d.TableName.ToLower() == newDocument.DataTable.ToLower() && d.Type == newDocument.DocumentType).FirstOrDefaultAsync();
                if (document == null)
                {
                    // get the database context
                    var tables = await GetAllTablesFromDatabase();

                    var table = tables.Where(d => d.TableName.ToLower() == newDocument.DataTable.ToLower()).FirstOrDefault();
                    if (table == null)
                    {
                        return null;
                    }

                    var docType = new DocumentType()
                    {
                        Name = newDocument.Name,
                        TableName = newDocument.DataTable,
                        TypeName = table.TypeName,
                        AssemblyFullName = table.AssemblyName,
                        Type = newDocument.DocumentType
                    };

                    await databaseContext.DocumentTypes.AddAsync(docType);
                    await databaseContext.SaveChangesAsync();

                    return docType.Id;
                }
            }
            else if (newDocument.DocumentType == DocumentTypeEnum.DynamicMapping)
            {
                var docType = new DocumentType()
                {
                    Name = newDocument.Name,
                    TableName = newDocument.DataTable,
                    TypeName = "",
                    AssemblyFullName = "",
                    Type = newDocument.DocumentType
                };

                await databaseContext.DocumentTypes.AddAsync(docType);
                await databaseContext.SaveChangesAsync();
            }
            else if (newDocument.DocumentType == DocumentTypeEnum.CustomModel)
            {
                var docType = new DocumentType()
                {
                    Name = newDocument.Name,
                    TableName = newDocument.Name,
                    TypeName = newDocument.TypeName,
                    AssemblyFullName = newDocument.AssemblyFullName,
                    Type = newDocument.DocumentType
                };

                // detect if the model exists
                var instance = CreateInstanceOfObject(newDocument.AssemblyFullName, newDocument.TypeName);
                var newInstance = instance.Unwrap();
                var databaseColumns = GetAllProperties(newInstance);

                if (databaseColumns.Count() > 0)
                {
                    // created a new records
                    await databaseContext.DocumentTypes.AddAsync(docType);
                    await databaseContext.SaveChangesAsync();
                }
                else
                {
                    throw new BadRequestException("NotFound");
                }
            }

            return null;
        }

        public async Task<int> GetHeaderRow(long documentComponentId)
        {
            var documentComponent = await databaseContext
                .DocumentComponents.Where(d => d.Id == documentComponentId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                return documentComponent.HeaderRow;
            }

            return 1;
        }


        public async Task<List<DatabaseTable>> GetAllTablesFromDatabase()
        {
            var tables = new List<DatabaseTable>();

            var documentTypes = await databaseContext.DocumentTypes.Select(d => d.TableName.ToLower()).ToListAsync();

            var allDatabaseProperties = GetAllProperties(databaseContext);
            foreach (var propertyInfo in allDatabaseProperties)
            {
                if (propertyInfo.Name == "OpenIddictApplications" || propertyInfo.Name == "OpenIddictAuthorizations" || propertyInfo.Name == "OpenIddictScopes" || propertyInfo.Name == "OpenIddictTokens")
                {
                    continue;
                }

                try
                {
                    if (!documentTypes.Where(d => d == propertyInfo.Name.ToLower()).Any())
                    {
                        var argument = propertyInfo.PropertyType.GenericTypeArguments.FirstOrDefault();
                        if (argument != null)
                        {


                            tables.Add(new DatabaseTable()
                            {
                                TableName = propertyInfo.Name,
                                TypeName = argument.FullName,
                                AssemblyName = argument.Assembly.GetName().Name,
                            });
                        }
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return tables.OrderBy(d => d.TableName).ToList();
        }

        public async Task RemoveMatch(long companyId, long documentId, Guid documentMappingId)
        {
            var documentMapping = await databaseContext.DocumentMappings
                .Where(d => d.CompanyId == companyId &&
                    d.DocumentComponentId == documentId &&
                    d.Id == documentMappingId)
                .FirstOrDefaultAsync();

            if (documentMapping != null)
            {
                documentMapping.ToName = "";
                documentMapping.IsSearchableKey = false;
                documentMapping.AttributeFieldType = 0;
                documentMapping.Description = null;
                documentMapping.RememberForNextTime = false;
                documentMapping.OnlyAddRowIfColumnFound = false;
                documentMapping.IsNewColumn = false;

                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task AddNewColumnAndMapping(NewColumnWithMapping mapping)
        {
            var map = await databaseContext.DocumentMappings
                .Where(d =>
                d.CompanyId == mapping.CompanyId &&
                d.DocumentComponentId == mapping.DocumentId &&
                d.Id == mapping.DocumentMappingId)
                .FirstOrDefaultAsync();

            if (map != null)
            {
                map.ToName = mapping.NewColumn;
                map.Description = mapping.Description;
                map.AttributeFieldType = mapping.attributeFieldType;
                map.IsNewColumn = true;

                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<List<string>> GetMappingFieldsForDocument(long documentId)
        {
            var arrayOfProps = new List<string>();

            //arrayOfProps.Add("Enter Value");
            var docType = await databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .Where(t => t.Id == documentId)
                .FirstOrDefaultAsync();

            if (docType != null)
            {
                if (docType.DocumentType.Type == DocumentTypeEnum.Database)
                {
                    var allDatabaseProperties = GetAllProperties(databaseContext);
                    foreach (var propertyInfo in allDatabaseProperties)
                    {
                        // these are the database fields I can connet to
                        var argument = propertyInfo.PropertyType.GenericTypeArguments.FirstOrDefault();
                        if (argument != null && argument.FullName == docType.DocumentType.TypeName)
                        {
                            var props = argument.GetProperties();
                            foreach (var prop in props)
                            {
                                arrayOfProps.Add(prop.Name);
                            }
                        }
                    }
                }
            }

            return arrayOfProps;
        }

        public async Task<List<Models.Attribute>> GetMappedDynamicFieldsForCompany(long companyId, long documentId)
        {
            var documentComponent = await databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .Include(d => d.DocumentMappings)
                .Where(d => d.Id == documentId && d.CompanyId == companyId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                if (documentComponent.DocumentType.Type == DocumentTypeEnum.DynamicMapping)
                {
                    return await databaseContext.Attributes
                        .AsNoTracking()
                        .Where(d => d.CompanyId == companyId)
                        .OrderBy(a => a.Name)
                        .ToListAsync();
                }
                else if (documentComponent.DocumentType.Type == DocumentTypeEnum.Database || documentComponent.DocumentType.Type == DocumentTypeEnum.CustomModel)
                {
                    // pull the model directly based on what is on the record
                    var instance = CreateInstanceOfObject(documentComponent.DocumentType.AssemblyFullName, documentComponent.DocumentType.TypeName);
                    if (instance != null)
                    {
                        var newInstance = instance.Unwrap();
                        if (newInstance != null)
                        {
                            var attributes = new List<AuthScape.Document.Mapping.Models.Attribute>();
                            foreach (var property in newInstance.GetType().GetProperties())
                            {
                                bool dontInclude = false;
                                string attributeName = property.Name;
                                var customAttributes = property.GetCustomAttributes();
                                foreach (var customAttribute in customAttributes)
                                {
                                    if (customAttribute is NameColumnAttribute)
                                    {
                                        attributeName = (customAttribute as NameColumnAttribute)._NewName;
                                    }

                                    if (customAttribute is HideColumnAttribute)
                                    {
                                        dontInclude = true;
                                    }
                                }

                                if (!dontInclude)
                                {
                                    var isMapped = documentComponent.DocumentMappings
                                        .Where(d => d.ToName.ToLower() == property.Name.ToLower())
                                        .Any();

                                    attributes.Add(new Models.Attribute()
                                    {
                                        Id = Guid.Empty,
                                        CompanyId = companyId,
                                        Name = property.Name,
                                        VisibleName = attributeName,
                                        Type = AttributeFieldType.Text,
                                        IsMapped = isMapped,
                                        IsRequired = !property.IsMarkedAsNullable()
                                    });
                                }
                            }

                            return attributes.OrderByDescending(a => a.IsRequired).ThenBy(a => a.VisibleName).ToList();
                        }
                    }
                }
            }

            return null;
        }

        public async Task<DocumentComponent> SyncDocument(IFormFile file, long companyId, long documentTypeId)
        {
            var fileName = file.FileName;

            var fi = new FileInfo(fileName);


            // create a document component
            var newDocComponent = new DocumentComponent()
            {
                CompanyId = companyId,
                DocumentTypeId = documentTypeId,
                Name = fileName,
                HeaderRow = 1 // this will need to be dynamic soon
            };
            await databaseContext.DocumentComponents.AddAsync(newDocComponent);
            await databaseContext.SaveChangesAsync();

            //await TrainDocument(file, newDocComponent.Id, companyId: companyId);


            var storageFileName = newDocComponent.Id + fi.Extension;

            // store file on blob storage...
            await blobStorage.UploadBlob(appSettings.Mapping.AzureConnectionString, appSettings.Mapping.Container, storageFileName, file.OpenReadStream(), true);

            var docFile = await databaseContext.DocumentComponents
                .Where(d => d.Id == newDocComponent.Id)
                .FirstOrDefaultAsync();

            if (docFile != null)
            {
                docFile.FileUri = storageFileName;
                await databaseContext.SaveChangesAsync();
            }

            // we are going to attempt to train the document here...
            var dynamicMapping = new DynamicTableMapping(databaseContext, fileMappingService, formRecognizerService);
            await dynamicMapping.Execute(companyId, appSettings.Mapping.Container, appSettings.Mapping.BaseUri, newDocComponent.Id, true);



            return new DocumentComponent()
            {
                Id = newDocComponent.Id,
                CompanyId = companyId,
                DocumentTypeId = documentTypeId,
                Name = fileName,
                HeaderRow = newDocComponent.HeaderRow
            };
        }

        public async Task<AuthScape.Spreadsheet.Models.SpreadSheetData?> GetDynamicDocument(long companyId)
        {
            var spreadSheetData = new AuthScape.Spreadsheet.Models.SpreadSheetData();
            spreadSheetData.Rows = new List<SpreadSheetRow>();
            spreadSheetData.columns = new List<SpreadSheetColumn>();
            spreadSheetData.HeaderCell = new List<SpreadSheetCellType>();
            var headerCell = new List<SpreadSheetCellType>();
            var sscolumns = new List<SpreadSheetColumn>();

            var attributes = await databaseContext.Attributes
                .AsNoTracking()
                .Where(d => d.CompanyId == companyId)
                .Select(d => new DynamicModelMapped()
                {
                    Id = d.Id,
                    Header = d.Name,
                    Type = d.Type,
                    Values = new List<DynamicModelMappedVal>()
                })
                .ToListAsync();


            foreach (var attribute in attributes)
            {
                var column = new SpreadSheetColumn();
                column.columnId = attribute.Header;

                sscolumns.Add(column);

                headerCell.Add(new SpreadSheetCellType()
                {
                    type = "header",
                    text = attribute.Header
                });
            }

            spreadSheetData.columns = sscolumns;
            spreadSheetData.HeaderCell = headerCell;

            var products = await databaseContext.Sheets
                .Include(p => p.SheetAttributes).ThenInclude(p => p.Attribute)
                .AsNoTracking()
                .Where(p => p.CompanyId == companyId)
                .ToListAsync();

            int rowId = 0;
            foreach (var product in products)
            {
                var spreadsheetRow = new SpreadSheetRow();
                spreadsheetRow.Cells = new List<object>();

                foreach (var attribute in attributes)
                {
                    var sheetAttribute = product.SheetAttributes.Where(d => d.AttributeId == attribute.Id).FirstOrDefault();
                    if (sheetAttribute != null)
                    {
                        GenerateTypeOfField(spreadsheetRow, sheetAttribute, attribute);
                    }
                    else
                    {
                        GenerateTypeOfField(spreadsheetRow, sheetAttribute, attribute);
                    }
                }

                spreadsheetRow.RowId = (rowId + 1);
                spreadSheetData.Rows.Add(spreadsheetRow);

                rowId++;
            }

            return spreadSheetData;
        }

        private void GenerateTypeOfField(SpreadSheetRow spreadsheetRow, SheetAttribute? sheetAttribute, DynamicModelMapped attribute)
        {
            // store the value in the cell
            if (attribute.Type == AttributeFieldType.Text)
            {
                var textCell = new TextCellElement();
                textCell.ColumnId = attribute.Header;
                textCell.Text = sheetAttribute != null ? sheetAttribute.Value : "";
                spreadsheetRow.Cells.Add(textCell);

            }
            else if (attribute.Type == AttributeFieldType.Boolean)
            {
                var checkBoxCell = new CheckboxCellElement();
                checkBoxCell.ColumnId = attribute.Header;
                checkBoxCell.Checked = false;

                if (sheetAttribute != null)
                {
                    if (!String.IsNullOrWhiteSpace(sheetAttribute.Value))
                    {
                        checkBoxCell.Checked = Convert.ToBoolean(sheetAttribute.Value); // should probably make this a try boolean instead...
                    }
                }

                spreadsheetRow.Cells.Add(checkBoxCell);
            }
            else if (attribute.Type == AttributeFieldType.Integer)
            {
                var numberCell = new NumberCellElement();
                numberCell.ColumnId = attribute.Header;

                numberCell.NanToZero = false;
                numberCell.HideZero = true;

                if (sheetAttribute != null)
                {
                    if (!String.IsNullOrWhiteSpace(sheetAttribute.Value))
                    {
                        numberCell.Value = Convert.ToDecimal(sheetAttribute.Value); // should probably make this a try int instead...
                    }
                }

                spreadsheetRow.Cells.Add(numberCell);
            }
            else if (attribute.Type == AttributeFieldType.Decimal)
            {
                var numberCell = new MoneyCellElement();
                numberCell.ColumnId = attribute.Header;

                numberCell.NanToZero = false;
                numberCell.HideZero = true;

                if (sheetAttribute != null)
                {
                    if (!String.IsNullOrWhiteSpace(sheetAttribute.Value))
                    {
                        numberCell.Value = Convert.ToDecimal(sheetAttribute.Value); // should probably make this a try int instead...
                    }
                }

                spreadsheetRow.Cells.Add(numberCell);
            }
            else // if we can't find it, just make it text
            {
                var textCell = new TextCellElement();
                textCell.ColumnId = attribute.Header;
                textCell.Text = sheetAttribute != null ? sheetAttribute.Value : "";
                spreadsheetRow.Cells.Add(textCell);
            }
        }

        public async Task SubmittedMappedDocument(long CompanyId, long DocumentComponentId)
        {
            var submitted = await databaseContext.DocumentComponents
                .Include(d => d.DocumentMappings)
                .Where(d => d.Id == DocumentComponentId)
                .FirstOrDefaultAsync();

            if (submitted != null)
            {
                bool hasNewHeader = false;
                foreach (var mapping in submitted.DocumentMappings)
                {
                    if (mapping.ToName == "** Add new column **") // add a new column to document attributes
                    {
                        // look at the mapping, add new fields first and check for duplicates
                        var documentAttribute = await databaseContext.Attributes
                            .Where(d => d.CompanyId == CompanyId && d.Name.ToLower() == mapping.Name.ToLower())
                            .FirstOrDefaultAsync();

                        if (documentAttribute == null)
                        {
                            documentAttribute = new Models.Attribute()
                            {
                                CompanyId = CompanyId,
                                Name = mapping.Name,
                                Type = AttributeFieldType.Text
                            };

                            await databaseContext.Attributes.AddAsync(documentAttribute);

                            hasNewHeader = true;
                        }
                    }
                }

                if (hasNewHeader)
                {
                    // saves all the headers that we added
                    await databaseContext.SaveChangesAsync();
                }

                Stream stream = null;
                using (var httpclient = new HttpClient())
                {
                    stream = await httpclient.GetStreamAsync(appSettings.Mapping.BaseUri + "/" + appSettings.Mapping.Container + "/" + submitted.FileUri);
                }



                var headerVals = new List<FileHeader>();

                if (submitted.FileUri.Contains(".csv"))
                {
                    int headerRow = 1;

                    // read the CSV
                    using (var reader = new StreamReader(stream))
                    using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                    {
                        // need to change this to read the position of the header
                        int columnNumber = 0;

                        for (int i = 0; i < headerRow; i++)
                        {
                            await csv.ReadAsync();
                        }

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
                                    RowNumber = headerRow
                                });
                                columnNumber++;
                            }
                        }

                        // get the data now
                        var headers = await databaseContext.Attributes.Where(d => d.CompanyId == CompanyId).ToListAsync();


                        while (true)
                        {
                            if (await csv.ReadAsync())
                            {
                                foreach (var headerVal in headerVals)
                                {
                                    var headerMatched = headers.Where(h => h.Name.ToLower() == headerVal.Name.ToLower()).FirstOrDefault();
                                    if (headerMatched != null)
                                    {
                                        var field = csv.GetField(headerMatched.Name);

                                        //await databaseContext.ProductAttributes.AddAsync(new ProductAttribute() // need to figure out what is going on here....
                                        //{
                                        //    AttributeId = headerMatched.Id,
                                        //    ProductId = 
                                        //    Value = field
                                        //});
                                    }
                                }
                            }
                            else
                            {
                                break;
                            }
                        }

                        await databaseContext.SaveChangesAsync();


                    }
                }

            }
        }

        public static void AddNewProperty(object expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this
            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
                expandoDict[propertyName] = propertyValue;
            else
                expandoDict.Add(propertyName, propertyValue);
        }

        public async Task TrainDocument(IFormFile file, long documentComponentId, int rowsToTrain = 50, long? companyId = null, long? locationId = null, long? userId = null, string azureModuleId = "prebuilt-invoice")
        {
            var documentOptions = new DocumentOptions()
            {
                WriteToDatabaseAutomatically = true,
                EnablePDFAndPhotoReading = true,
                HeaderOptions = null
            };

            var headers = new List<string>();
            bool isCSVDoc = false;
            string csvData = "";

            if (file.FileName.Contains(".csv"))
            {
                using (var reader = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
                {
                    csvData = reader.ReadToEnd();
                }
                isCSVDoc = true;
            }
            else if (file.FileName.Contains(".xlsx"))
            {
                var excelHelper = new ExcelHelper();
                csvData = excelHelper.ConvertXlsxToCsv(file.OpenReadStream(), rowsToTrain);
                isCSVDoc = true;
            }
            else if (file.FileName.Contains(".pdf") || file.FileName.Contains(".jpg") || file.FileName.Contains(".jpeg") || file.FileName.Contains(".png"))
            {
                // analyize the document
                var response = await formRecognizerService.RunAnalysis(file.OpenReadStream(), azureModuleId);
                foreach (var header in response.FormRecognizerDocument)
                {
                    foreach (var field in header.Fields)
                    {
                        headers.Add(field.FieldName);
                    }
                }

                isCSVDoc = false;
            }

            if (isCSVDoc)
            {
                // Find where the headers are in the document
                //headers = await FindHeadersWithAI(csvData);
                // Store the position per company

                // need to change this to read the position of the header
                int rowIndex = 1;

                // find the header index
                using (var reader = new StringReader(csvData))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    if (headers.Count() == 0)
                    {
                        int columnIndex = 1;
                        csv.Read();
                        csv.ReadHeader();

                        foreach (var header in csv.HeaderRecord)
                        {
                            if (!String.IsNullOrWhiteSpace(header))
                            {
                                headers.Add(header);
                            }
                        }
                    }
                    else
                    {
                        while (csv.Read())
                        {
                            bool foundMatch = false;
                            int columnIndex = 1;

                            foreach (var header in headers)
                            {
                                try
                                {
                                    var fieldName = csv.GetField(columnIndex - 1);
                                    if (!String.IsNullOrWhiteSpace(fieldName))
                                    {

                                        var headerItem = headers[columnIndex - 1];

                                        if (fieldName == headerItem)
                                        {
                                            // found a match
                                            foundMatch = true;
                                        }
                                    }
                                }
                                catch (Exception ex)
                                {

                                }

                                columnIndex++;
                            }
                            rowIndex++;

                            if (foundMatch)
                            {
                                break;
                            }
                        }
                    }
                }

                var documentComponent = await databaseContext.DocumentComponents.Where(d => d.Id == documentComponentId).FirstOrDefaultAsync();
                if (documentComponent == null)
                {
                    throw new BadRequestException("Unable to locate document component");
                }

                documentComponent.HeaderRow = rowIndex;
                await databaseContext.SaveChangesAsync();
            }

            foreach (var header in headers)
            {
                if (!await databaseContext.DocumentMappings.Where(d =>
                    d.DocumentComponentId == documentComponentId &&
                    d.CompanyId == companyId &&
                    d.LocationId == locationId &&
                    d.UserId == userId &&
                    d.Name.ToLower() == header.ToLower()
                    ).AnyAsync())
                {

                    // need to contact: DynamicTableMapping class



                    await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                    {
                        CompanyId = companyId,
                        LocationId = locationId,
                        UserId = userId,
                        DocumentComponentId = documentComponentId,
                        Name = header,
                        ToName = ""
                    });
                    await databaseContext.SaveChangesAsync();
                }
            }
        }

        //private async Task<List<string>> FindHeadersWithAI(string csvData, int tokenLimit = 200)
        //{
        //    var newVal = openAIService.TrimTextBasedOnTokens(csvData, tokenLimit);


        //    var messages = new List<ChatMessage>();
        //    messages.Add(new ChatMessage()
        //    {
        //        Role = ChatMessageRole.System,
        //        Content = "List out the headers in the csv sheet for me in comma seperated, not additional messages"
        //    });

        //    messages.Add(new ChatMessage()
        //    {
        //        Role = ChatMessageRole.User,
        //        Content = newVal
        //    });

        //    var response = await openAIService.GenerateRawMessage(messages);

        //    return response.Replace("\"", "").Split(",").ToList();
        //}

        public async Task UpdateHeaderRow(long DocumentComponentId, int headerRow)
        {
            var documentComponent = await databaseContext.DocumentComponents.Where(d => d.Id == DocumentComponentId).FirstOrDefaultAsync();
            if (documentComponent != null)
            {
                documentComponent.HeaderRow = headerRow;

                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<DocumentMappingQuery> GetMapping(long documentComponentId, long? companyId = null, long? locationId = null, long? userId = null)
        {
            var documentComponent = await databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .Where(d => d.Id == documentComponentId && d.Status == DocumentComponentStatus.Open)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            var items = await databaseContext.DocumentMappings.AsNoTracking()
                .Where(d =>
                (d.DocumentComponentId == documentComponentId) &&
                (userId != null ? d.UserId == userId.Value : true) && (companyId != null ? d.CompanyId == companyId : true) && (locationId != null ? d.LocationId == locationId : true))
                .ToListAsync();

            return new DocumentMappingQuery()
            {
                Id = documentComponentId,
                Name = documentComponent.Name,
                DocumentType = documentComponent.DocumentType.Type,
                DocumentMappings = items
            };
        }

        public async Task<PagedList<DocumentComponent>> GetDocumentComponents(DocumentComponentStatus status = DocumentComponentStatus.Open, long? companyId = null, long? userId = null, long? locationId = null, int? offset = null, int? length = null)
        {
            var list = databaseContext.DocumentComponents
                .Include(d => d.DocumentType)
                .Where(d => d.Status == status && (userId != null ? d.UserId == userId.Value : true) && (companyId != null ? d.CompanyId == companyId : true) && (locationId != null ? d.LocationId == locationId : true))
                .Select(d => new DocumentComponent()
                {
                    Id = d.Id,
                    DocumentTypeId = d.DocumentTypeId,
                    Name = d.Name,
                    DocumentTypeName = d.DocumentType.Name,
                    FileUri = appSettings.Mapping.BaseUri + "/" + appSettings.Mapping.Container + "/" + d.FileUri
                });


            if (offset == null || length == null || offset == 0)
            {
                return new PagedList<DocumentComponent>(await list.ToListAsync());
            }
            else
            {
                return await list.ToPagedResultAsync(offset.Value - 1, length.Value);
            }
        }

        public async Task RemoveColumnFromDocumentMapping(Guid documentMappingId, long documentComponentId)
        {
            var mapping = await databaseContext.DocumentMappings.Where(d => d.DocumentComponentId == documentComponentId && d.Id == documentMappingId).FirstOrDefaultAsync();
            if (mapping != null)
            {
                databaseContext.DocumentMappings.Remove(mapping);
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<PagedList<DocumentType>> GetDocumentTypes(int? offset = null, int? length = null)
        {
            var query = databaseContext.DocumentTypes;

            if (offset == null && length == null)
            {
                return new PagedList<DocumentType>(await query.ToListAsync());
            }
            else
            {
                return
                    await query
                    .ToPagedResultAsync(offset.Value - 1, length.Value);
            }
        }

        public async Task AssignNameValue(Guid Id, string field, string value)
        {
            var documentMapping = await databaseContext.DocumentMappings
                .Where(d => d.Id == Id)
                .FirstOrDefaultAsync();

            if (documentMapping != null)
            {
                documentMapping.Name = value;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task AssignToName(Guid Id, string field, string value)
        {
            var documentMapping = await databaseContext.DocumentMappings
                .Where(d => d.Id == Id)
                .FirstOrDefaultAsync();

            if (documentMapping != null)
            {
                if (field == "name")
                {
                    documentMapping.Name = value;
                }
                else if (field == "toName")
                {
                    documentMapping.ToName = value;
                }

                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task AssignFileColumnFromColumn(string tableName, string columnName, string fileColumn, long? companyId = null, long? locationId = null, long? userId = null)
        {
            var dm = await databaseContext.DocumentComponents.Where(d => d.Name.ToLower() == tableName.ToLower()).FirstOrDefaultAsync();

            var mapping = await databaseContext.DocumentMappings
                .Include(t => t.DocumentComponents).ThenInclude(d => d.DocumentType)
                .Where(p => p.DocumentComponents.DocumentType.TableName.ToLower() == tableName.ToLower() && p.Name.ToLower() == columnName.ToLower())
                .FirstOrDefaultAsync();

            if (mapping == null)
            {
                await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                {
                    DocumentComponentId = dm.Id,
                    Name = columnName,
                    ToName = fileColumn,
                    CompanyId = companyId,
                    LocationId = locationId,
                    UserId = userId
                });
            }

            await databaseContext.SaveChangesAsync();
        }

        public async Task<List<object>> Execute(IFormFile file, long documentTypeId, DocumentOptions documentOptions, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic>? Row = null)
        {
            int headerRow = 1;

            if (documentOptions == null)
            {
                documentOptions = new DocumentOptions()
                {
                    WriteToDatabaseAutomatically = true,
                    EnablePDFAndPhotoReading = false,
                    HeaderOptions = null
                };
            }

            //var typeOfDoc = await databaseContext.DocumentComponents
            //    .Include(d => d.DocumentType)
            //    .Where(t => t.Id == documentComponentId)
            //    .FirstOrDefaultAsync();

            //if (typeOfDoc.DocumentType == null)
            //{
            //    return new List<object>();
            //}

            var documentType = await databaseContext.DocumentTypes.Where(d => d.Id == documentTypeId).FirstOrDefaultAsync();



            // found UploadSample in database context
            var tableName = documentType.TableName;

            // creating a new instance of a UploadSample
            var newInstance = CreateInstanceOfObject(documentType.AssemblyFullName, documentType.TypeName);

            var databaseColumns = newInstance.Unwrap().GetType().GetProperties();

            // we are getting all the fields within the sheet we are adding to the database
            //var databaseColumns = GetAllProperties(newInstance);

            // we are going to match the file against the Spreadsheet
            var loadedFiles = await CheckFileType(headerRow, documentType.AssemblyFullName, documentType.TypeName, -1, file, databaseColumns, documentOptions, companyId, locationId, userId, Row);

            if (documentOptions.WriteToDatabaseAutomatically)
            {
                // should commit everything to the database
                await databaseContext.SaveChangesAsync();
            }

            return loadedFiles;
        }

        // come back to this one...
        //public async Task<T?> Execute<T>(IFormFile file, DocumentOptions documentOptions, Action<T> Row = null)
        //{
        //    if (documentOptions == null)
        //    {
        //        documentOptions = new DocumentOptions()
        //        {
        //            WriteToDatabaseAutomatically = true,
        //            EnablePDFAndPhotoReading = false,
        //            HeaderOptions = null,
        //            AzureModuleId = "prebuilt-invoice"
        //        };
        //    }

        //    var allDatabaseProperties = GetAllProperties(databaseContext);
        //    var AType = typeof(T);


        //    var typeOfDoc = await databaseContext.DocumentTypes
        //        .Where(t => t.TableName.ToLower() == AType.Name.ToLower())
        //        .FirstOrDefaultAsync();

        //    if (typeOfDoc == null)
        //    {
        //        typeOfDoc = new AuthScape.Models.Document.DocumentType()
        //        {
        //            TableName = AType.Name,
        //            AssemblyFullName = AType.FullName,
        //            Name = AType.Name
        //        };
        //        await databaseContext.DocumentTypes.AddAsync(typeOfDoc);
        //        await databaseContext.SaveChangesAsync();
        //    }

        //    foreach (var propertyInfo in allDatabaseProperties)
        //    {
        //        // these are the database fields I can connet to
        //        var argument = propertyInfo.PropertyType.GenericTypeArguments.FirstOrDefault();
        //        if (argument != null && argument.FullName == AType.FullName)
        //        {
        //            // found UploadSample in database context
        //            var tableName = AType.Name;

        //            // creating a new instance of a UploadSample
        //            var newInstance = CreateInstanceOfObject<T>();

        //            // we are getting all the fields within the sheet we are adding to the database
        //            var databaseColumns = GetAllProperties(newInstance);

        //            // we are going to match the file against the Spreadsheet
        //            await CheckFileType(typeOfDoc.Id, file, databaseColumns, documentOptions, Row);

        //            if (documentOptions.WriteToDatabaseAutomatically)
        //            {
        //                // should commit everything to the database
        //                await databaseContext.SaveChangesAsync();
        //            }

        //            break;
        //        }
        //    }

        //    return default;
        //}

        private async Task<List<object>> CheckFileType(int headerRow, string AssemblyFullName, string TypeName, long documentComponentId, IFormFile file, PropertyInfo[] propertyInfos, DocumentOptions documentOptions, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic> Row = null)
        {
            var fi = new FileInfo(file.FileName);
            var ext = fi.Extension.ToLower();
            if (ext == ".xlsx")
            {
                // read using closeXML
                return await ReadExcelFile(headerRow, AssemblyFullName, TypeName, documentComponentId, file, propertyInfos, companyId, locationId, userId, Row);
            }
            else if (ext == ".csv")
            {
                // read using CSVHelper
                return await ReadCSVFile(headerRow, AssemblyFullName, TypeName, documentComponentId, file, propertyInfos, documentOptions, companyId, locationId, userId, Row);
            }
            else if (ext == ".sif")
            {
                // testing for reading
            }
            else if (ext == ".pdf" || ext == ".jpeg" || ext == ".jpg" || ext == ".png" || ext == ".gif")
            {
                // pdf/image process
                return await OCRReader(AssemblyFullName, TypeName, documentComponentId, file, propertyInfos, documentOptions, companyId, locationId, userId, Row);
            }

            return new List<object>();
        }

        private async Task<List<object>> OCRReader(string AssemblyFullName, string TypeName, long documentComponentId, IFormFile file, PropertyInfo[] propertyInfos, DocumentOptions documentOptions, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic> Row = null)
        {
            var loadedObjects = new List<object>();
            var headerVals = new List<FileHeader>();

            if (String.IsNullOrWhiteSpace(documentOptions.AzureModuleId))
            {
                documentOptions.AzureModuleId = "prebuilt-invoice";
            }

            var response = await formRecognizerService.RunAnalysis(file.OpenReadStream(), documentOptions.AzureModuleId);

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

            await FindHeaderMatch(documentComponentId, headerVals, propertyInfos, companyId, locationId, userId);

            // go through the pages
            foreach (var header in response.FormRecognizerDocument)
            {
                var instance = CreateInstanceOfObject(AssemblyFullName, TypeName);
                var newInstance = instance.Unwrap();

                foreach (var headerVal in headerVals)
                {
                    // search for a matching field
                    var field = header.Fields.Where(f => f.FieldName.ToLower() == headerVal.Name.ToLower()).FirstOrDefault();
                    if (field != null)
                    {
                        if (headerVal.ToValue == null)
                        {
                            continue;
                        }

                        if (headerVal.FileHeaderDataType == FileHeaderDataType.String)
                        {
                            if (!string.IsNullOrWhiteSpace(field.Value))
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, field.Value);
                            }
                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.Decimal)
                        {
                            if (!string.IsNullOrWhiteSpace(field.Value))
                            {
                                var data = field.Value.Replace("$", "");
                                decimal val = Convert.ToDecimal(data);

                                AssignValue(newInstance, headerVal.ToValue.Name, val);
                            }
                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.Boolean)
                        {
                            if (!string.IsNullOrWhiteSpace(field.Value))
                            {
                                var data = Convert.ToBoolean(field.Value);
                                AssignValue(newInstance, headerVal.ToValue.Name, data);
                            }
                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.DateTime)
                        {
                            if (!string.IsNullOrWhiteSpace(field.Value))
                            {
                                var data = Convert.ToDateTime(field.Value);
                                AssignValue(newInstance, headerVal.ToValue.Name, data);
                            }
                        }
                    }
                }

                // return action to developer
                if (Row != null && newInstance != null)
                {
                    Row(newInstance);
                }

                if (documentOptions.WriteToDatabaseAutomatically)
                {
                    await databaseContext.AddAsync(newInstance);
                }

                loadedObjects.Add(newInstance);
            }

            return loadedObjects;
        }

        private async Task<List<object>> ReadCSVFile(int headerRow, string AssemblyFullName, string TypeName, long documentComponentId, IFormFile file, PropertyInfo[] propertyInfos, DocumentOptions documentOptions, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic> Row = null)
        {
            var loadedObjects = new List<object>();
            var openStream = file.OpenReadStream();

            var headerVals = new List<FileHeader>();

            openStream.Seek(0, SeekOrigin.Begin);

            using (var reader = new StreamReader(openStream))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // need to change this to read the position of the header
                int columnNumber = 0;

                for (int i = 0; i < headerRow; i++)
                {
                    csv.Read();
                }

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
                            RowNumber = headerRow
                        });
                        columnNumber++;
                    }
                }

                // Finds any mapping
                await FindHeaderMatch(documentComponentId, headerVals, propertyInfos, companyId, locationId, userId);

                // We need to start the reading index here as it isn't correct for all documents
                // Reads the data
                //csv.Read();
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


                    //create a new instance here...
                    var instance = CreateInstanceOfObject(AssemblyFullName, TypeName);
                    var newInstance = instance.Unwrap();


                    foreach (var headerVal in headerVals.Where(h => h.ToValue != null))
                    {


                        if (headerVal.FileHeaderDataType == FileHeaderDataType.String)
                        {
                            var value = csv.GetField(headerVal.ColumnNumber);
                            if (!string.IsNullOrWhiteSpace(value))
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, value);
                            }
                            else
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, null);
                            }
                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.Decimal)
                        {
                            var value = csv.GetField(headerVal.ColumnNumber);

                            // remove the dollar sign
                            value = value.Replace("$", "");

                            // check if this is a negative number, if it isn't then continue
                            if (value.IndexOf("(") != -1 && value.IndexOf(")") != -1)
                            {
                                value = value.Replace("(", "").Replace(")", "");

                                // check if negative sign exists, if it does not then add it
                                if (value.IndexOf("-") == -1)
                                {
                                    value = "-" + value;
                                }
                            }

                            decimal result = 0;
                            if (decimal.TryParse(value, out result))
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, result);
                            }
                            else
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, null);
                            }

                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.Boolean)
                        {
                            var value = csv.GetField(headerVal.ColumnNumber);

                            bool result = false;
                            if (bool.TryParse(value, out result))
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, result);
                            }
                            else
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, null);
                            }
                        }
                        else if (headerVal.FileHeaderDataType == FileHeaderDataType.DateTime)
                        {
                            var value = csv.GetField(headerVal.ColumnNumber);

                            DateTime result;
                            if (DateTime.TryParse(value, out result))
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, result);
                            }
                            else
                            {
                                AssignValue(newInstance, headerVal.ToValue.Name, null);
                            }
                        }
                    }

                    // return action to developer
                    if (Row != null && newInstance != null)
                    {
                        Row(newInstance);
                    }

                    await databaseContext.AddAsync(newInstance);
                    loadedObjects.Add(newInstance);
                }
            }

            return loadedObjects;
        }

        private async Task<List<object>> ReadExcelFile(int headerRow, string AssemblyFullName, string TypeName, long documentComponentId, IFormFile file, PropertyInfo[] propertyInfos, long? companyId = null, long? locationId = null, long? userId = null, Action<dynamic> Row = null)
        {
            var loadedObjects = new List<object>();
            var headerVals = new List<FileHeader>();

            using (var workbook = new XLWorkbook(file.OpenReadStream()))
            {
                var worksheet = workbook.Worksheets.First(); // Assuming you want the first worksheet.

                var lookForHeaderRow = worksheet.RowsUsed().Skip(headerRow - 1);
                if (lookForHeaderRow == null)
                {
                    return new List<object>();
                }

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
                            RowNumber = headerRow - 1
                        });
                    }


                    // find the header matches
                    await FindHeaderMatch(documentComponentId, headerVals, propertyInfos, companyId, locationId, userId);

                    // Add the fields to the object based on the excel sheet and matching field names against the column positioning
                    foreach (var row in lookForHeaderRow.Skip(1))
                    {
                        // create a new instance here...
                        var instance = CreateInstanceOfObject(AssemblyFullName, TypeName);
                        var newInstance = instance.Unwrap();

                        foreach (var headerVal in headerVals)
                        {
                            if (headerVal.ToValue == null)
                            {
                                continue;
                            }

                            if (headerVal.FileHeaderDataType == FileHeaderDataType.String)
                            {
                                var value = row.Cell(headerVal.ColumnNumber).GetString();
                                if (!string.IsNullOrWhiteSpace(value))
                                {
                                    AssignValue(newInstance, headerVal.ToValue.Name, value);
                                }
                                //else
                                //{
                                //	AssignValue<T>(newInstance, headerVal.Name, ""); // maybe make this a param?
                                //}
                            }
                            else if (headerVal.FileHeaderDataType == FileHeaderDataType.Decimal)
                            {
                                var value = row.Cell(headerVal.ColumnNumber).GetString();


                                // remove the dollar sign
                                value = value.Replace("$", "");

                                // check if this is a negative number, if it isn't then continue
                                if (value.IndexOf("(") != -1 && value.IndexOf(")") != -1)
                                {
                                    value = value.Replace("(", "").Replace(")", "");

                                    // check if negative sign exists, if it does not then add it
                                    if (value.IndexOf("-") == -1)
                                    {
                                        value = "-" + value;
                                    }
                                }

                                decimal result = 0;
                                if (decimal.TryParse(value, out result))
                                {
                                    AssignValue(newInstance, headerVal.ToValue.Name, result);
                                }
                                else
                                {
                                    AssignValue(newInstance, headerVal.ToValue.Name, null);
                                }
                            }
                            else if (headerVal.FileHeaderDataType == FileHeaderDataType.Boolean)
                            {
                                var val = row.Cell(headerVal.ColumnNumber).GetBoolean();
                                AssignValue(newInstance, headerVal.ToValue.Name, val);
                            }
                            else if (headerVal.FileHeaderDataType == FileHeaderDataType.DateTime)
                            {
                                var val = row.Cell(headerVal.ColumnNumber).GetDateTime();
                                AssignValue(newInstance, headerVal.ToValue.Name, val);
                            }
                        }

                        // return action to developer
                        if (Row != null && newInstance != null)
                        {
                            Row(newInstance);
                        }

                        await databaseContext.AddAsync(newInstance);
                        loadedObjects.Add(newInstance);
                    }

                }
            }

            return loadedObjects;
        }

        private async Task FindHeaderMatch(long documentComponentId, List<FileHeader>? headers, PropertyInfo[] propertyInfos, long? companyId = null, long? locationId = null, long? userId = null)
        {
            //var matchedHeaders = new List<FileHeader>();

            foreach (var header in headers)
            {
                PropertyInfo? fileColumnName = null;
                foreach (var column in propertyInfos)
                {
                    if (header.Name.ToLower() == column.Name.ToLower())
                    {
                        fileColumnName = column;
                        header.ToValue = column;
                        //matchedHeaders.Add(header);
                        break;
                    }
                }

                if (documentComponentId != -1)
                {
                    var foundAMatch = await databaseContext.DocumentMappings
                        .Where(d => d.DocumentComponentId == documentComponentId &&
                            d.Name.ToLower() == header.Name.ToLower() &&
                            d.CompanyId == companyId &&
                            d.LocationId == locationId &&
                            d.UserId == userId
                        ).FirstOrDefaultAsync();

                    if (foundAMatch != null)
                    {
                        bool foundMappingMatch = false;
                        if (foundAMatch != null)
                        {
                            var column = propertyInfos.Where(p => p.Name.ToLower() == foundAMatch.ToName.ToLower()).FirstOrDefault();
                            if (column != null)
                            {
                                fileColumnName = column;
                                header.ToValue = column;
                                foundMappingMatch = true;
                            }
                        }

                        if (!foundMappingMatch)
                        {
                            // add products to database here...
                            var mappingMatched = await databaseContext.DocumentMappings
                                .Where(d => d.DocumentComponentId == documentComponentId &&
                                d.CompanyId == companyId &&
                                d.LocationId == locationId &&
                                d.UserId == userId &&
                                d.Name.ToLower() == header.Name.ToLower()).AnyAsync();

                            if (!mappingMatched)
                            {
                                await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                                {
                                    DocumentComponentId = documentComponentId,
                                    Name = header.Name,
                                    CompanyId = companyId,
                                    LocationId = locationId,
                                    UserId = userId,
                                    ToName = "" //foundAMatch != null ? header.ToValue.Name : ""
                                });
                            }
                        }
                    }
                }

                if (fileColumnName != null)
                {
                    if (fileColumnName.PropertyType == typeof(string))
                    {
                        header.FileHeaderDataType = FileHeaderDataType.String;
                        header.ToValue = fileColumnName;
                    }
                    else if (fileColumnName.PropertyType == typeof(decimal) || fileColumnName.PropertyType == typeof(decimal?))
                    {
                        header.FileHeaderDataType = FileHeaderDataType.Decimal;
                        header.ToValue = fileColumnName;
                    }
                    else if (fileColumnName.PropertyType == typeof(bool) || fileColumnName.PropertyType == typeof(bool?))
                    {
                        header.FileHeaderDataType = FileHeaderDataType.Boolean;
                        header.ToValue = fileColumnName;
                    }
                }
            }
        }

        private object CreateInstanceOfObject<T>()
        {
            // Create an instance of the class using reflection
            Type classType = typeof(T);
            if (classType != null)
            {
                return Activator.CreateInstance(classType);
            }
            return null;
        }

        private ObjectHandle? CreateInstanceOfObject(string assemblyName, string typeName)
        {
            // Create an instance of the class using reflection
            return Activator.CreateInstance(assemblyName, typeName); // remove the last index
        }


        private void AssignValue(object myObject, string propertyName, object value)
        {
            Type classType = myObject.GetType();
            // Use reflection to set the value of MyPropertpey
            PropertyInfo propertyInfo = classType.GetProperty(propertyName);
            if (propertyInfo != null && propertyInfo.CanWrite)
            {
                propertyInfo.SetValue(myObject, value);
            }
        }

        private PropertyInfo[] GetAllProperties(object src)
        {
            return src.GetType().GetProperties();
        }

        private object GetPropValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null);
        }

        public async Task<DocumentComponent> CreateDocument(string name, long typeOfDocumentId, long? companyId = null, long? locationId = null, long? userId = null)
        {
            var newDoc = new DocumentComponent()
            {
                Name = name,
                DocumentTypeId = typeOfDocumentId
            };

            if (companyId != null)
            {
                newDoc.CompanyId = companyId;
            }

            if (locationId != null)
            {
                newDoc.LocationId = locationId;
            }

            if (userId != null)
            {
                newDoc.UserId = userId;
            }

            await databaseContext.DocumentComponents.AddAsync(newDoc);
            await databaseContext.SaveChangesAsync();

            return newDoc;
        }

        public async Task CancelUpload(long documentId, long? companyId = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();


            var documentComponent = await databaseContext.DocumentComponents
                .Where(d => d.CompanyId == companyId && d.Id == documentId)
                .FirstOrDefaultAsync();

            if (documentComponent != null)
            {
                documentComponent.Status = DocumentComponentStatus.Archived;
                documentComponent.ArchivedBy = signedInUser.Id;
                documentComponent.ArchivedDate = SystemTime.Now;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task Publish(long companyId, long documentId, List<PublishedRow>? PublishedRows)
        {
            var document = await databaseContext.DocumentComponents
               .Include(d => d.DocumentMappings)
               .Where(d => d.CompanyId == companyId && d.Id == documentId)
               .FirstOrDefaultAsync();

            if (document != null)
            {
                var mappings = document.DocumentMappings.Where(d => !String.IsNullOrWhiteSpace(d.ToName)).ToList();
                foreach (var mapping in mappings)
                {
                    if (mapping.IsNewColumn) // creating a new attribute
                    {
                        var docHeader = await databaseContext.Attributes
                            .AsNoTracking()
                            .Where(d => d.CompanyId == companyId && d.Name == mapping.Name && d.DocumentComponentId == documentId)
                            .FirstOrDefaultAsync();

                        if (docHeader == null)
                        {
                            var docComponent = await databaseContext.DocumentComponents.AsNoTracking().Where(d => d.Id == mapping.DocumentComponentId).FirstOrDefaultAsync();
                            if (docComponent != null)
                            {
                                await databaseContext.Attributes.AddAsync(new Models.Attribute()
                                {
                                    Name = mapping.ToName,
                                    CompanyId = companyId,
                                    Type = mapping.AttributeFieldType,
                                });
                            }
                        }
                    }
                }

                if (PublishedRows != null)
                {
                    var executeDynamicMapping = new DynamicTableMapping(databaseContext, fileMappingService, formRecognizerService);
                    await executeDynamicMapping.ExecutePublishedRows(companyId, documentId, PublishedRows);


                    document = await databaseContext.DocumentComponents
                            .Include(d => d.DocumentMappings)
                            .Where(d => d.CompanyId == companyId && d.Id == documentId)
                            .FirstOrDefaultAsync();

                    if (document != null)
                    {
                        document.Status = DocumentComponentStatus.Published;
                        await databaseContext.SaveChangesAsync();
                    }




                    // Assign the mapping for next usage

                    var documentMappings = await databaseContext.DocumentMappings
                        .Where(d => d.DocumentComponentId == documentId && d.RememberForNextTime)
                        .ToListAsync();

                    foreach (var documentMapping in documentMappings)
                    {

                        var match = await databaseContext.DocumentMatchMemories
                            .Where(d => d.FileColumnName.ToLower() == documentMapping.Name.ToLower() &&
                                d.ToColumnName.ToLower() == documentMapping.ToName.ToLower())
                            .FirstOrDefaultAsync();

                        if (match == null)
                        {
                            await databaseContext.DocumentMatchMemories.AddAsync(new Models.DocumentMatchMemory()
                            {
                                CompanyId = companyId,
                                DocumentTypeId = document.DocumentTypeId,
                                FileColumnName = documentMapping.Name.ToLower(),
                                ToColumnName = documentMapping.ToName.ToLower()
                            });
                        }
                    }
                    await databaseContext.SaveChangesAsync();



                }
                else
                {
                    try
                    {
                        await databaseContext.SaveChangesAsync();

                        // we will need to move this to a cron system that is queued... If two documents upload at the same time we could have a data issue....
                        var executeDynamicMapping = new DynamicTableMapping(databaseContext, fileMappingService, formRecognizerService);
                        await executeDynamicMapping.Execute(companyId, appSettings.Mapping.Container, appSettings.Mapping.BaseUri, documentId);


                        document = await databaseContext.DocumentComponents
                            .Include(d => d.DocumentMappings)
                            .Where(d => d.CompanyId == companyId && d.Id == documentId)
                            .FirstOrDefaultAsync();

                        if (document != null)
                        {
                            document.Status = DocumentComponentStatus.Published;
                            await databaseContext.SaveChangesAsync();
                        }






                    }
                    catch (Exception exp)
                    {
                        throw new BadRequestException(exp.InnerException.Message);
                    }
                }

            }
        }

        public async Task<Spreadsheet.Models.SpreadSheetData> PreviewSpreadsheet(long companyId, long documentComponentId)
        {
            var documentComponent = await databaseContext.DocumentComponents
                .Where(d => d.Id == documentComponentId)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            var mappings = await databaseContext.DocumentMappings
                .Where(d => d.DocumentComponentId == documentComponentId)
                .AsNoTracking()
                .ToListAsync();

            var spreadSheetData = new Spreadsheet.Models.SpreadSheetData();

            var headerCell = new List<SpreadSheetCellType>();
            var sscolumns = new List<SpreadSheetColumn>();

            var rows = new List<SpreadSheetRow>();
            int rowId = 0;

            // we will need to handle each file type at this stage....
            var dynamicMapping = new DynamicTableMapping(databaseContext, fileMappingService, formRecognizerService);
            var elements = await dynamicMapping.Execute(companyId, appSettings.Mapping.Container, appSettings.Mapping.BaseUri, documentComponentId, false, true);

            bool isFirst = true;

            foreach (var elementItem in elements)
            {
                bool AllEmpty = true;
                bool skipRow = false;

                var columns = new List<object>();

                Type type2 = elementItem.GetType();
                PropertyInfo[] properties2 = type2.GetProperties();

                // get the column data
                foreach (var property1 in properties2)
                {
                    var isRequired = !property1.IsMarkedAsNullable();

                    bool dontInclude = false;
                    string attributeName = property1.Name;
                    var customAttributes = property1.GetCustomAttributes();
                    foreach (var customAttribute in customAttributes)
                    {
                        if (customAttribute is NameColumnAttribute)
                        {
                            attributeName = (customAttribute as NameColumnAttribute)._NewName;
                        }

                        if (customAttribute is HideColumnAttribute)
                        {
                            dontInclude = true;
                        }
                    }

                    if (isFirst && !dontInclude) // if First and you should include this column
                    {
                        var column = new SpreadSheetColumn();
                        column.columnId = property1.Name;
                        column.width = 200;
                        column.resizable = true;

                        sscolumns.Add(column);

                        headerCell.Add(new SpreadSheetCellType()
                        {
                            type = "header",
                            text = attributeName + (isRequired ? " (Required)" : "")
                        });
                    }
                }

                if (isFirst)
                {
                    isFirst = false;
                }

                // get the advance rules
                //DocumentFilterForPreviewRule rules = null;
                //if (!String.IsNullOrWhiteSpace(documentComponent.Rules))
                //{
                //    rules = JsonConvert.DeserializeObject<DocumentFilterForPreviewRule>(documentComponent.Rules);
                //}

                foreach (var property1 in properties2)
                {
                    var isRequired = !property1.IsMarkedAsNullable();

                    bool dontInclude = false;
                    //string attributeName = property1.Name;
                    var customAttributes = property1.GetCustomAttributes();
                    foreach (var customAttribute in customAttributes)
                    {
                        //if (customAttribute is NameColumnAttribute)
                        //{
                        //    attributeName = (customAttribute as NameColumnAttribute)._NewName;
                        //}

                        if (customAttribute is HideColumnAttribute)
                        {
                            dontInclude = true;
                        }
                    }

                    if (dontInclude)
                    {
                        continue; // continue if the column shouldn't be shown
                    }

                    var property = mappings.Where(m => m.ToName.ToLower() == property1.Name.ToLower()).FirstOrDefault();

                    if (property != null)
                    {
                        object propertyValue = property1.GetValue(elementItem);

                        #region Add base element

                        var textElement = new TextCellElement();
                        textElement.ColumnId = property.ToName;
                        textElement.IsRequired = isRequired;

                        if (propertyValue != null)
                        {
                            // rules added
                            //var propVal = propertyValue.ToString();

                            //bool IsValid = true;
                            //if (rules != null)
                            //{
                            //    var rulesForField = rules.Rules.Where(r => r.Field.ToLower() == property.ToName.ToLower()).ToList();
                            //    if (rulesForField != null)
                            //    {
                            //        // check for a operator
                            //        foreach (var ruleForField in rulesForField)
                            //        {
                            //            if (ruleForField.Operator == "doesNotContain" && ruleForField.ValueSource == "value")
                            //            {
                            //                if (propVal.Contains(ruleForField.Value))
                            //                {
                            //                    IsValid = false;
                            //                }
                            //            }

                            //            if (ruleForField.Operator == "contains" && ruleForField.ValueSource == "value")
                            //            {
                            //                if (!propVal.Contains(ruleForField.Value))
                            //                {
                            //                    IsValid = false;
                            //                }
                            //            }
                            //        }
                            //    }
                            //}

                            //if (!IsValid)
                            //{
                            //    skipRow = true;
                            //    break;
                            //}
                            //else
                            //{
                            textElement.Text = propertyValue.ToString();
                            //}
                        }
                        else
                        {
                            textElement.Text = "";
                        }

                        // check to see if all the columns are empty
                        if (textElement.Text != "")
                        {
                            AllEmpty = false;
                        }

                        columns.Add(textElement);

                        #endregion
                    }
                    else
                    {
                        var textElement = new TextCellElement();
                        textElement.ColumnId = property1.Name;
                        textElement.Text = "";
                        textElement.IsRequired = isRequired;
                        columns.Add(textElement);
                    }
                }

                if (!skipRow && !AllEmpty)
                {
                    rows.Add(new SpreadSheetRow()
                    {
                        Cells = columns,
                        RowId = rowId
                    });

                    rowId++;
                }
            }

            spreadSheetData.Rows = rows;
            spreadSheetData.columns = sscolumns;
            spreadSheetData.HeaderCell = headerCell;

            return spreadSheetData;
        }
    }
}