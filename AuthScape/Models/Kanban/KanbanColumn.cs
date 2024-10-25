
namespace Models.Kanban
{
    public class KanbanColumn
    {
        public Guid Id { get; set; }


        public string Name { get; set; }
        public string Slug { get; set; }
        public int Index { get; set; }
        public long? CompanyId { get; set; }

        public long? RoleId { get; set; } // only for this role


        /// <summary>
        ///  FK Relationship
        /// </summary>
        public ICollection<KanbanCard> Cards { get; set; }
    }
}