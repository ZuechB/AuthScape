
namespace Models.Kanban
{
    public class KanbanColumnQuery
    {
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public List<KanbanCard> Cards { get; set; }
    }
}
