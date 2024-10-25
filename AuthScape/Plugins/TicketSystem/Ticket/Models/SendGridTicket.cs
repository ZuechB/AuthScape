using AuthScape.SendGrid.Models;

namespace Models.Email
{
    public class SendGridTicket : BaseEmail
    {
        public string Title { get; set; }
        public string Body { get; set; }
    }
}