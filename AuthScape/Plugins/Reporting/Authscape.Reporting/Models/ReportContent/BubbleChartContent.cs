using System.Collections.Generic;

namespace Authscape.Reporting.Models.ReportContent
{
    public class BubbleChartContent : BaseReportContent
    {
        public BubbleHeader Header { get; set; }
        public List<BubbleDataPoint> dataPoints { get; set; }


        public string Name { get; set; }
        public string HorizontalText { get; set; }
        public string VerticalText { get; set; }


        public string Title { get; set; }
    }

    public class BubbleHeader
    {
        public string X { get; set; }
        public string Y { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
    }

    public class BubbleDataPoint
    {
        public string Id { get; set; }
        public decimal X { get; set; }
        public decimal Y { get; set; }
        public string Name { get; set; } 
        public decimal Size { get; set; }
    }
}