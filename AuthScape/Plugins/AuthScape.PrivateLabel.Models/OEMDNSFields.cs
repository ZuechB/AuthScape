namespace AuthScape.PrivateLabel.Models
{
    public class PrivateLabelDNSFields
    {
        public Guid Id { get; set; }
        public Guid FieldId { get; set; }
        public string Name { get; set; }
        public string Selector { get; set; }
        public string Property { get; set; }
        public string? Value { get; set; }
    }
}