
namespace Models.Kanban
{
    public class KanbanCardCollaborator
    {
        public Guid Id { get; set; }

        public long FromRoleId { get; set; }
        public Guid FromColumnId { get; set; }

        public long ToRoleId { get; set; }
        public Guid ToColumnId { get; set; }
    }
}