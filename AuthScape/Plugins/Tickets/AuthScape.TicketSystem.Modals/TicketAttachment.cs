namespace AuthScape.TicketSystem.Modals
{
    public class TicketAttachment
    {
        public long Id { get; set; }
        public long TicketId { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }

        public string? Payload { get; set; }

        public Ticket Ticket { get; set; }
    }
}