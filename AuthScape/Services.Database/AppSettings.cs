using AuthScape.Models;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.Plugins.Invoices.Models;
using Models.AppSettings;

namespace Services.Database
{
    public class AppSettings
    {
        public Stage Stage { get; set; }
        public string IDPUrl { get; set; }
        public DatabaseConnnectionStrings DatabaseConnnectionStrings { get; set; }
        public StripeAppSetting Stripe { get; set; }
        public SendGridAppSettings SendGrid { get; set; }
        public InvoiceAppSetting InvoiceAppSetting { get; set; }

        public string InviteSignupRedirectUrl { get; set; }
    }

    public class DatabaseConnnectionStrings
    {
        public string Development { get; set; }
        public string Staging { get; set; }
        public string Production { get; set; }
    }
}