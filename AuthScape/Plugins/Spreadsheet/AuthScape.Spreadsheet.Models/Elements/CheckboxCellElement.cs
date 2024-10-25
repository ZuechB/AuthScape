namespace AuthScape.Spreadsheet.Models.Elements
{
    public class CheckboxCellElement : CellElement
    {
        public CheckboxCellElement()
        {
            Type = "checkbox";
        }

        public bool Checked { get; set; }
        public string? CheckedText { get; set; }
        public string? UncheckedText { get; set; }
    }
}
