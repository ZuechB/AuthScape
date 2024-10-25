using AuthScape.SendGrid.Models;

namespace Models.Email
{
    public class InvoiceEmail : BaseEmail
    {
        public string amountdue { get; set; }
        public string paylink { get; set; }
    }
}
