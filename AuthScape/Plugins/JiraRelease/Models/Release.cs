namespace Jira.Controller.Models
{
    public class Release
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Markdown { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}