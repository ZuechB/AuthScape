namespace AuthScape.Spreadsheet.Models.Elements
{
    public class TimeCellElement : CellElement
    {
        public TimeCellElement()
        {
            Type = "time";
        }

        public DateTime? Time { get; set; }
    }
}
