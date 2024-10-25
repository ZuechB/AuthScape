using System.ComponentModel.DataAnnotations;

namespace AuthScape.Models.Authentication
{
    public class ThirdPartyAuthentication
    {
        [Key]
        public ThirdPartyAuthenticationType ThirdPartyAuthenticationType { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }

    public enum ThirdPartyAuthenticationType
    {
        Facebook = 1,
        Microsoft = 2,
        Google = 3,
        Apple = 4,
        Github = 5,
        Discord = 6,
        Spotify = 7,
        Amazon = 8,
        Slack = 9,
        Custom = 10,
        HubSpot = 11,
        Fitbit = 12,
        Coinbase = 13,
        BattleNet = 14,
        Basecamp = 15,
        Autodesk = 16,
        Asana = 17,
        AdobeIO = 18,
        Dropbox = 19,
        LinkedIn = 20,
        Notion = 21,
        Patreon = 22,
        Paypal = 23,
        WordPress = 24,
        Yammer = 25,
        Yahoo = 26,
        MailChimp = 27,
        Twitch = 28,
    }
}