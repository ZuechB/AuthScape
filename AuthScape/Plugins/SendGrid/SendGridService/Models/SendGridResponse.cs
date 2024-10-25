using System.Net;

namespace AuthScape.SendGrid.Models
{
    public class SendGridResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public string? Message { get; set; }
    }
}
