namespace AuthScape.Document.Mapping.Models
{
    public class UploadMappedFile
    {
        public IFormFile file { get; set; }
        public long documentComponentId { get; set; }

        public long? companyId { get; set; }
        public long? locationId { get; set; }
        public long? userId { get; set; }
    }
}