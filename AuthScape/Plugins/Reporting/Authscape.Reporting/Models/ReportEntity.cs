using Authscape.Models.Reporting;
using Authscape.Models.Reporting.Attributes;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Authscape.Reporting.Models
{
    public class ReportEntity
    {
        public IEnumerable<object> Columns { get; set; }
        public Widget RawData { get; set; }
        public IEnumerable<object> Data { get; set; }
        public DbContext[] Databases { get; set; }


        public ReportType ReportType { get; set; }


        public Guid Id
        {
            get
            {
                return Guid.Parse(GetType().GetCustomAttribute<ReportNameAttribute>().ReportId);
            }
        }

        public virtual async Task<Widget> OnRequest(string payLoad)
        {
            throw new Exception("Report must override Main method to populate data.");
        }
    }
}
