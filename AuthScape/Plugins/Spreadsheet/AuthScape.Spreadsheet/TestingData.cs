using AuthScape.Spreadsheet.Models.Images;

namespace AuthScape.Spreadsheet
{
    public class TestingData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Qty { get; set; }
        public decimal Price { get; set; }
        public ProductType ProductType { get; set; }
        public bool HasCompleted { get; set; }
        public SheetPhoto Photo { get; set; }
        public List<SheetPhoto> Photos { get; set; }
        public DateTime WhenToRelease { get; set; }
        public string Remove { get; set; }
    }






    public enum ProductType
    {
        Chairs = 1,
        Tables = 2,
        Fridge = 3,
        HVAC = 4,
        TV = 5
    }
}