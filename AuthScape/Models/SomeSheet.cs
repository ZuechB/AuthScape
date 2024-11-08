using AuthScape.Document.Mapping.Models.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class SomeSheet
    {
        [HideColumn]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [NameColumn("Supplier")]
        [NotMapped]
        [HideColumn]
        public string? SupplierName { get; set; }

        [NameColumn("Customer Number")]
        [HideColumn]
        public string? CustomerNumber { get; set; }

        [NameColumn("Account Number")]
        public string TestAccountNumber { get; set; }

        [HideColumn]
        public long? Supplier { get; set; }

        [NameColumn("Dealer Identifier")]
        [HideColumn]
        public string? DealerId { get; set; }

        [NameColumn("Dealer Name")]
        [NotMapped]
        [HideColumn]
        public string? Dealer { get; set; }

        [NameColumn("Gross")]
        public decimal GrossSales { get; set; }

        public decimal Rebatable { get; set; }


        [NameColumn("Purchase Order Number")]
        public string? PONumber { get; set; }

        [NameColumn("Invoice Number")]
        public string? InvoiceNumber { get; set; }
        public DateTime TransactionDate { get; set; }

        [HideColumn]
        public DateTimeOffset? PublishedToPlatformDate { get; set; }


        [HideColumn]
        public long UploadId { get; set; }


        [HideColumn]
        public bool RemoveRecord { get; set; }
        [HideColumn]
        public bool UpdateRecord { get; set; }
        [HideColumn]
        public bool AddRecord { get; set; }
        [NotMapped]
        [HideColumn]
        public int Transactions { get; set; }
    }
}