using Authscape.Models.Reporting;

namespace Authscape.Reporting.Models
{
    public class ReportData
    {
        public IEnumerable<object> Content { get; set; }
        public IEnumerable<object> Columns { get; set; }
        public ReportType ReportType { get; set; }
    }
}
