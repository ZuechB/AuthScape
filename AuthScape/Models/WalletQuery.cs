namespace AuthScape.Models.PaymentGateway
{
    public class WalletQuery
    {
        public long Id { get; set; }
        public long? ExpMonth { get; set; }
        public long? ExpYear { get; set; }
        public string Last4 { get; set; }
        public string FingerPrint { get; set; }
        public string? Funding { get; set; }
        public WalletType WalletType { get; set; }
        public string? Brand { get; set; }
    }
}