namespace AuthScape.NodeService.Models
{
    public class FlowProject
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public long? OwnerId { get; set; }
        public DateTimeOffset Created { get; set; }


        public ICollection<FlowEdge> Edges { get; set; }
        public ICollection<FlowNode> Nodes { get; set; }
        public ICollection<FlowViewport> Viewports { get; set; }
    }
}