namespace AuthScape.Spreadsheet.Models.Elements
{
    public class NumberCellElement : CellElement
    {
        public NumberCellElement()
        {
            Type = "number";
        }

        public decimal? Value { get; set; }
        public bool? NanToZero { get; set; }
        public bool? HideZero { get; set; }
        public string? CurrencyFormat { get; set; } // 'USD' as example
    }
}