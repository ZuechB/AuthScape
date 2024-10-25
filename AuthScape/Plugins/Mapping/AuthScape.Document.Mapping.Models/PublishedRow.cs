namespace AuthScape.Document.Mapping.Models
{
    public class PublishedRow
    {
        public int RowId { get; set; }
        public Cell[] Cells { get; set; }
    }

    public class Cell
    {
        public string Text { get; set; }
        public string ColumnId { get; set; }
        public string Type { get; set; }
    }
}