namespace AuthScape.Models.Mail
{
    public class Attachments
    {
        public string Id { get; set; }
        public string ContentType { get; set; }
        public Stream Data { get; set; }
        public string FileName { get; set; }
        public string Name { get; set; }
        public string ContentId { get; set; }
    }
}