namespace AuthScape.Document.Mapping.Models
{
    public class DynamicModelMapped
    {
        public Guid Id { get; set; }
        public string Header { get; set; }
        public AttributeFieldType Type { get; set; }
        public List<DynamicModelMappedVal> Values { get; set; }
    }

    public class DynamicModelMappedVal
    {
        public string Value { get; set; }
    }
}
