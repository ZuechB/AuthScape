namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoicePayment
    {
        public long Id { get; set; }
        public long InvoiceId { get; set; }
        public Guid WalletPaymentMethodId { get; set; }
        public decimal Amount { get; set; }

        public Invoice Invoice { get; set; }
    }
}