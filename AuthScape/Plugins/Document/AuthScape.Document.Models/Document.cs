namespace AuthScape.Document.Models
{
    public class DocumentItem
    {
        public Guid Id { get; set; }
        public long? CompanyId { get; set; }
        public long? UserId { get; set; }
        public Guid? Identifier { get; set; }

        public string? DocumentName { get; set; }

        public string? FileName { get; set; }
        public string? Extention { get; set; }
        public string URI { get; set; }
        public float? Size { get; set; }
        public long? DocumentFieldCategoryId { get; set; }
        public Guid? DocumentFolderId { get; set; }


        public Status Status { get; set; }


        public DocumentFolder DocumentFolder { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public DateTimeOffset Created { get; set; }

        public Guid? SegmentId { get; set; }

        //public Guid? Identifier { get; set; }
    }

    public enum Status
    {
        InQueue = 1,
        Completed = 2
    }
}