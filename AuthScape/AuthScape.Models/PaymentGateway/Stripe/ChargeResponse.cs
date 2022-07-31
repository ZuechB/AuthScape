namespace AuthScape.Models.PaymentGateway.Stripe
{
    public class ChargeResponse
    {
        public bool Success { get; set; }
        public string Reason { get; set; }
    }
}