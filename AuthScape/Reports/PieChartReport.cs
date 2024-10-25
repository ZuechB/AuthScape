using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("2437D1D1-DB96-477D-989A-39B4B27275FE")]
    public class PieChartReport : ReportEntity, IReport
    {
        public PieChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<PieChartDataPoint>();

                dataPoints.Add(new PieChartDataPoint()
                {
                    Name = "Sales",
                    Number = 24
                });

                dataPoints.Add(new PieChartDataPoint()
                {
                    Name = "Expenses",
                    Number = 12
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new PieChartContent()
                    {
                        DataPoints = dataPoints
                    },
                };
            });
        }
    }
}
