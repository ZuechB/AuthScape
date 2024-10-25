using AuthScape.Models.PaymentGateway;
using AuthScape.PrivateLabel.Models;
using AuthScape.UserManageSystem.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Models.Users
{
    public class Company
    {
        public long Id { get; set; }
        public string? Logo { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }

        public bool IsDeactivated { get; set; }

        public ICollection<AppUser> Users { get; set; }
        public ICollection<StoreCredit> StoreCredits { get; set; }
        public ICollection<Location> Locations { get; set; }
        public ICollection<DnsRecord> DnsRecords { get; set; }

        [NotMapped]
        public List<CustomFieldResult> CustomFields { get; set; }
    }

    public class NCACompanyQuery
    {
        public string label { get; set; }
        public long id { get; set; }
    }
}