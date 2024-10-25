namespace AuthScape.NodeService.Models
{
    public class FlowPayload
    {
        public Guid projectId { get; set; }
        public List<FlowPayloadNode> nodes { get; set; }
        public List<FlowPayloadEdge> edges { get; set; }
        public FlowPayloadViewport viewport { get; set; }
    }

    public class FlowPayloadViewport
    {
        public float x { get; set; }
        public float y { get; set; }
        public float zoom { get; set; }
    }

    public class FlowPayloadNode
    {
        public int width { get; set; }
        public int height { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public FlowPayloadData data { get; set; }
        public FlowPayloadPosition position { get; set; }
        public string? sourcePosition { get; set; }
        public FlowPayloadPositionabsolute positionAbsolute { get; set; }
        public FlowPayloadStyle? style { get; set; }
        public string? targetPosition { get; set; }
    }

    public class FlowPayloadData
    {
        public Guid Id { get; set; }
        public string label { get; set; }
        public string? color { get; set; }
    }

    public class FlowPayloadPosition
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    public class FlowPayloadPositionabsolute
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    public class FlowPayloadStyle
    {
        public string border { get; set; }
        public int padding { get; set; }
    }

    public class FlowPayloadEdge
    {
        public string id { get; set; }
        public string source { get; set; }
        public string target { get; set; }
        public string? type { get; set; }
        public bool animated { get; set; }
        public FlowPayloadStyle1? style { get; set; }
        public string? sourceHandle { get; set; }
        public Guid projectId { get; set; }
    }

    public class FlowPayloadStyle1
    {
        public string stroke { get; set; }
    }

}
