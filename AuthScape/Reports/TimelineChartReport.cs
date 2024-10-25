using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("D419A0DD-B291-49DC-8B03-29FD389635D3")]
    public class TimelineChartReport : ReportEntity, IReport
    {
        public TimelineChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<TimelineDataPoint>();

                dataPoints.Add(new TimelineDataPoint()
                {
                    Label = "Sales",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddMonths(4),
                });

                dataPoints.Add(new TimelineDataPoint()
                {
                    Label = "Expenses",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddMonths(2)
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new TimelineChartContent()
                    {
                        DataPoints = dataPoints
                    },
                };
            });
        }
    }
}
