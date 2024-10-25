namespace AuthScape.Document.Mapping.Models
{
    public class NewColumnWithMapping
    {
        public long CompanyId { get; set; }
        public long DocumentId { get; set; }
        public Guid DocumentMappingId { get; set; }

        public string NewColumn { get; set; }
        public string? Description { get; set; }
        public AttributeFieldType attributeFieldType { get; set; }
    }
}
