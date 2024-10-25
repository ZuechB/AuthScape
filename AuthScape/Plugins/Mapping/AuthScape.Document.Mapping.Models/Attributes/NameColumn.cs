namespace AuthScape.Document.Mapping.Models.Attributes
{
    public class NameColumnAttribute : System.Attribute
    {
        public string _NewName { get; set; }

        public NameColumnAttribute(string NewName)
        {
            _NewName = NewName;
        }
    }
}