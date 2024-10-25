namespace AuthScape.Spreadsheet.Models
{
    public class CellElement
    {
        public string ColumnId { get; set; }
        public string Type { get; protected set; }
        public int RowId { get; set; }
        public bool IsRequired { get; set; }
        public bool ReadOnly { get; set; }
    }
}
