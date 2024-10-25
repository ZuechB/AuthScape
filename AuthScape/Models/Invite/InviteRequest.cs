namespace Models.Invite
{
    public class InviteRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }
        public string Locale { get; set; } = "Eastern Standard Time";
        public string? PhoneNumber { get; set; }

        public string? CompanyName { get; set; }
    }
}
