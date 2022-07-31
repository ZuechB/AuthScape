using AuthScape.Models.Users;
using Microsoft.Extensions.Options;
using Models.Email;
using SendGrid;
using SendGrid.Helpers.Mail;
using AuthScape.SendGrid.Models;
using Services.Database;
using System.Net;

namespace AuthScape.SendGrid
{
    public interface ISendGridService
    {
        Task<List<AppUserResult>> Send(AppUser user, string templateId, BaseEmail substitutions = null, string fromEmail = null, string fromName = null);
        Task<List<AppUserResult>> Send(IEnumerable<AppUser> users, string templateId, BaseEmail substitutions = null, string fromEmail = null, string fromName = null);
    }

    public class SendGridService : ISendGridService
    {
        readonly AppSettings appSettings;

        public SendGridService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public async Task<List<AppUserResult>> Send(AppUser user, string templateId, BaseEmail substitutions = null, string fromEmail = null, string fromName = null)
        {
            return await Send(new List<AppUser>() { user }, templateId, substitutions, fromEmail, fromName);
        }

        public async Task<List<AppUserResult>> Send(IEnumerable<AppUser> users, string templateId, BaseEmail substitutions = null, string fromEmail = null, string fromName = null)
        {
            var addresses = users.Select(u => new EmailAddress()
            {
                Email = u.Email,
                Name = u.FirstName
            }).ToList();

            var emailAddresses = new List<AppUserResult>();
            foreach (var to in addresses)
            {
                if (String.IsNullOrWhiteSpace(substitutions.email))
                {
                    substitutions.email = to.Email;
                }

                if (String.IsNullOrWhiteSpace(substitutions.firstname))
                {
                    substitutions.firstname = to.Name;
                }

                var email = new Email(appSettings.SendGrid.APIKey)
                {
                    From = new From
                    {
                        Name = appSettings.SendGrid.FromName
                    },
                    Substitutions = substitutions,
                    To = to,
                    HtmlContent = " ",
                    TemplateId = templateId
                };

                if (String.IsNullOrWhiteSpace(fromEmail))
                {
                    email.From.Email = appSettings.SendGrid.FromEmail;
                }
                else
                {
                    email.From.Email = fromEmail;
                }

                if (String.IsNullOrWhiteSpace(fromName))
                {
                    email.From.Name = appSettings.SendGrid.FromName;
                }
                else
                {
                    email.From.Name = fromName;
                }

                var statusCode = await SendToSendGrid(email);

                emailAddresses.Add(new AppUserResult()
                {
                    Email = to.Email,
                    StatusCode = statusCode
                });
            }

            return emailAddresses;
        }

        private async Task<HttpStatusCode> SendToSendGrid(Email email)
        {
            var client = new SendGridClient(email.ApiKey);

            var from = new EmailAddress(email.From.Email, email.From.Name);
            var msg = MailHelper.CreateSingleTemplateEmail(from,
                                                          email.To,
                                                          email.TemplateId,
                                                          email.Substitutions
                                                        );

            var response = await client.SendEmailAsync(msg);

            return response.StatusCode;
        }
    }
}