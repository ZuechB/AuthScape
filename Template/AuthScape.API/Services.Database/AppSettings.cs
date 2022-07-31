using AuthScape.Models;
using AuthScape.Models.PaymentGateway.Stripe;

namespace Services.Database
{
    public class AppSettings
    {
        public Stage Stage { get; set; }
        public string IDPUrl { get; set; }
        public DatabaseConnnectionStrings DatabaseConnnectionStrings { get; set; }
        public StripeAppSetting Stripe { get; set; }
    }

    public class DatabaseConnnectionStrings
    {
        public string Development { get; set; }
        public string Staging { get; set; }
        public string Production { get; set; }
    }
}