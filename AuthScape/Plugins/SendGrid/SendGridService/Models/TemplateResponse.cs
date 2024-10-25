using Newtonsoft.Json;

public class TemplateResponse
{
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("generation")]
    public string Generation { get; set; }

    [JsonProperty("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [JsonProperty("versions")]
    public List<Version> Versions { get; set; }
}

public class Version
{
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("template_id")]
    public string TemplateId { get; set; }

    [JsonProperty("active")]
    public int Active { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [JsonProperty("html_content")]
    public string HtmlContent { get; set; }

    [JsonProperty("plain_content")]
    public string PlainContent { get; set; }

    [JsonProperty("subject")]
    public string Subject { get; set; }
}