using AuthScape.Models.Users;

namespace AuthScape.Models.PaymentGateway
{
    public class StoreCredit
    {
        public long Id { get; set; }
        public long? UserId { get; set; }
        public decimal StartingAmount { get; set; }
        public decimal ActualAmount { get; set; }
        public string Memo { get; set; }
        public long? GiftFromId { get; set; }

        public CreditType CreditType { get; set; }

        public AppUser User { get; set; }
        public AppUser GiftFromUser { get; set; }
    }

    public enum CreditType
    {
        StoreCredit = 1,
        CompanyCredit = 2,
        GiftCredit = 3
    }
}