using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Analytics.Models
{
    public class AnalyticsSession
    {
        public Guid Id { get; set; }
        public long? UserId { get; set; }
        public long? LocationId { get; set; }
        public long? CompanyId { get; set; }
        public string? Category { get; set; }
        public decimal? Value { get; set; }
        public ICollection<AnalyticsConversion>? Conversions { get; set; }
        public ICollection<AnalyticsEvent>? Events { get; set; }
        public ICollection<AnalyticsPageView>? PageViews { get; set; }
        public DateTimeOffset Started { get; set; }
        public DateTimeOffset? Ended { get; set; }
        public DateTimeOffset? Deleted { get; set; }
        public decimal? Duration { get; set; }
        public string? UserAgent { get; set; }
        public string? IPAddress { get; set; }
        public string? Device { get; set; }

    }

}
