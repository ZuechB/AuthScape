
using AuthScape.Models.PaymentGateway;

namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoicePayment
    {
        public long Id { get; set; }
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
        public decimal Amount { get; set; }

        public Invoice Invoice { get; set; }
        public Wallet Wallet { get; set; } // what item in the wallet are we using
    }
}