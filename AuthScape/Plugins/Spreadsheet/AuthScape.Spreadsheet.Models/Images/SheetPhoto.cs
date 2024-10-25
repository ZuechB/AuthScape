namespace AuthScape.Spreadsheet.Models.Images
{
    public class SheetPhoto
    {
        public SheetPhoto(string id, string url)
        {
            Id = id;
            Url = url;
        }

        public string Id { get; set; }
        public string Url { get; set; }
    }
}
