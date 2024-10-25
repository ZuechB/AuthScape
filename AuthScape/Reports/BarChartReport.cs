using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("B73F4028-E3EC-4AF9-B9C7-FC809240CC20")]
    public class BarChartReport : ReportEntity, IReport
    {
        public BarChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<BarChartDataPoint>();


                dataPoints.Add(new BarChartDataPoint()
                {
                    Label = "Sales",
                    Data = new List<double>() { 1000, 400, 400, 200 }
                });

                dataPoints.Add(new BarChartDataPoint()
                {
                    Label = "Expenses",
                    Data = new List<double>() { 1170, 460.25, 1000, 3000 }
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new BarChartContent()
                    {
                        dataPoints = dataPoints,
                        XAxis = new List<string>() { "Year", "2013", "2014", "2015", "2018" }
                    },
                };
            });
        }
    }
}
