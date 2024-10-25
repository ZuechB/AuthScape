using AuthScape.Models.Users;

namespace AuthScape.UserManageSystem.Models
{
    public class UserEditResult
    {
        public long? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public List<string>? Roles { get; set; }
        public List<string>? Permissions { get; set; }

        public List<CustomFieldResult> CustomFields { get; set; }


        public Location? Location { get; set; }
        public Company? Company { get; set; }
    }
}