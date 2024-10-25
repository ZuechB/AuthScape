namespace Models.Kanban
{
    public class KanbanAssignedTo
    {
        public long UserId { get; set; }
        public Guid KanbanCardId { get; set; }
        public KanbanCard KanbanCard { get; set; }
    }
}