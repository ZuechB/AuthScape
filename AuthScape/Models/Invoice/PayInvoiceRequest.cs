namespace AuthScape.Plugins.Invoices.Models
{
    public class PayInvoiceRequest
    {
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
    }

    public class StartSubscriptionRequest
    {
        public string PriceId { get; set; }
    }
}