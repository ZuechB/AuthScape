using AuthScape.Models.Users;
using AuthScape.Models.PaymentGateway;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Plugins.Invoices.Models
{
    public class Invoice
    {
        public long Id { get; set; }
        public decimal BalanceDue { get; set; }
        public decimal Total { get; set; }
        public DateTimeOffset Created { get; set; }
        public string? Memo { get; set; }
        public DateTimeOffset? InvoiceDueDate { get; set; }

        public long InvoiceToUserId { get; set; }

        public long? CompanyId { get; set; }
        public long? PaidById { get; set; }
        public DateTimeOffset? WhenPaid { get; set; }
        public long? WalletId { get; set; }
        public decimal AmountPaid { get; set; }

        public InvoiceState InvoiceState { get; set; }

        public Guid Secret { get; set; }


        public Company Company { get; set; }
        public AppUser PaidBy { get; set; }
        public Wallet Wallet { get; set; }

        [NotMapped]
        public string CreatedString { get; set; }
        [NotMapped]
        public string DueDateString { get; set; }

        public ICollection<InvoicePayment> InvoicePayments { get; set; }
        public ICollection<InvoiceLineItem> InvoiceLineItems { get; set; }
        public AppUser InvoiceToUser { get; set; }
    }

    public enum InvoiceState
    {
        InProgress = 0,
        Open = 1,
        Paid = 2, // same as closed
        OnHold = 3,
        Archived = 4
    }
}
