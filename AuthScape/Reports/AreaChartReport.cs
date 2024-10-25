using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("927D99A4-71AD-4BEF-A12C-BFE8428D0ACB")]
    public class AreaChartReport : ReportEntity, IReport
    {
        public AreaChartReport() : base () { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<AreaChartDataPoint>();


                dataPoints.Add(new AreaChartDataPoint()
                {
                    Label = "Sales",
                    Data = new List<double>() { 1000, 400, 400, 200 }
                });

                dataPoints.Add(new AreaChartDataPoint()
                {
                    Label = "Expenses",
                    Data = new List<double>() { 1170, 460.25, 1000, 3000 }
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new AreaChartContent()
                    {
                        dataPoints = dataPoints,
                        XAxis = new List<string>() { "Year", "2013", "2014", "2015", "2018" }
                    },
                };
            });
        }
    }
}