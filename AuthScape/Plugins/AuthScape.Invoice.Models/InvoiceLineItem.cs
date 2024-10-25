using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoiceLineItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public long InvoiceId { get; set; }
        public long InvoiceLineItemNameId { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public decimal Total { get; set; }
        public DateTimeOffset? PaidDateTime { get; set; }
        public long? PaidBy { get; set; }
        public string? PaymentIntentId { get; set; }

        public Invoice Invoice { get; set; }
        public InvoiceLineItemsName InvoiceLineItemName { get; set; }

        [NotMapped]
        public string Name { get; set; }
        [NotMapped]
        public string PaidDateTimeString { get; set; }
    }
}
