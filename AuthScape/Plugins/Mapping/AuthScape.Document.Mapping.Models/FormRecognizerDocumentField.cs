namespace AuthScape.Document.Mapping.Models
{
    public class FormRecognizer
    {
        public List<FormRecognizerDocument> FormRecognizerDocument { get; set; }
        public Dictionary<string, string> KeyValue { get; set; }
    }

    public class FormRecognizerDocument
    {
        public string DocumentType { get; set; }
        public List<FormRecognizerDocumentField> Fields { get; set; }
        public List<FormRecognizerTable> Tables { get; set; }
    }

    public class FormRecognizerDocumentField
    {
        public string FieldName { get; set; }
        public float? Confidence { get; set; }
        public AzureFieldType DocumentType { get; set; }
        public string Value { get; set; }
    }

    public class FormRecognizerTable
    {
        public List<FormRecognizerTableRow> Rows { get; set; }
    }

    public class FormRecognizerTableRow
    {
        public int RowIndex { get; set; }
        public int ColumnIndex { get; set; }
        public string Content { get; set; }
    }
}