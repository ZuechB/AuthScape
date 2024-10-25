namespace AuthScape.TicketSystem.Modals
{
    public class TicketView
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string TicketStatus { get; set; }
        public string TicketType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? CompanyName { get; set; }
        public string? LocationName { get; set; }
        public string Created { get; set; }

        public int TicketParticipants { get; set; }
        public int Messages { get; set; }
    }
}