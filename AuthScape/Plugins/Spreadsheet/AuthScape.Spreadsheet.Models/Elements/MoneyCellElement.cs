namespace AuthScape.Spreadsheet.Models.Elements
{
    public class MoneyCellElement : CellElement
    {
        public MoneyCellElement()
        {
            Type = "money";
        }

        public decimal? Value { get; set; }
        public bool? NanToZero { get; set; }
        public bool? HideZero { get; set; }
    }
}
