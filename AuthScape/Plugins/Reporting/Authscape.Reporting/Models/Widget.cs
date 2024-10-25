using Authscape.Reporting.Models.ReportContent;

namespace Authscape.Reporting.Models
{
    public class Widget
    {
        public Widget(string Name = "")
        {
            this.Name = Name;
            //this.WidgetType = WidgetType;
        }

        //public WidgetType WidgetType { get; set; }
        //public int Row { get; set; }
        //public int Column { get; set; }
        public string Name { get; set; }
        //public IEnumerable<object> Content { get; set; }
        public BaseReportContent Content { get; set; }
    }

    //public enum WidgetType
    //{
    //    Table,
    //    AreaChart,
    //    BarChart,
    //    BubbleChart,
    //    CalendarChart,
    //    CandlestickChart
    //}
}
