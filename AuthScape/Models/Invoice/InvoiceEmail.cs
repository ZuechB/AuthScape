using Models.Email;

namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoiceEmail : BaseEmail
    {
        public string amountdue { get; set; }
        public string paylink { get; set; }
    }
}
