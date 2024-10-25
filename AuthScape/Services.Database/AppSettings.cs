using AuthScape.Models;
using AuthScape.Models.PaymentGateway.Stripe;
using Models.AppSettings;

namespace Services.Database
{
    public class AppSettings
    {
        public string Name { get; set; } // company or product name
        public Stage Stage { get; set; }
        public string IDPUrl { get; set; }
        public string DatabaseContext { get; set; }
        public StripeAppSetting Stripe { get; set; }
        public SendGridAppSettings SendGrid { get; set; }
        //public InvoiceAppSetting InvoiceAppSetting { get; set; }
        public Storage Storage { get; set; }

        public Mapping Mapping { get; set; }

        public string WebsiteRedirectUrl { get; set; }
        public string InviteSignupRedirectUrl { get; set; }
        public string LoginRedirectUrl { get; set; }
        public bool EnableCompanyMode { get; set; }
        public TicketSystem Ticketing { get; set; }
        public PrivateLabelSettings PrivateLabel { get; set; }
        public DocumentProcessing DocumentProcessing { get; set; }
        public int? DataProtectionTokenProviderOptions_TokenLifespanByDays { get; set; } // default 1 day
        public OpenAI OpenAI { get; set; }
        public ReportingSettings Reporting { get; set; }
        public LuceneSearch LuceneSearch { get; set; }
        public Spreadsheet Spreadsheet { get; set; }
    }

    public class OpenAI
    {
        public string APIKey { get; set; }
	}

    public class Mapping
    {
        public string AzureConnectionString { get; set; }
        public string BaseUri { get; set; }
        public string Container { get; set; }
    }

    public class LuceneSearch
    {
        public string StorageConnectionString { get; set; }
        public string Container { get; set; }
    }

    public class Storage
    {
        public string AzureConnectionString { get; set; }
        public string BaseUri { get; set; }
        public string UserProfileContainer { get; set; }
	}

	public class DocumentProcessing
    {
        public string BaseURL { get; set; }
        public string StorageContainer { get; set; }
        public string AzureFormRecognizerEndpoint { get; set; }
        public string AzureFormRecognizerKey { get; set; }
    }

    public class TicketSystem
    {
        public string TemplateId { get; set; }
        public string Domain { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
    }

    public class PrivateLabelSettings
	{
        public string GoogleFontsAPIKey { get; set; }
        public string AppIconContainer { get; set; }



        public string AppServicePlanName { get; set; }
        public string WebAppName { get; set; }
        public string ResourceGroupName { get; set; }
        public string SubscriptionId { get; set; }
        public string OpenIdApplicationId { get; set; }

        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string TenantId { get; set; }
    }

    public class ReportingSettings
    {
        public string ProjectName { get; set; }
    }

    public class FormRecognizerSettings
    {
        public string Key { get; set; }
        public string Endpoint { get; set; }
    }

    public class Spreadsheet
    {
        public string AzureVisionKey { get; set; }
        public string AzureVisionEndpoint { get; set; }
    }
}