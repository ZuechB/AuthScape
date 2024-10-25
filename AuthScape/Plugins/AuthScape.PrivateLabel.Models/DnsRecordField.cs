namespace AuthScape.PrivateLabel.Models
{
    public class PrivateLabelSelectedFields
    {
        public Guid DnsRecordId { get; set; }
        public Guid PrivateLabelFieldId { get; set; }
        public string CSSValue { get; set; }
        
        public PrivateLabelField PrivateLabelField { get; set; }
        public DnsRecord DnsRecord { get; set; }
    }

    public class PrivateLabelField
    {
        public Guid Id { get; set; }
        public PrivateLabelFieldType FieldType { get; set; }
        public string Name { get; set; }
        public string CSSSelector { get; set; }
        public string CSSProperty { get; set; }

        public ICollection<PrivateLabelSelectedFields> PrivateLabelSelectedFields { get; set; }
    }

    public enum PrivateLabelFieldType
    {
        Color = 1,
        TextField = 2
    }
} 