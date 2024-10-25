namespace AuthScape.Invoice.Models
{
    public class LineItemParamChange
    {
        public long InvoiceId { get; set; }
        //public Guid lineItemId { get; set; }
        public Guid Id { get; set; }
        public string Field { get; set; }
        public string Value { get; set; }
    }
}