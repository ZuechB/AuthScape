namespace AuthScape.SendGrid.Models
{
    public class UpdateContactParam
    {
        public List<string> list_ids { get; set; }
        public List<SendGridUser> contacts { get; set; }
    }

    public class SendGridUser
    {
        public string email { get; set; }
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? address_line_1 { get; set; }
        public string? address_line_2 { get; set; }
        public string? city { get; set; }
        public string? state_province_region { get; set; }
        public string? postal_code { get; set; }
        public object? custom_fields { get; set; }
    }
}