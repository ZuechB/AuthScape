namespace AuthScape.NodeService.Models
{
    public class FlowNode
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }

        public string? Type { get; set; }

        public Guid FlowProjectId { get; set; }
        public FlowProject FlowProject { get; set; }

        public string? Data { get; set; } // data will be stored in a JSON Payload that matches the type
    }
}