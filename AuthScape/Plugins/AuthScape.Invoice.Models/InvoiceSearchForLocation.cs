namespace AuthScape.Invoice.Models
{
    public class InvoiceSearchForLocation
    {
        public int offset { get; set; } = 1;
        public int length { get; set; } = 10;
        public long CompanyId { get; set; }
        public string LocationName { get; set; }
        public bool isActive { get; set; }
    }
}