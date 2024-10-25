using AuthScape.Models.Users;
using Microsoft.Extensions.Options;
using AuthScape.SendGrid.Models;
using Services.Database;
using Newtonsoft.Json;
using SendGrid;
using AuthScape.Models.Exceptions;
using System.Text.RegularExpressions;
using System.Net.Http.Headers;
using StrongGrid;
using Microsoft.AspNetCore.Http;
using Services.Context;
using AuthScape.Analytics.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AuthScape.SendGrid
{
    public interface ISendGridService
    {
        Task<List<SendGridResponse>> Send(AppUser user, string templateId, BaseEmail substitutions, string? subject = null, string fromEmail = null, string fromName = null, bool allowIfNotActive = false, List<EmailHeader> headers = null, bool enableTracking = false);
        Task<List<SendGridResponse>> Send(List<AppUser> users, string templateId, BaseEmail substitutions, string? subject = null, string fromEmail = null, string fromName = null, bool allowIfNotActive = false, List<EmailHeader> headers = null, bool enableTracking = false);

        Task AddMultipleRecipientsToList(UpdateContactParam updateContactParam);
        Task<AllFieldsDefinitions> GetAllDefinedCustomFieldsAndReservedFields();
        Task<SendGridResponse> SendHtmlEmail(AppUser user, string? subject = null, string htmlContent = "", bool enableTracking = false, List<AttachmentFile>? attachmentFiles = null);
        Task<string?> GetContactIdByEmailAsync(string email);
        Task RemoveContactAsync(string contactId);
        Task<List<IncomingAnalyticsResponse>> IncomingAnalytics();
        Task<SendGridResponse> SendHtmlEmail(List<AppUser> users, string? subject = null, string htmlContent = "", bool enableTracking = false, List<AttachmentFile>? attachmentFiles = null);
    }

    public class SendGridService : MailBaseService, ISendGridService
    {
        readonly AppSettings appSettings;
        readonly IHttpContextAccessor httpContextAccessor;
        readonly DatabaseContext databaseContext;

        public SendGridService(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContextAccessor, DatabaseContext databaseContext) : base(appSettings, databaseContext)
        {
            this.appSettings = appSettings.Value;
            this.httpContextAccessor = httpContextAccessor;
            this.databaseContext = databaseContext;
        }

        public async Task<List<SendGridResponse>> Send(AppUser user, string templateId, BaseEmail substitutions, string? subject = null, string fromEmail = null, string fromName = null, bool allowIfNotActive = false, List<EmailHeader> headers = null, bool enableTracking = false)
        {
            return await SendMail(new List<AppUser>() { user }, templateId, substitutions, subject: subject, fromEmail: fromEmail, fromName: fromName, allowIfNotActive: allowIfNotActive, headers, enableTracking);
        }

        public async Task<List<SendGridResponse>> Send(List<AppUser> users, string templateId, BaseEmail substitutions, string? subject = null, string fromEmail = null, string fromName = null, bool allowIfNotActive = false, List<EmailHeader> headers = null, bool enableTracking = false)
        {
            return await SendMail(users, templateId, substitutions, subject: subject, fromEmail: fromEmail, fromName: fromName, allowIfNotActive: allowIfNotActive, headers, enableTracking);
        }

        public async Task AddMultipleRecipientsToList(UpdateContactParam updateContactParam)
        {
            string apiKey = appSettings.SendGrid.APIKey;
            var client = new SendGridClient(apiKey);

            var response = await client.RequestAsync(
                method: SendGridClient.Method.PUT,
                urlPath: "marketing/contacts",
                requestBody: JsonConvert.SerializeObject(updateContactParam)
            );

            if (!response.IsSuccessStatusCode)
            {
                var data = await response.Body.ReadAsStringAsync();
                throw new BadRequestException(data);
            }
        }

        public async Task<AllFieldsDefinitions> GetAllDefinedCustomFieldsAndReservedFields()
        {
            var client = new SendGridClient(appSettings.SendGrid.APIKey);

            var response = await client.RequestAsync(
                method: SendGridClient.Method.GET,
                urlPath: "marketing/field_definitions"
            );

            if (response.IsSuccessStatusCode)
            {
                return await response.Body.ReadAsAsync<AllFieldsDefinitions>();
            }
            else
            {
                var badRequest = await response.Body.ReadAsStringAsync();
                throw new BadRequestException(badRequest);
            }
        }

        public async Task<SendGridResponse> SendHtmlEmail(AppUser user, string? subject = null, string htmlContent = "", bool enableTracking = false, List<AttachmentFile>? attachmentFiles = null)
        {
            return await SendRawHTMLEmail(new List<AppUser>() { user }, htmlContent, subject, enableTracking, attachmentFiles);
        }

        public async Task<SendGridResponse> SendHtmlEmail(List<AppUser> users, string? subject = null, string htmlContent = "", bool enableTracking = false, List<AttachmentFile>? attachmentFiles = null)
        {
            return await SendRawHTMLEmail(users, htmlContent, subject, enableTracking, attachmentFiles);
        }

        private string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }

        public async Task<string?> GetContactIdByEmailAsync(string email)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", appSettings.SendGrid.APIKey);
                var url = $"https://api.sendgrid.com/v3/marketing/contacts/search";
                var jsonContent = new StringContent($"{{\"query\": \"email = '{email}'\"}}", System.Text.Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, jsonContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsAsync<SearchContactsResponse>();
                    if (content != null && content.Result != null)
                    {
                        var firstResult = content.Result.FirstOrDefault();
                        if (firstResult != null)
                        {
                            return firstResult.Id;
                        }
                    }
                    return null;
                }
                else
                {
                    Console.WriteLine($"Failed to retrieve contact. Status code: {response.StatusCode}");
                    return null;
                }
            }
        }

        public async Task RemoveContactAsync(string contactId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", appSettings.SendGrid.APIKey);
                var url = $"https://api.sendgrid.com/v3/marketing/contacts?ids={contactId}";

                var response = await client.DeleteAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Contact removed successfully.");
                }
                else
                {
                    Console.WriteLine($"Failed to remove contact. Status code: {response.StatusCode}");
                }
            }
        }

        public async Task IncomingWebHook()
        {
            var parser = new WebhookParser();
            var inboundMail = await parser.ParseInboundEmailWebhookAsync(httpContextAccessor.HttpContext.Request.Body);
        }

        public async Task<List<IncomingAnalyticsResponse>> IncomingAnalytics()
        {
            var responses = new List<IncomingAnalyticsResponse>();

            var parser = new WebhookParser();
            var mailEvents = await parser.ParseEventsWebhookAsync(httpContextAccessor.HttpContext.Request.Body);

            var databaseContextType = typeof(DatabaseContext);
            var databaseTables = databaseContextType.GetProperties();

            // check to see if this exists in our database, in case we forgot to install the module
            var foundTheTable = databaseTables.Where(d => d.PropertyType.GenericTypeArguments.Where(g => g == typeof(AnalyticsMailTracking)).Any()).FirstOrDefault();
            if (foundTheTable != null)
            {
                foreach (var mailEvent in mailEvents)
                {
                    var mail = await databaseContext.AnalyticsMails.Where(a => mailEvent.InternalMessageId.Contains(a.MessageId))
                        .AsNoTracking()
                        .FirstOrDefaultAsync();

                    long? userId = null;

                    var foundMatchingUser = await databaseContext.Users
                        .Where(u => u.UserName.ToLower() == mailEvent.Email.ToLower())
                        .FirstOrDefaultAsync();

                    if (foundMatchingUser != null)
                    {
                        userId = foundMatchingUser.Id;
                    }

                    var newMailTracker = new AnalyticsMailTracking()
                    {
                        EventType = (MailEventType)mailEvent.EventType,
                        Email = mailEvent.Email,
                        MessageId = mailEvent.MessageId,
                        ExternalUserId = mailEvent.UserId,
                        InternalEventId = mailEvent.InternalEventId,
                        InternalMessageId = mailEvent.InternalMessageId,
                        MarketingCampaignId = mailEvent.MarketingCampaignId,
                        MarketingCampaignName = mailEvent.MarketingCampaignName,
                        MarketingCampaignSplitId = mailEvent.MarketingCampaignSplitId,
                        MarketingCampaignVersion = mailEvent.MarketingCampaignVersion,
                        Timestamp = mailEvent.Timestamp,
                        Arguments = JsonConvert.SerializeObject(mailEvent.UniqueArguments),
                        UserId = userId,
                        AnalyticsMailId = mail.Id
                    };

                    // this is what we will return back
                    responses.Add(new IncomingAnalyticsResponse()
                    {
                        AppUser = foundMatchingUser,
                        Email = mailEvent.Email,
                        Html = mail.Html,
                        Subject = mail.Subject,
                        MailEvent = (MailEventType)mailEvent.EventType,
                        TimeSpan = mailEvent.Timestamp
                    });

                    await databaseContext.AddAsync(newMailTracker);
                }

                await databaseContext.SaveChangesAsync();
            }
            else
            {
                throw new BadRequestException("Missing the Analytics Module.");
            }

            return responses;
        }
    }
}