using AuthScape.Models.Users;
using AuthScape.SendGrid.Models;
using Microsoft.Extensions.Options;
using SendGrid.Helpers.Mail;
using SendGrid;
using Services.Database;
using System.Text.RegularExpressions;
using System.Net;
using Services.Context;
using Newtonsoft.Json.Linq;
using SendGrid.Helpers.Mail.Model;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace AuthScape.SendGrid
{
    public class MailBaseService
    {
        readonly AppSettings appSettings;
        readonly DatabaseContext databaseContext;
        public MailBaseService(IOptions<AppSettings> appSettings, DatabaseContext databaseContext)
        {
            this.appSettings = appSettings.Value;
            this.databaseContext = databaseContext;
        }

        protected async Task<List<SendGridResponse>> SendMail(IEnumerable<AppUser> users, string templateId, Models.BaseEmail substitutions = null, string? subject = null, string fromEmail = null, string fromName = null, bool allowIfNotActive = false, List<EmailHeader> headers = null, bool enableTracking = false, bool sendIndividualEmail = false)
        {
            var responses = new List<SendGridResponse>();

            List<EmailAddress> addresses = null;
            if (!allowIfNotActive)
            {
                addresses = users.Where(u => u.IsActive).Select(u => new EmailAddress()
                {
                    Email = u.Email,
                    Name = u.FirstName
                }).ToList();
            }
            else
            {
                addresses = users.Select(u => new EmailAddress()
                {
                    Email = u.Email,
                    Name = u.FirstName
                }).ToList();
            }

            //var emails = new List<Email>();
            foreach (var to in addresses)
            {
                if (substitutions != null)
                {
                    if (String.IsNullOrWhiteSpace(substitutions.Email))
                    {
                        substitutions.Email = to.Email;
                    }

                    if (String.IsNullOrWhiteSpace(substitutions.FirstName))
                    {
                        substitutions.FirstName = to.Name;
                    }
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

                if (subject != null)
                {
                    email.Subject = subject;
                }

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

                if (sendIndividualEmail)
                {
                    responses.Add(await SendToSendGrid(email, enableTracking: enableTracking));
                }
                else
                {
                    responses.Add(await SendToSendGrid(email, enableTracking: enableTracking));
                    //emails.Add(email);
                }
            }

            //if (!sendIndividualEmail)
            //{
            //    emails
            //}

            return responses;
        }

        private async Task<SendGridResponse> SendToSendGrid(Models.Email email, List<EmailHeader> headers = null, bool enableTracking = false)
        {
            var client = new SendGridClient(email.ApiKey);

            var from = new EmailAddress(email.From.Email, email.From.Name);


            var msg = MailHelper.CreateSingleTemplateEmail(from,
                                                            email.To,
                                                            email.TemplateId,
                                                            email.Substitutions
                                                        );

            if (email.Subject != null)
            {
                msg.Subject = email.Subject;
            }
                
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    msg.AddHeader(header.Key, header.Value);
                }
            }

            // enable tracking
            if (enableTracking)
            {
                msg.TrackingSettings = new TrackingSettings()
                {
                    ClickTracking = new ClickTracking()
                    {
                        Enable = true,
                        EnableText = true,
                    },
                    OpenTracking = new OpenTracking()
                    {
                        Enable = true
                    },
                    SubscriptionTracking = new SubscriptionTracking()
                    {
                        Enable = true
                    }
                };
            }

            var response = await client.SendEmailAsync(msg);
            var message = await response.Body.ReadAsStringAsync();


            if (enableTracking)
            {
                if (response.Headers.TryGetValues("X-Message-Id", out var values))
                {
                    var sendGridMessageId = values.FirstOrDefault();
                    if (!String.IsNullOrWhiteSpace(sendGridMessageId))
                    {
                        if (!await databaseContext.AnalyticsMails.Where(a => a.TemplateId == email.TemplateId)
                            .AsNoTracking()
                            .AnyAsync())
                        {
                            var response2 = await client.RequestAsync(
                                method: SendGridClient.Method.GET,
                                urlPath: $"v3/templates/{email.TemplateId}"
                            );

                            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                            {
                                var responseBody = await response.Body.ReadAsStringAsync();
                                var templateDetails = JsonConvert.DeserializeObject<TemplateResponse>(responseBody);
                                //Console.WriteLine($"Template Name: {templateDetails.Name}");
                                //Console.WriteLine($"Template ID: {templateDetails.Id}");

                                var activeTemplate = templateDetails.Versions.Where(s => s.Active == 1).FirstOrDefault();

                                await databaseContext.AnalyticsMails.AddAsync(new Analytics.Models.AnalyticsMail()
                                {
                                    Subject = (email.Subject != null ? email.Subject : activeTemplate.Subject),
                                    Html = null,
                                    TemplateId = email.TemplateId,
                                    TemplateName = templateDetails.Name,
                                    MessageId = sendGridMessageId
                                });
                                await databaseContext.SaveChangesAsync();
                            }
                        }
                    }
                }
            }


            return new SendGridResponse()
            {
                StatusCode = response.StatusCode,
                Message = message
            };
        }



        protected async Task<SendGridResponse> SendRawHTMLEmail(IEnumerable<AppUser> users, string htmlContent, string? subject = null, bool enableTracking = false, List<AttachmentFile>? attachmentFiles = null)
        {
            var client = new SendGridClient(appSettings.SendGrid.APIKey);






            var from = new EmailAddress(appSettings.SendGrid.FromEmail, appSettings.SendGrid.FromName);

            if (subject == null)
            {
                subject = "";
            }

            var plainTextContent = StripHTML(htmlContent);

            string message = "";
            HttpStatusCode httpStatusCode = HttpStatusCode.NotFound;

            var emailAddresses = new List<EmailAddress>();
            foreach (var user in users)
            {
                emailAddresses.Add(new EmailAddress(user.UserName, user.FirstName));
            }




            var msg = new SendGridMessage();
            msg.From = from;
            msg.Subject = subject;
            msg.PlainTextContent = plainTextContent;
            msg.HtmlContent = htmlContent;
            
            
            var personalizations = new List<Personalization>();

            personalizations.Add(new Personalization()
            {
                Tos = emailAddresses
            });

            msg.Personalizations = personalizations;


            //var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, emailAddresses, subject, plainTextContent, htmlContent);

            if (enableTracking)
            {
                // enable click tracking
                msg.SetClickTracking(true, true);

                // enable open tracking
                msg.SetOpenTracking(true);
            }

            if (attachmentFiles != null)
            {
                foreach (var attachmentFile in attachmentFiles)
                {
                    await msg.AddAttachmentAsync(attachmentFile.FileName, attachmentFile.Stream);
                }
            }

            var response = await client.SendEmailAsync(msg);
            message = await response.Body.ReadAsStringAsync();

            httpStatusCode = response.StatusCode;

            //if (!response.IsSuccessStatusCode)
            //{
            //    break;
            //}

            if (enableTracking)
            {
                if (response.Headers.TryGetValues("X-Message-Id", out var values))
                {
                    await databaseContext.AnalyticsMails.AddAsync(new Analytics.Models.AnalyticsMail()
                    {
                        Subject = subject,
                        Html = htmlContent,
                        TemplateId = null,
                        TemplateName = "None",
                        MessageId = values.FirstOrDefault()
                    });
                    await databaseContext.SaveChangesAsync();
                }
            }
            
            
            return new SendGridResponse()
            {
                StatusCode = httpStatusCode,
                Message = message
            };
        }
        private string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }
    }

    public class EmailHeader
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
