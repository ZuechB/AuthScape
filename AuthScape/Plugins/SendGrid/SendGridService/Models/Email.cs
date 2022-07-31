using SendGrid.Helpers.Mail;

namespace AuthScape.SendGrid.Models
{
    public class Email
    {
        public Email(string _apiKey)
        {
            ApiKey = _apiKey;
            TextContent = " ";
            HtmlContent = " ";
        }

        public EmailAddress To { get; set; }
        public string Subject { get; set; }
        public string TextContent { get; set; }
        public string HtmlContent { get; set; }
        public IEnumerable<KeyValuePair<string, string>> Headers { get; set; }
        public object Substitutions { get; set; }
        public string ApiKey { get; private set; }

        public From From { get; set; }
        public string TemplateId { get; set; }
    }

    public class From
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
