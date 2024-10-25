using Authscape.Models.Reporting;

namespace Authscape.Reporting.Models.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class ReportViewAttribute : Attribute
    {
        public ReportType Option { get; set; }

        public ReportViewAttribute(ReportType option)
        {
            Option = option;
        }
    }
}
