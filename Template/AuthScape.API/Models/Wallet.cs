using AuthScape.Models.Users;
using System;

namespace AuthScape.Models.PaymentGateway
{
    public class Wallet
    {
        public long Id { get; set; }
        public long? CompanyId { get; set; }
        public long? UserId { get; set; }
        public long ExpMonth { get; set; }
        public long ExpYear { get; set; }
        public string Last4 { get; set; }
        public string FingerPrint { get; set; }
        public string Funding { get; set; }
        public WalletType WalletType { get; set; }
        public DateTimeOffset? Archived { get; set; }

        public string PaymentGatewayId { get; set; }
        public string Brand { get; set; }


        public Company Company { get; set; }
        public AppUser User { get; set; }
    }

    public enum WalletType
    {
        Card = 1,
        ACH = 2,
        StoreCredit = 3
    }
}
