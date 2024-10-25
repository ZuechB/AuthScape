using AuthScape.UserManagementSystem.Models;

namespace AuthScape.UserManageSystem.Models
{
    public class CustomFieldParam
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public CustomFieldType FieldType { get; set; }
        public CustomFieldPlatformType CustomFieldPlatformType { get; set; } = CustomFieldPlatformType.Users;
        public bool IsRequired { get; set; }
        public int? GridSize { get; set; }
        public Guid TabSelection { get; set; }
    }
}