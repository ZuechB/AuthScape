namespace AuthScape.Models.Users
{
    public class SignedInUser
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid? Identifier { get; set; }
        public long? CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public long? LocationId { get; set; }
        public string? LocationName { get; set; }
        public string locale { get; set; }
        public List<QueryRole> Roles { get; set; }
        public List<string> Permissions { get; set; }
    }
}