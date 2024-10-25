using System.Collections.Generic;

namespace Authscape.Reporting.Models.ReportContent
{
    public class GaugeChartContent : BaseReportContent
    {
        public List<GaugeDataPoint> DataPoints { get; set; }
    }

    public class GaugeDataPoint
    {
        public string Label { get; set; }
        public int value { get; set; }
    }
}
