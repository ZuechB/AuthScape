using AuthScape.StripePayment.Models;

namespace AuthScape.Models.PaymentGateway
{
    public class PaymentRequest
    {
        /// <summary>
        /// will override the current user check
        /// </summary>
        public PaymentMethodType PaymentMethodType { get; set; }
        public decimal? Amount { get; set; } // Specify amount to charge an amount

        /// <summary>
        /// Only Required if not logged in
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Only Required if not logged in
        /// </summary>
        public string? Email { get; set; }



        public string? stripeCustomerId { get; set; }
    }
}