namespace AuthScape.Models.Pages
{
    public class PageSummary
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public PageType PageType { get; set; }
        public string Slug { get; set; }
        public string Created { get; set; }
        public string LastUpdated { get; set; }

        public string Content { get; set; }
    }
}