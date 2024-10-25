
namespace Authscape.Reporting.Models.ReportContent
{
    public class BarCandleStickContent : BaseReportContent
    {
        public List<CandleStickChartDataPoint> dataPoints { get; set; }
        public List<string> XAxis { get; set; }
    }

    public class CandleStickChartDataPoint
    {
        public string Label { get; set; }
        public List<double> Data { get; set; }
    }
}
