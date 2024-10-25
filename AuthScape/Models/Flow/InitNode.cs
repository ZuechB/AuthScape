using AuthScape.Flows.Models.Attributes;

namespace Models.Flow
{
    public class InitNode
    {
        [InputNodeAttribute(Type = NodeType.Text)]
        public string? DownloadPath { get; set; } // D:\\xfer\\Assets
        [InputNodeAttribute(Type = NodeType.Options)]
        public BrowserType? BrowserType { get; set; }
        [InputNodeAttribute(Type = NodeType.Text)]
        public string? Url { get; set; }
    }

    public enum BrowserType
    {
        Chrome = 1,
        Firefox = 2
    }
}
