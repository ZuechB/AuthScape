namespace AuthScape.Document.Mapping.Models
{
    public class DocumentAttributeHeader
    {
        public Guid Id { get; set; }
        public long CompanyId { get; set; }
        public long DocumentType { get; set; }
        public string Name { get; set; }
        public AttributeFieldType Type { get; set; }

        public ICollection<DocumentAttributeValue> DocumentAttributeValues { get; set; }
    }

    public class DocumentAttributeValue
    {
        public Guid Id { get; set; }
        public Guid DocumentAttributeHeaderId { get; set; }
        public DocumentAttributeHeader DocumentAttributeId { get; set; }
        public string? Value { get; set; }
    }
}
