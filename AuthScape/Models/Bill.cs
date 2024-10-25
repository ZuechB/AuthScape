
namespace Models
{
    public class Bill
    {
        public decimal AmountDue { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerAddressRecipient { get; set; }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceId { get; set; }
        public decimal InvoiceTotal { get; set; }
        public decimal PreviousUnpaidBalance { get; set; }
        public string ServiceAddress { get; set; }
        public string ServiceAddressRecipient { get; set; }
        public DateTime ServiceStartDate { get; set; }
        public decimal TotalTax { get; set; }
        public string VendorName { get; set; }

    }
}
