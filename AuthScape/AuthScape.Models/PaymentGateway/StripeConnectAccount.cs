namespace AuthScape.Models.PaymentGateway
{
    public class StripeConnectAccount
    {
        public long CompanyId { get; set; }
        public string StripeConnectAccountId { get; set; }
        public string? BusinessName { get; set; }
        public string? ProductDescription { get; set; }
        public string? SupportAddress { get; set; }
        public string? SupportCity { get; set; }
        public string? SupportZipCode { get; set;}
        public string? SupportState { get; set; }
        public string? SupportEmail { get; set; }
        public string? SupportPhone { get; set; }
        public string? Url { get; set; }
        public bool Card_payments { get; set; }
        public bool Transfers { get; set; }
        public bool ValidationCompleted { get; set; }
    }
}