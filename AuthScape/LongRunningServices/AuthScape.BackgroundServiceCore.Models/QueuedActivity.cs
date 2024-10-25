namespace BackgroundServiceCore.DataModels
{
    public class QueuedActivity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? TimeZoneById { get; set; }
        public string? CronExpression { get; set; }
        public string ActivityName { get; set; }
        public bool IsRunning { get; set; }
        public bool IsDiabled { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}