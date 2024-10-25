namespace AuthScape.Spreadsheet.Models
{
    public class SpreadSheetData
    {
        public List<SpreadSheetCellType> HeaderCell { get; set; }
        public List<SpreadSheetColumn> columns { get; set; }
        public List<SpreadSheetRow> Rows { get; set; }

        public int totalCount { get; set; }
    }

    public class SpreadSheetRow
    {
        public int RowId { get; set; }
        public List<object> Cells { get; set; }
        public int? Height { get; set; }
        public bool? Reorderable { get; set; }
    }

    public class SpreadSheetCellType
    {
        public string type { get; set; }
        public string text { get; set; }
        public bool isHidden { get; set; }
    }

    public class SpreadSheetColumn
    {
        public string columnId { get; set; }
        public int width { get; set; }
        public bool resizable { get; set; }
        public bool reorderable { get; set; }
        public bool isHidden { get; set; }
    }
}
