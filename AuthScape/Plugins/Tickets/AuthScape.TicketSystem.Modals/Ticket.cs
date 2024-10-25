using AuthScape.TicketSystem.Modals;

namespace AuthScape.TicketSystem.Modals
{
    public class Ticket
    {
        public long Id { get; set; }
        
        public long? CreatedById { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? CompanyName { get; set; }
        public string? LocationName { get; set; }


        public string Title { get; set; }
        public string Description { get; set; }
        public int TicketStatusId { get; set; }
        public int TicketTypeId { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }

        public PriorityLevel PriorityLevel { get; set; }

        public DateTimeOffset Created { get; set; }
        public DateTimeOffset LastUpdated { get; set; }


        public TicketType TicketType { get; set; }
        public TicketStatus TicketStatus { get; set; }


        public string? CustomTabPayload { get; set; }


        public ICollection<TicketMessage> TicketMessages { get; set; }
        public ICollection<TicketParticipant> TicketParticipants { get; set; }
        public ICollection<TicketAttachment> TicketAttachments { get; set; }
    }
}
