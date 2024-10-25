namespace AuthScape.Invoice.Models
{
    public class InvoiceLineItemView
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public DateTimeOffset? PaidDate { get; set; }
    }
}