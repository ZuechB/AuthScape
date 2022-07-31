namespace AuthScape.Models.PaymentGateway.Stripe
{
    public class ChargeParam
    {
        public long walletId { get; set; }
        public decimal chargeAmount { get; set; }
    }
}