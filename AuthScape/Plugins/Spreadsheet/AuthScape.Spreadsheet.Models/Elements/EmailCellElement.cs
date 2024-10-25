namespace AuthScape.Spreadsheet.Models.Elements
{
    public class EmailCellElement : CellElement
    {
        public EmailCellElement()
        {
            Type = "email";
        }

        public string Text { get; set; }
    }
}
