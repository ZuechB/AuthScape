namespace AuthScape.Plugins.Invoices.Models
{
    public class SimpleInvoice
    {
        public long Id { get; set; }
        public string? ClientName { get; set; }
        public string? LocationName { get; set; }
        public List<InvoicePayment> InvoicePayments { get; set; }
        public List<InvoiceLineItem> InvoiceLineItems { get; set; }
        public decimal BalanceDue { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }


        public DateTime? DueDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }


        public string StringDueDate { get; set; }
        public string StringStartDate { get; set; }
        public string StringEndDate { get; set; }

        public string? PaymentGatewayCustomerId { get; set; }


        public string? ShipToCompany { get; set; }
        public string? ShipToAddress { get; set; }


        public InvoiceState InvoiceState { get; set; }
    }
}