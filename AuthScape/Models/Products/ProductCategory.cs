namespace Models.Products
{
    public class ProductCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; }
    }
}
