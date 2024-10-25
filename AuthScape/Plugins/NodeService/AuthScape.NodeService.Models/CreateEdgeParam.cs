namespace AuthScape.Flows.Models
{
    public class CreateEdgeParam
    {
        public Guid ProjectId { get; set; }
        public Guid Source { get; set; }
        public Guid Target { get; set; }
        public string Type { get; set; }
    }
}
