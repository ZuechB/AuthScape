namespace AuthScape.Document.Mapping.Models
{
    public class DocumentFilterForPreview
    {
        public long DocumentComponentId { get; set; }
        public string Rules { get; set; }
    }

    public class DocumentFilterForPreviewRule
    {
        public string? Id { get; set; }
        public string? Field { get; set; }
        public string? Operator { get; set; }
        public string? ValueSource { get; set; }
        public string? Value { get; set; }
        public List<DocumentFilterForPreviewRule> Rules { get; set; }
        public string? Combinator { get; set; }
        public bool? Not { get; set; }
    }






    //public class Rootobject
    //{
    //    public string id { get; set; }
    //    public Rule[] rules { get; set; }
    //    public string combinator { get; set; }
    //    public bool not { get; set; }
    //}

    //public class Rule
    //{
    //    public string id { get; set; }
    //    public string field { get; set; }
    //    public string _operator { get; set; }
    //    public string valueSource { get; set; }
    //    public string value { get; set; }
    //}

}
