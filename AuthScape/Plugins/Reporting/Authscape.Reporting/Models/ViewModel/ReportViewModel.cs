using Authscape.Models.Reporting;
using Authscape.Models.Reporting.Attributes;

namespace Authscape.Reporting.Models.ViewModel
{
    public class ReportViewModel
    {
        private IEnumerable<ReportParams> parameters = new List<ReportParams>();

        public string SideBarBackgroundColor { get; set; }

        public string ReportName { get; set; }
        public string ReportDescription { get; set; }
        public ReportType ContentType { get; set; }
        public Guid UniqueID { get; set; }
        public IEnumerable<ReportParams> Parameters
        {
            get
            {
                return parameters.OrderBy(p => p.OrderId);
            }
            set
            {
                this.parameters = value;
            }
        }
    }
}
