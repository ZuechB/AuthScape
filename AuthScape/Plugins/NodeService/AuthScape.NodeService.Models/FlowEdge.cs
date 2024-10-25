namespace AuthScape.NodeService.Models
{
    public class FlowEdge
    {
        public Guid Id { get; set; }
        public Guid FlowSource { get; set; }
        public Guid FlowTarget { get; set; }

        public string? Type { get; set; }

        public Guid FlowProjectId { get; set; }
        public FlowProject FlowProject { get; set; }
    }
}