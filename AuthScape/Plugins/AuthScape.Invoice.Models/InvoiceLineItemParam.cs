namespace AuthScape.Invoice.Models
{
    public class InvoiceLineItemParam
    {
        public long invoiceId { get; set; }
        public long invoiceLineItemNameId { get; set; }
        public decimal price { get; set; }
        public int qty { get; set; }
    }
}
