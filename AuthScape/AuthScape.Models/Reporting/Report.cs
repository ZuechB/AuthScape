using System.ComponentModel.DataAnnotations;

namespace AuthScape.Models.Reporting
{
    public class Report
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Type ReportType { get; set; }
        public bool IsFavorite { get; set; }
        public string? Folder { get; set; }
        public string? Icon { get; set; }
        public string? Code { get; set; }
    }
}