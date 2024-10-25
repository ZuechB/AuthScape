using AuthScape.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Plugins.Invoices.Models
{
    public class Invoice
    {
        public long Id { get; set; }
        public decimal BalanceDue { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }

        public DateTime DueDate { get; set; }
        public string CompanyName { get; set; }
        public string? SDatePeriod { get; set; }

        public string? Notes { get; set; }


        public DateTime? BillingStartDate { get; set; }
        public DateTime? BillingEndDate { get; set; }

        [NotMapped]
        public string? CreatedString { get; set; }
        [NotMapped]
        public string? DueDateString { get; set; }
        [NotMapped]
        public string? LocationName { get; set; }
        [NotMapped]
        public string? BillingPeriod { get; set; }

        public DateTimeOffset Created { get; set; }

        public long? InvoiceToUserId { get; set; }

        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }


        public long? ShipToLocationId { get; set; } // location to ship this product


        public InvoiceState InvoiceState { get; set; }

        public Guid Secret { get; set; }


        public Company Company { get; set; }
        public Location Location { get; set; }


        public ICollection<InvoicePayment> InvoicePayments { get; set; }
        public ICollection<InvoiceLineItem> InvoiceLineItems { get; set; }
        public AppUser InvoiceToUser { get; set; }
    }
}
