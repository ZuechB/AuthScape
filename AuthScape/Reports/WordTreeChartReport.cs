using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("E832DC1A-0A81-476B-982A-155900AE9F71")]
    public class WordTreeChartReport : ReportEntity, IReport
    {
        public WordTreeChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                //var dataPoints = new List<WordTreeChartDataPoint>();

                //dataPoints.Add(new WordTreeChartDataPoint()
                //{
                //    Label = "Sales",
                //    StartDate = DateTime.Now,
                //    EndDate = DateTime.Now.AddMonths(4),
                //});

                //dataPoints.Add(new WordTreeChartDataPoint()
                //{
                //    Label = "Expenses",
                //    StartDate = DateTime.Now,
                //    EndDate = DateTime.Now.AddMonths(2)
                //});


                return new Widget("Sample Area Chart")
                {
                    Content = new WordTreeChartContent()
                    {
                        //DataPoints = dataPoints
                    },
                };
            });
        }
    }
}
