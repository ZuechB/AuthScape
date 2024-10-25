using System.Collections.Generic;

namespace Authscape.Reporting.Models.ReportContent
{
    public class TableContent : BaseReportContent
    {
        public IEnumerable<object> Content { get; set; }
        public List<string> Columns { get; set; }
    }
}