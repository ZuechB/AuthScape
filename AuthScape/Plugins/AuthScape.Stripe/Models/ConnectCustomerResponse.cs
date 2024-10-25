namespace AuthScape.StripePayment.Models
{
    public class ConnectCustomerResponse
    {
        public string ClientSecret { get; set; }
        public Guid? WalletId { get; set; }
        public string StripePublicKey { get; set; }
    }
}
