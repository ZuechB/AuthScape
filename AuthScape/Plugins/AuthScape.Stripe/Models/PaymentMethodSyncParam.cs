namespace AuthScape.StripePayment.Models
{
    public class PaymentMethodSyncParam
    {
        public string payment_intent { get; set; }
        public long? invoiceId { get; set; }
    }
}