namespace AuthScape.NodeService.Models
{
    public class FlowViewport
    {
        public Guid Id { get; set; }

        public float x { get; set; }
        public float y { get; set; }
        public float zoom { get; set; }

        public Guid FlowProjectId { get; set; }
        public FlowProject FlowProject { get; set; }
    }
}