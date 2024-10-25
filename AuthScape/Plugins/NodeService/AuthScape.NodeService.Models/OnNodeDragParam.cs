namespace AuthScape.Flows.Models
{
    public class OnNodeDragParam
    {
        public Guid ProjectId { get; set; }
        public Guid Id { get; set; }
        public NewNodeParamPosition Position { get; set; }
    }
}