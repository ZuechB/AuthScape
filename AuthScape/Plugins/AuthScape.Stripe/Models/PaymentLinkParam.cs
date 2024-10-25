namespace AuthScape.StripePayment.Models
{
    public class PaymentLinkParam
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
    }
}