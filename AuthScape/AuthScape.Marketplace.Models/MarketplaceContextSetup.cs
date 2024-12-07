using Microsoft.EntityFrameworkCore;


namespace AuthScape.Marketplace.Models
{
    public class MarketplaceContextSetup
    {
        public static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<ProductCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<ProductField>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.ProductCategory)
                    .WithMany(m => m.ProductFields)
                    .HasForeignKey(rf => rf.ProductCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<ProductCategoryField>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.ProductId, e.ProductFieldId });
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.Product)
                    .WithMany(m => m.ProductCategoryFields)
                    .HasForeignKey(rf => rf.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.ProductField)
                    .WithMany(m => m.ProductCategoryFields)
                    .HasForeignKey(rf => rf.ProductFieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

        }
    }
}
