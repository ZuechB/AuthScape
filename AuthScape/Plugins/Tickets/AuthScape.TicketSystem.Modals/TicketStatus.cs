namespace AuthScape.TicketSystem.Modals
{
    public class TicketStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool CompletedStep { get; set; }
        public bool ArchiveStep { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}