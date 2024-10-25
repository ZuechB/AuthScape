using Microsoft.EntityFrameworkCore;

namespace AuthScape.UserManagementSystem.Models
{
    public class RegisterUserManagementService
    {
        public static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CustomField>(entity =>
            {
                entity.HasKey(e => e.Id);

            });

            builder.Entity<UserCustomField>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CustomFieldId });

            });
        }
    }
}
