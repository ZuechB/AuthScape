namespace AuthScape.Plugins.Invoices.Models
{
    public class SimpleInvoice
    {
        public long Id { get; set; }
        public string ClientName { get; set; }
        public List<InvoicePayment> InvoicePayments { get; set; }
        public List<InvoiceLineItem> InvoiceLineItems { get; set; }
        public decimal BalanceDue { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public InvoiceState InvoiceState { get; set; }
    }
}