namespace Authscape.Reporting.Models.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ColumnNameAttribute : Attribute
    {
        public string Name { get; set; }

        public ColumnNameAttribute(string Name)
        {
            this.Name = Name;
        }
    }
}
