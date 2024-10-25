using Authscape.Models.Reporting;
using Authscape.Reporting.Models.Timeline;
using Microsoft.EntityFrameworkCore;

namespace Authscape.Reporting.Models
{
    public interface IReport
    {
        Guid Id { get; }
        Widget RawData { get; set; }
        IEnumerable<object> Columns { get; set; }
        IEnumerable<object> Data { get; set; }
        Task<Widget> OnRequest(string payLoad);


        ReportType ReportType { get; set; }


        public DbContext[] Databases { get; set; }
    }
}
