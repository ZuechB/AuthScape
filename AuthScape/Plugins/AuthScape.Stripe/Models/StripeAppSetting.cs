namespace AuthScape.StripePayment.Models
{
    public class StripeAppSetting
    {
        public string PublishableKey { get; set; }
        public string SecretKey { get; set; }
        public string SigningSecret { get; set; }
    }
}