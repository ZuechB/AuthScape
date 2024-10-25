using System;

namespace AuthScape.Analytics.Models
{
    public class AnalyticsPageView
    {
        public Guid Id { get; set; }
        public Guid? SessionId { get; set; }
        public long? UserId { get; set; }
        public long? LocationId { get; set; }
        public long? CompanyId { get; set; }
        public string? Uri { get; set; }
        public string Host { get; set; }
        public string? Referrer { get; set; }
        public string? IPAddress { get; set; }
        public string? UserAgent { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset? Deleted { get; set; }
        public AnalyticsSession? Session { get; set; }
    }
}