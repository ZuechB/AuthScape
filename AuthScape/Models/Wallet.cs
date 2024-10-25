using AuthScape.Models.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Models.PaymentGateway
{
    public class Wallet
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public long? CompanyId { get; set; }
        public long? UserId { get; set; }
        public long? LocationId { get; set; }
        public string? PaymentCustomerId { get; set; }

        public Company Company { get; set; }
        public AppUser User { get; set; }

        public ICollection<WalletPaymentMethod> WalletPaymentMethods { get; set; }
    }

    public class WalletPaymentMethod
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid WalletId { get; set; }

        public long? ExpMonth { get; set; }
        public long? ExpYear { get; set; }
        public string? Last4 { get; set; }
        public string? FingerPrint { get; set; }
        public string? Funding { get; set; }
        public WalletType WalletType { get; set; }
        public DateTimeOffset? Archived { get; set; }
        
        public string? PaymentMethodId { get; set; }
        public string? Brand { get; set; }

        public string? RoutingNumber { get; set; }
        public string? AccountType { get; set; }
        public string? AccountHolderType { get; set; }
        public string? BankName { get; set; }

        public Wallet Wallet { get; set; }
    }

    public enum WalletType
    {
        acss_debit = 1,
        affirm = 2,
        afterpay_clearpay = 3,
        alipay = 4,
        au_becs_debit = 5,
        bacs_debit = 6,
        bancontact = 7,
        blik = 8,
        boleto = 9,
        card = 10,
        card_present = 11,
        cashapp = 12,
        customer_balance = 13,
        eps = 14,
        fpx = 15,
        giropay = 16,
        grabpay = 17,
        ideal = 18,
        interac_present = 19,
        klarna = 20,
        konbini = 21,
        link = 22,
        oxxo = 23,
        p24 = 24,
        paynow = 25,
        paypal = 26,
        pix = 27,
        promptpay = 28,
        sepa_debit = 29,
        sofort = 30,
        us_bank_account = 31,
        wechat_pay = 32,
        zip = 33,
        StoreCredit = 34
    }
}
