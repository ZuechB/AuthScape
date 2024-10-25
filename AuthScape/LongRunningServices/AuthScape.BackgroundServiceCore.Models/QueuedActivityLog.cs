namespace AuthScape.BackgroundServiceCore.Models
{
    public class QueuedActivityLog
    {
        public Guid Id { get; set; }
        public Guid QueuedActivityId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}