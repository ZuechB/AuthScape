using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Analytics.Models
{
    public class AnalyticsConversion
    {
        public Guid Id { get; set; }
        public Guid SessionId { get; set; }
        public long? UserId { get; set; }
        public long? LocationId { get; set; }
        public long? CompanyId { get; set; }
        public long? TransactionId { get; set; }
        public string? Category { get; set; }
        public string? Value { get; set; }
        public DateTimeOffset Created { get; set; }
        public AnalyticsSession Session { get; set; }

    }
}
