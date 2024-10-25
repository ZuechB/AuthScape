namespace AuthScape.Spreadsheet.Models.Elements
{
    public class RichTextCellElement : CellElement
    {
        public RichTextCellElement()
        {
            Type = "richtext";
        }

        public bool HasText
        {
            get
            {
                return !String.IsNullOrWhiteSpace(Text);
            }
        }
        public string Text { get; set; }
    }
}
