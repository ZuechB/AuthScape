namespace AuthScape.Document.Models
{
    public class DocumentFolder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public long? CompanyId { get; set; }
        public long? UploadedByUserId { get; set; }
        public Guid? Identifier { get; set; }

        public Guid? ParentId { get; set; }

        public Guid? SegmentId { get; set; }

        public DocumentFolder? ParentFolder { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public DateTimeOffset Created { get; set; }

        public bool IsLocked { get; set; }

        public ICollection<DocumentFolder> Children { get; set; }
        public DocumentSegment? Segment { get; set; }

        public long? FieldId1 { get; set; }
        public long? FieldId2 { get; set; }
        public long? FieldId3 { get; set; }
    }
}