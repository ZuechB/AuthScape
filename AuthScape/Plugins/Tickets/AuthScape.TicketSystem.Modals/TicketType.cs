namespace AuthScape.TicketSystem.Modals
{
    public class TicketType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}