namespace AuthScape.Spreadsheet.Models.Elements
{
    public class HeaderCellElement : CellElement
    {
        public HeaderCellElement()
        {
            Type = "header";
        }
        public string Text { get; set; }
    }
}
