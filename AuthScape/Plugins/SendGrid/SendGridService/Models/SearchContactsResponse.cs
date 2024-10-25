using Newtonsoft.Json;

namespace AuthScape.SendGrid.Models
{
    public class SearchContactsResponse
    {
        [JsonProperty("result")]
        public List<Contact> Result { get; set; }

        [JsonProperty("_metadata")]
        public Metadata Metadata { get; set; }
    }

    public class Contact
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        // Add other properties as needed
    }

    public class Metadata
    {
        [JsonProperty("contact_count")]
        public int ContactCount { get; set; }
    }
}