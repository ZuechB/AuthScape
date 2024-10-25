namespace AuthScape.PrivateLabel.Models
{
    public class DnsRecord
    {
        public Guid Id { get; set; }
        public long? CompanyId { get; set; }
        public string? Domain { get; set; }

        public string AppIconUrl { get; set; }
        public string AppIcon16Url { get; set; }
        public string AppIcon32Url { get; set; }
        public string? FontUrl { get; set; }

        public DateTime? DomainValidated { get; set; }
        public DateTime? WebAppCreated { get; set; }
        public DateTime? SSLCreated { get; set; }
        public DateTime? SSLConnectedToDomain { get; set; }

        // design fields
        public string? PrettyCSS { get; set; }
        public string? PrettyHTML { get; set; }
        public string? MinifiedHTML { get; set; }
        public string? HeaderCode { get; set; }
        public string? FontFamily { get; set; }
        public string? FavIcon { get; set; }

        public string? MinifiedCSSFile { get; set; }

        public string? DNSErrorMessage { get; set; }

        public long? DemoCompanyId { get; set; }


        public ICollection<PrivateLabelSelectedFields> PrivateLabelSelectedFields { get; set; }
    }
}