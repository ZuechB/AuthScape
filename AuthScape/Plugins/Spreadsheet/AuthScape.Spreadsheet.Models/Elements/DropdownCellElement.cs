namespace AuthScape.Spreadsheet.Models.Elements
{
    public class DropdownCellElement : CellElement
    {
        public DropdownCellElement()
        {
            Type = "dropdown";
        }

        public string? SelectedValue { get; set; }
        public List<OptionType> Values { get; set; }
        public bool? IsDisabled { get; set; }
        public bool? IsOpen { get; set; }
        public string? InputValue { get; set; }
    }

    public class OptionType
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }
}
