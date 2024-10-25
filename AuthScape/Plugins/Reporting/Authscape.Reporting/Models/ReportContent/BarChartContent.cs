
namespace Authscape.Reporting.Models.ReportContent
{
    public class BarChartContent : BaseReportContent
    {
        public List<BarChartDataPoint> dataPoints { get; set; }
        public List<string> XAxis { get; set; }
    }

    public class BarChartDataPoint
    {
        public string Label { get; set; }
        public List<double> Data { get; set; }
    }
}
