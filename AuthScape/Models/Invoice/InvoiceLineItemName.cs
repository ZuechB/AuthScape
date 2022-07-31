namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoiceLineItemsName
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<InvoiceLineItem> InvoiceLineItems { get; set; }
    }
}