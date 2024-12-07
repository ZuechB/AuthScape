namespace AuthScape.Marketplace.Models
{
    public class CategoryResponse
    {
        public string name { get; set; }
        public bool expanded { get; set; }
        public IEnumerable<CategoryResponseFilter> filters { get; set; }
    }

    public class CategoryResponseFilter
    {
        public string name { get; set; }
        public int available { get; set; }
    }
}
