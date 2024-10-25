namespace AuthScape.TicketSystem.Models
{
    public class AddParticipantsViewModel
    {
        public long TicketId { get; set; }
        public List<ParticipantViewModel> Participants { get; set; }
    }

    public class ParticipantViewModel
    {
        public long Id { get; set; }
        public string Label { get; set; }
    }
}