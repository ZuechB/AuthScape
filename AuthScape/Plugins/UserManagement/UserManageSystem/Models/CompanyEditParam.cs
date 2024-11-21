namespace AuthScape.UserManageSystem.Models
{
    public class CompanyEditParam
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public bool IsDeactivated { get; set; }

        public List<CustomFieldResult> CustomFields { get; set; }
    }
}