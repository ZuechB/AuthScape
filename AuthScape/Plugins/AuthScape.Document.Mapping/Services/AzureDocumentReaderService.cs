using AuthScape.Document.Mapping.Models;
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using Microsoft.Identity.Client;
using Newtonsoft.Json;

namespace AuthScape.Document.Mapping.Services
{
    public interface IFormRecognizerService
    {
        Task<FormRecognizer> RunAnalysis(Stream stream, string moduleId = "prebuilt-invoice");
    }

    public class FormRecognizerService : IFormRecognizerService
    {
        readonly DocumentAnalysisClient client;
        public FormRecognizerService(string key, string endpoint)
        {
            if (!String.IsNullOrWhiteSpace(key))
            {
                var credential = new AzureKeyCredential(key);
                client = new DocumentAnalysisClient(new Uri(endpoint), credential);
            }
        }

        public async Task<FormRecognizer> RunAnalysis(Stream stream, string moduleId = "prebuilt-invoice")
        {
            AnalyzeDocumentOperation operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, moduleId, stream);
            AnalyzeResult result = operation.Value;

            var formRecognizer = new FormRecognizer();
            formRecognizer.KeyValue = new Dictionary<string, string>();
            formRecognizer.FormRecognizerDocument = new List<FormRecognizerDocument>();


            foreach (var item in result.KeyValuePairs)
            {
                formRecognizer.KeyValue.Add(item.Key.Content, item.Value.Content);
            }

            foreach (var document in result.Documents)
            {
                var newDocument = new FormRecognizerDocument();
                newDocument.DocumentType = document.DocumentType;
                newDocument.Fields = new List<FormRecognizerDocumentField>();
                newDocument.Tables = new List<FormRecognizerTable>();

                foreach (var item in document.Fields)
                {
                    var fieldName = item.Key;
                    var confidence = item.Value.Confidence;
                    var documentFieldType = item.Value.FieldType;
                    var value = item.Value.Value;

                    var docVal = "";
                    var docType = AzureFieldType.String;
                    switch (documentFieldType)
                    {
                        case DocumentFieldType.String:
                            docType = AzureFieldType.String;
                            docVal = value.AsString();
                            break;
                        case DocumentFieldType.Date:
                            docType = AzureFieldType.Date;
                            docVal = value.AsDate().ToString();
                            break;
                        case DocumentFieldType.Time:
                            docType = AzureFieldType.Time;
                            docVal = value.AsTime().ToString();
                            break;
                        case DocumentFieldType.PhoneNumber:
                            docType = AzureFieldType.PhoneNumber;
                            docVal = value.AsPhoneNumber().ToString();
                            break;
                        case DocumentFieldType.Double:
                            docType = AzureFieldType.Double;
                            docVal = value.AsDouble().ToString();
                            break;
                        case DocumentFieldType.Int64:
                            docType = AzureFieldType.Int64;
                            docVal = value.AsInt64().ToString();
                            break;
                        case DocumentFieldType.List:
                            docType = AzureFieldType.List;

                            var newListDictionaries = new List<Dictionary<string, string>>();

                            var dictionaryListVal = value.AsList();
                            foreach (var val in dictionaryListVal)
                            {
                                var newDictionary = new Dictionary<string, string>();

                                var columns = val.Value.AsDictionary();
                                foreach (var column in columns)
                                {
                                    var columnKey = column.Key;

                                    switch(column.Value.FieldType)
                                    {
                                        case DocumentFieldType.String:
                                            newDictionary.Add(columnKey, column.Value.Value.AsString());
                                            break;
                                        //case DocumentFieldType.List:
                                        //    break;
                                        //case DocumentFieldType.Signature:
                                        //    break;
                                        case DocumentFieldType.Int64:
                                            long _resultInt = column.Value.Value.AsInt64();
                                            newDictionary.Add(columnKey, _resultInt.ToString());
                                            break;
                                        case DocumentFieldType.Double:
                                            double _resultDouble = column.Value.Value.AsDouble();
                                            newDictionary.Add(columnKey, _resultDouble.ToString());
                                            break;
                                        //case DocumentFieldType.Address:
                                        //    break;
                                        case DocumentFieldType.Boolean:
                                            bool _resultBool = column.Value.Value.AsBoolean();
                                            newDictionary.Add(columnKey, _resultBool.ToString());
                                            break;
                                        //case DocumentFieldType.CountryRegion:
                                        //    break;
                                        case DocumentFieldType.Currency:
                                            CurrencyValue _resultCurrency = column.Value.Value.AsCurrency();
                                            newDictionary.Add(columnKey, _resultCurrency.Amount.ToString());
                                            break;
                                        case DocumentFieldType.Date:
                                            DateTimeOffset _resultDate = column.Value.Value.AsDate();
                                            newDictionary.Add(columnKey, _resultDate.DateTime.ToShortDateString());
                                            break;
                                        //case DocumentFieldType.Dictionary:
                                        //    break;
                                        case DocumentFieldType.PhoneNumber:
                                            string _resultPhoneNumber = column.Value.Value.AsPhoneNumber();
                                            newDictionary.Add(columnKey, _resultPhoneNumber);
                                            break;
                                        case DocumentFieldType.SelectionMark:
                                            DocumentSelectionMarkState _resultSelectionMark = column.Value.Value.AsSelectionMarkState();
                                            newDictionary.Add(columnKey, _resultSelectionMark.ToString());
                                            break;
                                        case DocumentFieldType.Time:
                                            TimeSpan _resultTime = column.Value.Value.AsTime();
                                            newDictionary.Add(columnKey, _resultTime.ToString());
                                            break;
                                        //case DocumentFieldType.Unknown:

                                        //    break;
                                    }
                                }

                                newListDictionaries.Add(newDictionary);
                            }

                            docVal = JsonConvert.SerializeObject(newListDictionaries);




                            break;
                        case DocumentFieldType.Dictionary:
                            docType = AzureFieldType.Dictionary;

                            var newDictionaries = new List<Dictionary<string, string>>();

                            var dictionaryVal = value.AsDictionary();
                            foreach (var val in dictionaryVal)
                            {
                                var newDictionary = new Dictionary<string, string>();

                                var columns = val.Value.Value.AsDictionary();
                                foreach (var column in columns)
                                {
                                    var columnKey = column.Key;
                                    var columnValue = column.Value.Value.AsString();

                                    newDictionary.Add(columnKey, columnValue);
                                }

                                newDictionaries.Add(newDictionary);
                            }


                            docVal = JsonConvert.SerializeObject(newDictionaries);
                            break;
                        case DocumentFieldType.SelectionMark:
                            docType = AzureFieldType.SelectionMark;
                            docVal = value.AsSelectionMarkState().ToString();
                            break;
                        case DocumentFieldType.CountryRegion:
                            docType = AzureFieldType.CountryRegion;
                            docVal = value.AsCountryRegion();
                            break;
                        case DocumentFieldType.Signature:
                            docType = AzureFieldType.Signature;
                            docVal = value.AsSignatureType().ToString();
                            break;
                        case DocumentFieldType.Currency:
                            docType = AzureFieldType.Currency;
                            docVal = value.AsCurrency().Symbol + value.AsCurrency().Amount;
                            break;
                        case DocumentFieldType.Address:
                            docType = AzureFieldType.Address;
                            var fullAddress = value.AsAddress();
                            docVal = fullAddress.StreetAddress + " " + fullAddress.City + ", " + fullAddress.State + " " + fullAddress.PostalCode + " " + fullAddress.CountryRegion;
                            break;
                    }

                    var field = new FormRecognizerDocumentField()
                    {
                        FieldName = fieldName,
                        Confidence = confidence,
                        DocumentType = docType,
                        Value = docVal,
                    };

                    newDocument.Fields.Add(field);
                }

                foreach (var table in result.Tables)
                {
                    var newTable = new FormRecognizerTable()
                    {
                        Rows = new List<FormRecognizerTableRow>()
                    };

                    foreach (var cell in table.Cells)
                    {
                        newTable.Rows.Add(new FormRecognizerTableRow()
                        {
                            ColumnIndex = cell.ColumnIndex,
                            RowIndex = cell.RowIndex,
                            Content = cell.Content,
                        });
                    }

                    newDocument.Tables.Add(newTable);
                }

                formRecognizer.FormRecognizerDocument.Add(newDocument);
            }

            return formRecognizer;

        }
    }
}
