using AuthScape.Models.Users;

namespace Models.Invite
{
    public class RequestedInvite
    {
        public List<InviteRequest> Requests { get; set; }
    }

    public class InviteRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }
        public Roles Role { get; set; }
        public string Locale { get; set; } = "Eastern Standard Time";
        public string? PhoneNumber { get; set; }
    }
}