namespace AuthScape.UserManagementSystem.Models
{
    public class CompanyCustomField
    {
        public long CompanyId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }

        public CustomField CustomField { get; set; }
    }
}