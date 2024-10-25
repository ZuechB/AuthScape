namespace AuthScape.Spreadsheet.Models.Elements
{
    public class DateCellElement : CellElement
    {
        public DateCellElement()
        {
            Type = "dateElement";
        }

        public DateTime? Date { get; set; }
        public string? Format { get; set; }
    }
}
