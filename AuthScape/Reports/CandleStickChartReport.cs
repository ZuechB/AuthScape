using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("94D281D1-2E5E-4CB8-8F9C-D956044DF3FD")]
    public class CandleStickChartReport : ReportEntity, IReport
    {
        public CandleStickChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<CandleStickChartDataPoint>();


                dataPoints.Add(new CandleStickChartDataPoint()
                {
                    Label = "Mon",
                    Data = new List<double>() { 5, 10, 15, 20 }
                });

                dataPoints.Add(new CandleStickChartDataPoint()
                {
                    Label = "Tues",
                    Data = new List<double>() { 12, 15, 12, 20 }
                });

                dataPoints.Add(new CandleStickChartDataPoint()
                {
                    Label = "Wed",
                    Data = new List<double>() { 12, 15, 12, 20 }
                });

                dataPoints.Add(new CandleStickChartDataPoint()
                {
                    Label = "Thur",
                    Data = new List<double>() { 12, 15, 12, 20 }
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new BarCandleStickContent()
                    {
                        dataPoints = dataPoints,
                        XAxis = new List<string>() { "Year", "2013", "2014", "2015", "2018" }
                    },
                };
            });
        }
    }
}
