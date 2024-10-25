namespace AuthScape.Spreadsheet.Models.Elements
{
    public class TextCellElement : CellElement
    {
        public TextCellElement()
        {
            Type = "text";
        }

        public string Text { get; set; } = "";
        public string? Placeholder { get; set; }
    }
}
