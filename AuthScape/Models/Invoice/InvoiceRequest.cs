namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoiceRequest
    {
        public decimal TotalAmount { get; set; }
        public string Memo { get; set; }
    }
}