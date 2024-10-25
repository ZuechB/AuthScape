namespace AuthScape.Invoice.Models
{
    public class InvoiceSheet
    {
        public long Id { get; set; }
        public decimal Total { get; set; }
        public string Client { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string BillingPeriod { get; set; }
        public string DueDate { get; set; }
    }
}