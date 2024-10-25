namespace AuthScape.Document.Models
{
    public class DocumentSegment
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<DocumentFolder> Folders { get; set; }
    }
}