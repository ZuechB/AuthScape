using AuthScape.Spreadsheet.Models.Images;

namespace AuthScape.Spreadsheet.Models.Elements
{
    public class ImageCellElement : CellElement
    {
        public ImageCellElement()
        {
            Type = "image";
        }

        public List<SheetPhoto> urls { get; set; }
    }
}
