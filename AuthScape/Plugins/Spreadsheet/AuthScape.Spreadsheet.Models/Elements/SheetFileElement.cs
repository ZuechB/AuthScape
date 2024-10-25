using AuthScape.Spreadsheet.Models.FileUploader;

namespace AuthScape.Spreadsheet.Models.Elements
{
    public class SheetFileElement : CellElement
    {
        public SheetFileElement()
        {
            Type = "file";
        }

        public List<SheetFile> urls { get; set; }
    }
}
