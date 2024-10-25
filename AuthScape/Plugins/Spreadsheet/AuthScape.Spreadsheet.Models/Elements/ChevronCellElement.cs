namespace AuthScape.Spreadsheet.Models.Elements
{
    public class ChevronCellElement : CellElement
    {
        public ChevronCellElement()
        {
            Type = "chevron";
        }

        public string Text { get; set; } = "";
        public bool? IsExpanded { get; set; }
        public bool? HasChildren { get; set; }
        public string? ParentId { get; set; }
        public int? Indent { get; set; }
    }
}
