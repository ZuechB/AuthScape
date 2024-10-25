namespace AuthScape.Spreadsheet.Models.FileUploader
{
    public class SheetFile
    {
        public SheetFile(string id, string url)
        {
            Id = id;
            Url = url;
        }

        public string Id { get; set; }
        public string Url { get; set; }
    }
}
