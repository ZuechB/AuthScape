namespace AuthScape.Plugins.Invoices.Models
{
    public class GetInvoiceParam
    {
        public long? LocationId { get; set; }
        public long? CompanyId { get; set; }

        public int offset { get; set; } = 0;
        public int length { get; set; } = 10;

        public bool pending { get; set; } = false;
        public InvoiceState invoiceState { get; set; } = InvoiceState.Active;
    }
}