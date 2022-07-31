namespace AuthScape.StripePayment.Models
{
    public class ChargeWithExistingPaymentParam
    {
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
        public decimal Amount { get; set; }
    }
}