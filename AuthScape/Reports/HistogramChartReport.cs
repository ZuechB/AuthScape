using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;

namespace Reports
{
    [ReportName("E6DACE5B-0CA2-4C30-9D36-CC1964E408E0")]
    public class HistogramChartReport : ReportEntity, IReport
    {
        public HistogramChartReport() : base() { }

        public override async Task<Widget> OnRequest(string payLoad)
        {
            return await Task.Run(() =>
            {
                var dataPoints = new List<HistogramsDataPoint>();

                dataPoints.Add(new HistogramsDataPoint()
                {
                    Name = "Acrocanthosaurus",
                    Number = 12.2m
                });

                dataPoints.Add(new HistogramsDataPoint()
                {
                    Name = "Albertosaurus",
                    Number = 9.1m
                });

                dataPoints.Add(new HistogramsDataPoint()
                {
                    Name = "Allosaurus",
                    Number = 12.2m
                });


                return new Widget("Sample Area Chart")
                {
                    Content = new HistogramsContent()
                    {
                        NameText = "Dinosaur",
                        NumberText = "Length",
                        DataPoints = dataPoints
                    },
                };
            });
        }
    }
}
