using AuthScape.Plugins.Invoices.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Plugins.Invoices.Models
{
    public class InvoiceLineItem
    {
        public long Id { get; set; }
        public long InvoiceId { get; set; }
        public long InvoiceLineItemNameId { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public decimal Total { get; set; }
        public DateTimeOffset? PaidDateTime { get; set; }
        public long? PaidBy { get; set; }

        public Invoice Invoice { get; set; }
        public InvoiceLineItemsName InvoiceLineItemName { get; set; }

        [NotMapped]
        public string Name { get; set; }
        [NotMapped]
        public string PaidDateTimeString { get; set; }
    }

    public class InvoiceLineItemParam
    {
        public long invoiceId { get; set; }
        public long invoiceLineItemNameId { get; set; }
        public decimal price { get; set; }
        public int qty { get; set; }
    }
}