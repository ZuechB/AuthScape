using AuthScape.Models.Users;

namespace Models.Users
{
    public class UserLocations
    {
        public long UserId { get; set; }
        public long LocationId { get; set; }

        public AppUser User { get; set; }
        public Location Location { get; set; }
    }
}