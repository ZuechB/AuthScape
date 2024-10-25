namespace AuthScape.Kanban.Models
{
    public class AssignedCardToColumn
    {
        public Guid ColumnId { get; set; }
        public Guid CardId { get; set; }
        public int OrderId { get; set; }



        public long? CompanyId { get; set; }
    }
}
