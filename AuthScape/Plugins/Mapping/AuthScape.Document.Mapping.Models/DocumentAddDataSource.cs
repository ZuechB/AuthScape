namespace AuthScape.Document.Mapping.Models
{
    public class DocumentAddDataSource
    {
        public string Name { get; set; }
        public string DataTable { get; set; }
        public DocumentTypeEnum DocumentType { get; set; }

        public string? TypeName { get; set; }
        public string? AssemblyFullName { get; set; }
    }
}