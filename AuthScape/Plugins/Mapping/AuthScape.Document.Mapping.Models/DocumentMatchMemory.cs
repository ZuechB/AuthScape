namespace AuthScape.Document.Mapping.Models
{
    public class DocumentMatchMemory
    {
        public Guid Id { get; set; }
        public long DocumentTypeId { get; set; }
        public long CompanyId { get; set; }

        public string FileColumnName { get; set; }
        public string ToColumnName { get; set; }
    }
}