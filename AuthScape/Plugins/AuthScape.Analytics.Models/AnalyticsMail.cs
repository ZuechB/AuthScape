namespace AuthScape.Analytics.Models
{
    public class AnalyticsMail
    {
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public string? Html { get; set; }
        public string? TemplateId { get; set; }
        public string TemplateName { get; set; }

        public string? MessageId { get; set; }

        public ICollection<AnalyticsMailTracking> AnalyticsMailTracking { get; set; }
    }
}
