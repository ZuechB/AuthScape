using AuthScape.Analytics.Models;
using AuthScape.Models.Users;

namespace AuthScape.SendGrid.Models
{
    public class IncomingAnalyticsResponse
    {
        public MailEventType MailEvent { get; set; }
        public AppUser? AppUser { get; set; }
        public string? Email { get; set; }
        public DateTime TimeSpan { get; set; }
        public string? Subject { get; set; }
        public string? Html { get; set; }
    }
}
