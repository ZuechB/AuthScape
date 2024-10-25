namespace AuthScape.UserManageSystem.Models
{
    public class CompanyDataGrid
    {
        public long Id { get; set; }
        public string? Logo { get; set; }
        public string Title { get; set; }
        public int NumberOfLocations { get; set; }
        public int NumberOfUsers { get; set; }
    }
}