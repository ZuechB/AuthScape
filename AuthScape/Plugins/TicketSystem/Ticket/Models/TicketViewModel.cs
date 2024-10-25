using AuthScape.TicketSystem.Modals;

namespace AuthScape.TicketSystem.Models
{
    public class TicketViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AssignedFirstName { get; set; }
        public string AssignedLastName { get; set; }
        public string AssignedEmail { get; set; }
        public List<TicketStatus> TicketStatuses { get; set; }
        public List<TicketType> TicketTypes { get; set; }

        public int SelectedTicketStatusId { get; set; }
        public int SelectedTicketTypeId { get; set; }
        public int SelectedPriortyId { get; set; }
        public TicketAutoComplete? selectedCreatedBy { get; set; }


        // assigned to
        public string? CompanyName { get; set; }
        public string? CustomTabPayload { get; set; }

        public PriorityLevel PriorityLevel { get; set; }
        public string Created { get; set; }
        public string LastUpdated { get; set; }
        public List<TicketAutoComplete> Participants { get; set; }

        public List<TicketAttachment> Attachments { get; set; }
    }
}
