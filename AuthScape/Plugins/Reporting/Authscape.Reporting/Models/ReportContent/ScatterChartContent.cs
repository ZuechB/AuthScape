using System.Collections.Generic;

namespace Authscape.Reporting.Models.ReportContent
{
    public class ScatterChartContent : BaseReportContent
    {
        public List<ScatterChartDataPoint> DataPoints { get; set; }
        public string Title { get; set; }

        public string XName { get; set; }
        public string YName { get; set; }
    }

    public class ScatterChartDataPoint
    {
        public ScatterChartDataPoint(decimal x, decimal y)
        {
            X = x;
            Y = y;
        }

        public decimal X { get; set; }
        public decimal Y { get; set; }
    }
}