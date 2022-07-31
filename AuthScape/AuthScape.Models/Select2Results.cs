namespace AuthScape.Models
{
    public class Select2Results
    {
        public List<Select2Result> results { get; set; }
        public Pagination pagination { get; set; }
    }

    public class Pagination
    {
        public bool more { get; set; }
    }

    public class Select2Result
    {
        public long id { get; set; }
        public string text { get; set; }
    }
}