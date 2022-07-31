namespace AuthScape.Models.Companies
{
    public class CompanyParam
    {
        public int offset { get; set; } = 1;
        public int length { get; set; } = 10;
        public string companyName { get; set; } = "";
    }
}
