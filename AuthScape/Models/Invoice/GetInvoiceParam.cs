namespace AuthScape.Plugins.Invoices.Models
{
    public class GetInvoiceParam
    {
        public int offset { get; set; } = 1;
        public int length { get; set; } = 10;
        public InvoiceState invoiceState { get; set; } = InvoiceState.InProgress;
    }
}