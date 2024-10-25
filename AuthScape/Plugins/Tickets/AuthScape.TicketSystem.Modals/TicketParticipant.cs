namespace AuthScape.TicketSystem.Modals
{
    public class TicketParticipant
    {
        public long UserId { get; set; }
        public long TicketId { get; set; }

        public Ticket Ticket { get; set; }
    }
}