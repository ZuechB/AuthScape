namespace AuthScape.UserManagementSystem.Models
{
    public class UserCustomField
    {
        public long UserId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }

        public CustomField CustomField { get; set; }
    }
}