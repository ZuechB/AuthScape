namespace Authscape.Models.Reporting.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class ReportParams : Attribute
    {
        private object value;

        public string Name { get; set; }
        public ReportInputType InputType { get; set; }
        public object DefaultValue { get; set; }

        public List<OptionObject> Option { get; set; }
        public int OrderId { get; set; }
        public object Value
        {
            get
            {
                if (value == null)
                    return DefaultValue;
                else
                    return value;
            }
            set { this.value = value; }
        }

        public ReportParams(string Name, ReportInputType InputType)
        {
            this.Name = Name;
            this.InputType = InputType;
        }

        public ReportParams(string name)
        {
            Name = name;
        }

        public string Id
        {
            get { return Name.Replace(" ", ""); }
        }

        public enum ListOptions
        {
            ALL = -1
        }
    }

    public struct OptionObject
    {
        public string Name { get; set; }
        public List<KeyValuePair<string, string>> Options { get; set; }
    }

    public enum ReportInputType
    {
        TextBox = 0, // returns string
        DateRange = 1, // returns Start DateTime and End DateTime
        CustomOption = 2, // return string value
        Checkbox = 3, // return bool
    }
}
