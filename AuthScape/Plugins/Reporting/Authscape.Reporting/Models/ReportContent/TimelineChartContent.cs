using System.Collections.Generic;

namespace Authscape.Reporting.Models.ReportContent
{
    public class TimelineChartContent : BaseReportContent
    {
        public List<TimelineDataPoint> DataPoints { get; set; }
    }

    public class TimelineDataPoint
    {
        public string Label { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
