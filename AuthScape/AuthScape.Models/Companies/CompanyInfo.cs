namespace AuthScape.Models.Companies
{
    public class CompanyInfo
    {
        public long CompanyId { get; set; }
        public CompanyFieldType CompanyFieldType { get; set; }
        public string? FieldValue { get; set; }
    }
}