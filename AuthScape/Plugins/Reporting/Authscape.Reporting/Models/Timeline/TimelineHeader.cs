namespace Authscape.Reporting.Models.Timeline
{
    public class TimelineHeader
    {
        public TimelineHeader(string Type, string Id)
        {
            this.Type = Type;
            this.Id = Id;
        }

        public string Type { get; set; }
        public string Id { get; set; }
    }
}