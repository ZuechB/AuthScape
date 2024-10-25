namespace AuthScape.StripePayment.Models
{
    public class StripeCheckoutParam
    {
        public string SuccessURL { get; set; }
        public StripeCheckoutMode mode { get; set; }
        public List<StripeCheckoutLineItemParam> Items { get; set; }
    }

    public enum StripeCheckoutMode
    {
        Payment = 1,
        Subscription = 2
    }

    public class StripeCheckoutLineItemParam
    {
        public string StripePriceId { get; set; }
        public int Qty { get; set; }
    }
}
