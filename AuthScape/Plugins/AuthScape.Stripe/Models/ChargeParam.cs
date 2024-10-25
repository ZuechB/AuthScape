using AuthScape.StripePayment.Models;

namespace AuthScape.Models.PaymentGateway.Stripe
{
    public class ChargeParam
    {
        public PaymentMethodType PaymentMethodType { get; set; }
        public Guid WalletPaymentMethodId { get; set; }
        public decimal Amount { get; set; }
    }
}