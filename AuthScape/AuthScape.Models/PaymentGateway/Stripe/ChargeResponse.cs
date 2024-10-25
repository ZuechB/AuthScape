namespace AuthScape.Models.PaymentGateway.Stripe
{
    public class ChargeResponse
    {
        public string? StripePaymentIntentId { get; set; }
        public bool Success { get; set; }
        public string? Reason { get; set; }
    }
}