namespace AuthScape.SendGrid.Models
{
    public class AllFieldsDefinitions
    {
        public List<AllFieldsDefinitionsCustomFields> custom_fields { get; set; }
        public List<AllFieldsDefinitionsReservedFields> reserved_fields { get; set; }
        public AllFieldsDefinitions_metadata _metadata { get; set; }
    }

    public class AllFieldsDefinitionsCustomFields
    {
        public string id { get; set; }
        public string name { get; set; }
        public string field_type { get; set; }
    }

    public class AllFieldsDefinitionsReservedFields
    {
        public string name { get; set; }
        public string field_type { get; set; }
        public bool read_only { get; set; }
    }

    public class AllFieldsDefinitions_metadata
    {
        public string prev { get; set; }
        public string self { get; set; }
        public string next { get; set; }
        public int count { get; set; }
    }
}
