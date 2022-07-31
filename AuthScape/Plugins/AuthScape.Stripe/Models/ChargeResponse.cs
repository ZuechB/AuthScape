namespace AuthScape.StripePayment.Models
{
    public class ChargeResponse
    {
        public bool Success { get; set; }
        public string Reason { get; set; }
    }
}