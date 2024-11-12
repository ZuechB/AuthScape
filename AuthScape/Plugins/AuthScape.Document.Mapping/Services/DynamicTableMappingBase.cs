using AuthScape.Document.Mapping.Models;
using AuthScape.Models.Exceptions;
using AuthScape.Services;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Services;
using Services.Context;
using System.Reflection;
using System.Runtime.Remoting;

namespace AuthScape.Document.Mapping.Services
{
    public class DynamicTableMappingBase
    {
        readonly DatabaseContext databaseContext;
        readonly IFileMappingService fileMappingService;
        readonly IFormRecognizerService formRecognizerService;

        public DynamicTableMappingBase(DatabaseContext databaseContext, IFileMappingService fileMappingService, IFormRecognizerService formRecognizerService)
        {
            this.databaseContext = databaseContext;
            this.fileMappingService = fileMappingService;
            this.formRecognizerService = formRecognizerService;
        }

        protected ObjectHandle? CreateInstanceOfObject(string assemblyName, string typeName)
        {
            // Create an instance of the class using reflection
            return Activator.CreateInstance(assemblyName, typeName); // remove the last index
        }

        protected void AssignValue(object myObject, string propertyName, object? value)
        {
            Type classType = myObject.GetType();
            // Use reflection to set the value of MyPropertpey
            PropertyInfo propertyInfo = classType.GetProperty(propertyName);
            if (propertyInfo != null && propertyInfo.CanWrite)
            {
                propertyInfo.SetValue(myObject, value);
            }
        }

        protected void FindTypeToValue(PropertyInfo fileColumnName, FileHeader header)
        {
            if (fileColumnName != null)
            {
                if (fileColumnName.PropertyType == typeof(int))
                {
                    header.FileHeaderDataType = FileHeaderDataType.Integer;
                    header.ToValue = fileColumnName;
                }
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
                else if (fileColumnName.PropertyType == typeof(DateTime) || fileColumnName.PropertyType == typeof(DateTime?))
                {
                    header.FileHeaderDataType = FileHeaderDataType.DateTime;
                    header.ToValue = fileColumnName;
                }
                else if (fileColumnName.PropertyType == typeof(Guid) || fileColumnName.PropertyType == typeof(Guid?))
                {
                    header.FileHeaderDataType = FileHeaderDataType.Guid;
                    header.ToValue = fileColumnName;
                }
                else if (fileColumnName.PropertyType == typeof(DateTimeOffset) || fileColumnName.PropertyType == typeof(DateTimeOffset?))
                {
                    header.FileHeaderDataType = FileHeaderDataType.DateTimeOffset;
                    header.ToValue = fileColumnName;
                }
                else if (fileColumnName.PropertyType == typeof(Byte) || fileColumnName.PropertyType == typeof(Byte?))
                {
                    header.FileHeaderDataType = FileHeaderDataType.Byte;
                    header.ToValue = fileColumnName;
                }
            }
        }

        protected async Task FindHeaderMatch(long documentComponentId, List<FileHeader>? headers, PropertyInfo[] propertyInfos, long? companyId = null, long? locationId = null, long? userId = null)
        {
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

                if (documentComponentId != -1 && header.ToValue == null)
                {
                    var foundAMatch = await databaseContext.DocumentMappings
                        .Where(d => d.DocumentComponentId == documentComponentId &&
                            d.Name.ToLower() == header.Name.ToLower() &&
                            d.CompanyId == companyId &&
                            d.LocationId == locationId &&
                            d.UserId == userId
                        ).FirstOrDefaultAsync();




                    bool hasAMatch = false;
                    if (foundAMatch == null)
                    {



                        // since we could not find the mapping, let's look at the memory section
                        var documentTypeId = await databaseContext.DocumentComponents
                            .AsNoTracking()
                            .Where(d => d.Id == documentComponentId)
                            .Select(d => d.DocumentTypeId)
                            .FirstOrDefaultAsync();




                        //foreach (var column in propertyInfos)
                        //{
                        //    if (header.Name.ToLower() == column.Name.ToLower())
                        //    {
                        //        fileColumnName = column;
                        //        header.ToValue = column;
                        //        //matchedHeaders.Add(header);
                        //        break;
                        //    }
                        //}



                        // check to see if we have any mappings in memory for this file and table

                        DocumentMatchMemory matchMemory = null;
                        foreach (var column in propertyInfos)
                        {
                            matchMemory = await databaseContext.DocumentMatchMemories
                                .Where(d => d.CompanyId == companyId &&
                                    d.DocumentTypeId == documentTypeId &&
                                    d.FileColumnName.ToLower() == header.Name.ToLower() &&
                                    d.ToColumnName.ToLower() == column.Name.ToLower()
                                ).FirstOrDefaultAsync();

                            if (matchMemory != null)
                            {
                                fileColumnName = column;
                                header.ToValue = column;
                                break;
                            }
                        }

                        if (matchMemory != null)
                        {
                            await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                            {
                                DocumentComponentId = documentComponentId,
                                Name = header.Name,
                                CompanyId = companyId,
                                LocationId = locationId,
                                UserId = userId,
                                ToName = matchMemory.ToColumnName
                            });

                            hasAMatch = true;
                        }

                        await databaseContext.SaveChangesAsync();
                    }


                    if (hasAMatch)
                    {
                        // recall as we have mapped the field
                        foundAMatch = await databaseContext.DocumentMappings
                        .Where(d => d.DocumentComponentId == documentComponentId &&
                            d.Name.ToLower() == header.Name.ToLower() &&
                            d.CompanyId == companyId &&
                            d.LocationId == locationId &&
                            d.UserId == userId
                        ).FirstOrDefaultAsync();
                    }


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

                FindTypeToValue(fileColumnName, header);
            }
        }

        protected async Task<bool?> CreateObjectBasedOnHeader(List<DocumentMapping> mappings, PropertyInfo[]? propertyInfos, List<object> loadedObjects, DocumentComponent documentComponent, List<FileHeader> headerVals, bool IsPublishing, Func<int, FileHeaderDataType, string, string> GetValue)
        {
            if (documentComponent == null || documentComponent.DocumentType == null || documentComponent.DocumentType.AssemblyFullName == null)
            {
                return null;
            }

            var instance = CreateInstanceOfObject(documentComponent.DocumentType.AssemblyFullName, documentComponent.DocumentType.TypeName);
            if (instance == null)
            {
                return null;
            }


            // get the advance rules
            DocumentFilterForPreviewRule rules = null;
            if (!String.IsNullOrWhiteSpace(documentComponent.Rules))
            {
                rules = JsonConvert.DeserializeObject<DocumentFilterForPreviewRule>(documentComponent.Rules);
            }

            var newInstance = instance.Unwrap();


            foreach (var headerVal in headerVals)
            {
                if (headerVal.ToValue == null)
                {
                    var matched = mappings.Where(m => m.Name.ToLower() == headerVal.Name.ToLower()).FirstOrDefault();
                    if (matched != null && propertyInfos != null)
                    {
                        var propertyData = propertyInfos.Where(p => p.Name.ToLower() == matched.ToName.ToLower()).FirstOrDefault();
                        if (propertyData != null)
                        {
                            FindTypeToValue(propertyData, headerVal);

                            if (headerVal.ToValue == null)
                            {
                                continue;
                            }
                        }
                        else
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }

                if (newInstance != null)
                {
                    // assign Value
                    string value = GetValue(headerVal.ColumnNumber, headerVal.FileHeaderDataType, headerVal.Name);

                    var mapping = mappings.Where(m => m.ToName.ToLower() == headerVal.ToValue.Name.ToLower()).FirstOrDefault();
                    if (mapping != null)
                    {
                        var rememberForNextTime = mapping.RememberForNextTime;

                        if (mapping.OnlyAddRowIfColumnFound)
                        {
                            if (String.IsNullOrWhiteSpace(value))
                            {
                                return true; // we are going to skip this row
                            }
                        }
                    }

                    object? returnVal = null;
                    switch (headerVal.FileHeaderDataType)
                    {
                        case FileHeaderDataType.String:

                            if (!String.IsNullOrWhiteSpace(value))
                            {
                                returnVal = value;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = "";
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.Decimal:

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

                            decimal resultDecimal = 0;
                            if (decimal.TryParse(value, out resultDecimal))
                            {
                                returnVal = resultDecimal;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.Boolean:

                            if (!String.IsNullOrWhiteSpace(value))
                            {
                                value = value.ToLower();
                                if (value == "true" || value == "yes" || value == "1" || value == "1.0")
                                {
                                    returnVal = true;
                                }

                                if (value == "false" || value == "no" || value == "0" || value == "0.0")
                                {
                                    returnVal = false;
                                }
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;

                        case FileHeaderDataType.DateTime:

                            DateTime resultDateTime = DateTime.Now;
                            if (DateTime.TryParse(value, out resultDateTime))
                            {
                                returnVal = resultDateTime;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.Integer:

                            int resultInt = 0;
                            if (int.TryParse(value, out resultInt))
                            {
                                returnVal = resultInt;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.Guid:

                            Guid resultGuid = Guid.Empty;
                            if (Guid.TryParse(value, out resultGuid))
                            {
                                returnVal = resultGuid;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.DateTimeOffset:

                            DateTimeOffset resultDateTimeOffset = SystemTime.Now;
                            if (DateTimeOffset.TryParse(value, out resultDateTimeOffset))
                            {
                                returnVal = resultDateTimeOffset;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                        case FileHeaderDataType.Byte:

                            byte resultByte = 0;
                            if (Byte.TryParse(value, out resultByte))
                            {
                                returnVal = resultByte;
                            }
                            else
                            {
                                if (IsPublishing)
                                {
                                    if (String.IsNullOrWhiteSpace(value) && headerVal.IsRequired)
                                    {
                                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                                    }
                                    else
                                    {
                                        returnVal = null;
                                    }
                                }
                            }

                            break;
                    }


                    if (returnVal == null && headerVal.IsRequired)
                    {
                        throw new BadRequestException("Missing required field for " + headerVal.Name);
                    }


                    var propVal = "";
                    if (returnVal != null)
                    {
                        propVal = returnVal.ToString();
                    }

                    bool IsValid = true;
                    if (rules != null)
                    {
                        var rulesForField = rules.Rules.Where(r => r.Field.ToLower() == headerVal.ToValue.Name.ToLower()).ToList();
                        if (rulesForField != null)
                        {
                            // check for a operator
                            foreach (var ruleForField in rulesForField)
                            {
                                if (ruleForField.Operator == "doesNotContain" && ruleForField.ValueSource == "value")
                                {
                                    if (propVal.Contains(ruleForField.Value))
                                    {
                                        IsValid = false;
                                    }
                                }

                                if (ruleForField.Operator == "contains" && ruleForField.ValueSource == "value")
                                {
                                    if (!propVal.Contains(ruleForField.Value))
                                    {
                                        IsValid = false;
                                    }
                                }
                            }
                        }
                    }

                    // check if the rule is valid, if so then assign the value
                    if (IsValid)
                    {
                        AssignValue(newInstance, headerVal.ToValue.Name, returnVal);
                    }



                }
            }

            if (newInstance != null)
            {
                if (fileMappingService != null && fileMappingService.OnRowExecute != null && newInstance != null)
                {
                    await fileMappingService.OnRowExecute(newInstance, documentComponent);
                }

                if (documentComponent.DocumentType.Type == DocumentTypeEnum.Database) // maybe have an override later...
                {
























                    await databaseContext.AddAsync(newInstance);
                }

                loadedObjects.Add(newInstance);
            }

            return null;
        }

        protected async Task AssignDynamicMappingData(long companyId, DocumentComponent documentComponent, Func<string, string> GetFieldValue)
        {
            var newProduct = new DocumentSheet();
            newProduct.Name = ""; // will need to map the name to this field with custom code
            newProduct.CompanyId = companyId;

            // store the data 
            var mappings = await databaseContext.DocumentMappings
                .AsNoTracking()
                .Where(d => d.CompanyId == companyId && d.DocumentComponentId == documentComponent.Id && !String.IsNullOrWhiteSpace(d.ToName))
                .ToListAsync();

            // we are going to loop through every header (we need the qty of rows to equal for each column otherwise it will be impossible to know)
            var headerAttributes = await databaseContext.Attributes.AsNoTracking().Where(d => d.CompanyId == companyId).ToListAsync();
            foreach (var attribute in headerAttributes)
            {
                var headerAttribute = mappings.Where(m => attribute.Name == m.Name).FirstOrDefault();
                if (headerAttribute != null)
                {
                    // get the field from the csv
                    var field = GetFieldValue(headerAttribute.Name);

                    // store the data for that csv file
                    await databaseContext.SheetAttributes.AddAsync(new SheetAttribute()
                    {
                        AttributeId = attribute.Id,
                        Sheet = newProduct,
                        Value = field
                    });
                }
            }
        }

        protected async Task AssignTrainingData(long companyId, DocumentComponent documentComponent, List<FileHeader> headerVals, PropertyInfo[] propertyInfos)
        {
            foreach (var headerVal in headerVals)
            {
                if (!await databaseContext.DocumentMappings.Where(d =>
                    d.DocumentComponentId == documentComponent.Id &&
                    d.CompanyId == companyId &&
                    d.Name.ToLower() == headerVal.Name.ToLower()
                ).AnyAsync())
                {
                    // try to find the ToName section
                    var properyInfo = propertyInfos.Where(p => p.Name.ToLower() == headerVal.Name.ToLower()).FirstOrDefault();
                    if (properyInfo != null)
                    {
                        await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                        {
                            CompanyId = companyId,
                            DocumentComponentId = documentComponent.Id,
                            Name = headerVal.Name,
                            ToName = properyInfo.Name,
                            IsColumnRequired = !properyInfo.IsMarkedAsNullable()
                        });
                    }
                    else
                    {
                        await databaseContext.DocumentMappings.AddAsync(new DocumentMapping()
                        {
                            CompanyId = companyId,
                            DocumentComponentId = documentComponent.Id,
                            Name = headerVal.Name,
                            ToName = ""
                        });
                    }
                    await databaseContext.SaveChangesAsync();
                }
            }
        }

        protected async Task CommitChanges(bool isTraining, List<object> loadedObjects, DocumentComponent documentComponent)
        {
            if (!isTraining)
            {
                if (documentComponent.DocumentType.Type == DocumentTypeEnum.Database) // maybe have an override later...
                {
                    // should commit everything to the database
                    await databaseContext.SaveChangesAsync();


                    if (fileMappingService != null && fileMappingService.OnCompleted != null)
                    {
                        await fileMappingService.OnCompleted(loadedObjects, documentComponent);
                    }
                }
                else
                {
                    if (fileMappingService != null && fileMappingService.OnCompleted != null)
                    {
                        await fileMappingService.OnCompleted(loadedObjects, documentComponent);
                    }
                }
            }
        }
    }
}
