using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("973D18A2-FF6F-4826-8F62-852C005E7644")]
    public class GaugeChartReport : ReportEntity, IReport
    {
        public GaugeChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<GaugeDataPoint>();


                dataPoints.Add(new GaugeDataPoint()
                {
                    Label = "Sales",
                    value = 24
                });

                dataPoints.Add(new GaugeDataPoint()
                {
                    Label = "Expenses",
                    value = 12
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new GaugeChartContent()
                    {
                        DataPoints = dataPoints
                    },
                };
            });
        }
    }
}
