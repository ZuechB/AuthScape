namespace AuthScape.Document.Models
{
    public class DocumentAndFile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DocumentFileExtentionType DocumentFileExtentionType { get; set; }
        public string Uri { get; set; }
        public int Count { get; set; }
        public string LastUpdated { get; set; }
        public bool IsLocked { get; set; }

        public Guid? SegmentId { get; set; }
        public string? SegmentName { get; set; }
    }

    public class DocumentSegmentOptions
    {
        public List<DocumentSegment> DocumentSegments { get; set; }
        public List<DocumentAndFile> DocumentAndFiles { get; set; }
    }

    public enum DocumentFileExtentionType
    {
        None = 0,
        Photo = 1
    }
}