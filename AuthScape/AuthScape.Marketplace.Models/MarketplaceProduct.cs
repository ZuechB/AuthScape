namespace AuthScape.Marketplace.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductCategoryField> ProductCategoryFields { get; set; }
    }

    public class ProductCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductField> ProductFields { get; set; }
    }

    public class ProductField
    {
        public Guid Id { get; set; }
        public Guid ProductCategoryId { get; set; }
        public string Name { get; set; }

        public ProductCategory ProductCategory { get; set; }
        public ICollection<ProductCategoryField> ProductCategoryFields { get; set; }
    }

    public class ProductCategoryField
    {
        public Guid Id { get; set; }
        public Guid ProductFieldId { get; set; }
        public Guid ProductId { get; set; }

        public Product Product { get; set; }
        public ProductField ProductField { get; set; }
    }
}
