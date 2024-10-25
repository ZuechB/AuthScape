namespace AuthScape.LuceneSearch.Models
{
    public class LuceneField
    {
        public LuceneField(string name, string value, FieldType fieldType, bool storeField)
        {
            this.Name = name;
            this.Value = value;
            this.FieldType = fieldType;
            this.StoreField = storeField;
        }

        public FieldType FieldType { get; set; }
        public string Name { get; set; }
        public object Value { get; set; }
        public bool StoreField { get; set; }
    }

    public enum FieldType
    {
        DescriptionOrBody = 1, // often used for descriptions
        StringField = 2, // used for simple text
        Int32Field = 3,  //  For indexing 32-bit integer numbers. Useful for numerical data that you want to range query or sort by.
        Int64Field = 4, // Similar to Int32Field, but for 64-bit integers.
        SingleField = 5, // For indexing single-precision 32-bit floating point numbers.
        DoubleField = 6, // For indexing double-precision 64-bit floating point numbers.
        BinaryDocValuesField = 7, // For storing binary data that can be used for sorting or value retrieval.
        NumericDocValuesField = 8, //  For storing numeric values for sorting or value retrieval.
        SortedDocValuesField = 9, // For storing sorted string values for sorting or value retrieval.
        SortedSetDocValuesField = 10, // Similar to SortedDocValuesField, but can hold multiple values per document.
    }
}
