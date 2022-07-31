using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AuthScape.Models.Pages;
using AuthScape.Models.Stylesheets;
using AuthScape.Models.Users;
using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Coupons;
using AuthScape.Models.PaymentGateway.Plans;

namespace Services.Context
{
    public class DatabaseContext : IdentityDbContext<AppUser, Role, long>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Stylesheet> Stylesheets { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Location> Locations { get; set; }

        #region PaymentGateway

        public DbSet<Plan> Plans { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<StoreCredit> StoreCredits { get; set; }

        #endregion

        #region Coupons

        public DbSet<Coupon> Coupons { get; set; }
        //public DbSet<ProductCoupon> ProductCoupons { get; set; }

        #endregion

        #region Inventory / Products

        //public DbSet<Product> Products { get; set; }
        //public DbSet<ProductCategory> ProductCategories { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                    .WithMany(m => m.Users)
                    .HasForeignKey(rf => rf.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.Locations)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Wallet>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.Cards)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<StoreCredit>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.StoreCredits)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.GiftFromUser)
                  .WithMany(u => u.GiftedCredit)
                  .HasForeignKey(rf => rf.GiftFromId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            // keep at the bottom
            base.OnModelCreating(builder);
        }
    }
}
