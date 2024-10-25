namespace Authscape.Models.Reporting.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ReportNameAttribute : System.Attribute
    {
        public string ReportId { get; set; }

        public ReportNameAttribute(string reportId)
        {
            ReportId = reportId;
        }
    }
}
