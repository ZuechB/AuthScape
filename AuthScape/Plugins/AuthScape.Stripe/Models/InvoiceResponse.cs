namespace AuthScape.StripePayment.Models
{
    public class InvoiceResponse
    {
        public string PercentTax { get; set; }
        public decimal Subtotal { get; set; }
        public decimal? ShippingAmount { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}