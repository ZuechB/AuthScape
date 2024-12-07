using AuthScape.UserManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using Models.Users;

namespace AuthScape.UserManageSystem.Models
{
    public class UserMangementContextSetup
    {
        public static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Permission>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<CustomField>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.CustomFieldTab)
                    .WithMany(m => m.CustomFieldTabs)
                    .HasForeignKey(rf => rf.TabId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<CustomFieldTab>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });
        }
    }
}
