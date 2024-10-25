using Microsoft.EntityFrameworkCore;

namespace AuthScape.TicketSystem.Modals
{
    public class TicketContextSetup
    {
        public static void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Ticket>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.TicketStatus)
                  .WithMany(u => u.Tickets)
                  .HasForeignKey(rf => rf.TicketStatusId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.TicketType)
                  .WithMany(u => u.Tickets)
                  .HasForeignKey(rf => rf.TicketTypeId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketParticipant>(entity =>
            {
                entity.HasKey(e => new { e.TicketId, e.UserId });

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketParticipants)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketMessage>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketMessages)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketType>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<TicketStatus>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<TicketAttachment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketAttachments)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }
    }
}
