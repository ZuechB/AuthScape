namespace Authscape.IdentityServer.Models
{
    public class IdentityCreateApplication
    {
        public string ClientID { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; } = "confidential";
        public string? ClientSecret { get; set; }
    }
}