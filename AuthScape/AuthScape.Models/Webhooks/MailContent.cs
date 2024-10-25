namespace AuthScape.Models.Webhooks
{
    public class SendGridWebhookContent
    {
        public SendGridEmailToEmail[] ToEmail { get; set; }
        public string FromEmail { get; set; }
        public string Message { get; set; }
        public SendGridEmailAttachment[] Attachments { get; set; }
        public InboundType InboundType { get; set; }
    }

    public enum InboundType
    {
        NewEmail,
        ReplyEmail,
    }

    public class SendGridEmailToEmail
    {
        public string Email { get; set; }
        public string Name { get; set; }
    }

    public class SendGridEmailAttachment
    {
        public string Id { get; set; }
        public string ContentType { get; set; }
        public Stream Data { get; set; }
        public string FileName { get; set; }
        public string Name { get; set; }
        public string ContentId { get; set; }
    }
}
