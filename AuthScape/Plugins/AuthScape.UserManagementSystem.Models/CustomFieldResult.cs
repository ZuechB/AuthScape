using AuthScape.UserManagementSystem.Models;

namespace AuthScape.UserManageSystem.Models
{
    public class CustomFieldResult
    {
        public Guid CustomFieldId { get; set; }
        public string Name { get; set; }
        public bool IsRequired { get; set; }
        public int? Size { get; set; }
        public CustomFieldType CustomFieldType { get; set; }
        public Guid? TabId { get; set; }
        public string? Value { get; set; }
    }
}