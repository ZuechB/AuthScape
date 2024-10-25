namespace AuthScape.Spreadsheet.Models.Elements
{
    public class ButtonCellElement : CellElement
    {
        public ButtonCellElement()
        {
            Type = "button";
        }

        public string Text { get; set; }
    }
}
