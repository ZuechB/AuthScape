using System;

namespace AuthScape.Models.Pages
{
    public class Page
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public PageType PageType { get; set; }
        public string Slug { get; set; }
        public string MetaDescription { get; set; }
        public string Content { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
    }

    public enum PageType
    {
        VisualEditor = 1,
        HtmlEditor = 2
    }
}