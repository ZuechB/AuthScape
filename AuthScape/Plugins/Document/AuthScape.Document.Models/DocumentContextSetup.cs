using Microsoft.EntityFrameworkCore;

namespace AuthScape.Document.Models
{
    public class DocumentContextSetup
    {
        public static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DocumentItem>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<DocumentFolder>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Segment)
                .WithMany(m => m.Folders)
                .HasForeignKey(e => e.SegmentId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<DocumentSegment>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
        }
    }
}