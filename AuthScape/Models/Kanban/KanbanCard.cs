
namespace Models.Kanban
{
    public class KanbanCard
    {
        public Guid Id { get; set; }
        public long? Identifier { get; set; }
        public string UserCount { get; set; }

        public Guid KanbanColumnId { get; set; }
        public long? CompanyId { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public ICollection<KanbanAssignedTo> KanbanAssignedTos { get; set; }
        public KanbanColumn KanbanColumn { get; set; }
    }
}
