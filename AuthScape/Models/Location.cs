
namespace AuthScape.Models.Users
{
    public class Location
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public long CompanyId { get; set; }
        public Company Company { get; set; }
    }
}