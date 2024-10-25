namespace AuthScape.Plugins.Invoices.Models
{
    public class AssignCompanyToInvoiceData
    {
        public long InvoiceId { get; set; }
        public long CompanyId { get; set; }
    }
    public class AssignLocationToInvoiceData
    {
        public long InvoiceId { get; set; }
        public long LocationId { get; set; }
    }
}