namespace AuthScape.Document.Models
{
    public class SharedDocument
    {
        public Guid DocumentId { get; set; }
        public long UserId { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}