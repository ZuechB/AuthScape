
namespace Authscape.Reporting.Models.ReportContent
{
    public class WordTreeChartContent : BaseReportContent
    {
        public List<BarChartDataPoint> dataPoints { get; set; }
        public List<string> XAxis { get; set; }
    }

    public class WordTreeChartDataPoint
    {
        public string Label { get; set; }
        public List<double> Data { get; set; }
    }
}
