using AuthScape.Document.Mapping.Models.Attributes;

namespace Models
{
    public class InboundSheet
    {
        [HideColumn]
        public long Id { get; set; }

        [NameColumn("Customer Number")]
        public string? CustomerNumber { get; set; }

        [NameColumn("Indeal Account Number")]
        public string? IndealAccountNumber { get; set; }
        public string? Supplier { get; set; }
        public string? Dealer { get; set; }

        [NameColumn("Gross Sales")]
        public string GrossSales { get; set; }

        public string Rebatable { get; set; }


        [NameColumn("Purchase Order Number")]
        public string? PONumber { get; set; }

        [NameColumn("Invoice Number")]
        public string? InvoiceNumber { get; set; }


        public DateTime? Date { get; set; }

        
        [HideColumn]
        public Guid? SalesDataId { get; set; } // this is how we will know if it is in microsoft's CRM


    }
}