using AuthScape.Models.Webhooks;
using Microsoft.AspNetCore.Mvc;
using Services;
using StrongGrid;
using StrongGrid.Models;

namespace AuthScape.TicketSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SendGridWebHookController : ControllerBase
    {
        readonly IMailService mailService;

        public SendGridWebHookController(IMailService mailService)
        {
            this.mailService = mailService;
        }

        [HttpPost]
        public async Task<IActionResult> ReceivedEmail()
        {
            var parser = new WebhookParser();
            var inboundMail = await parser.ParseInboundEmailWebhookAsync(Request.Body);

            var headers = inboundMail.Headers;
            var from = inboundMail.From;
            var text = inboundMail.Text;


            var newReq = inboundMail.To.Where(t => t.Email == "new@mydomain.com").FirstOrDefault(); // TODO: make this dynamic somehow
            if (newReq != null)
            {
                var signatureIndex = text.IndexOf("--");
                if (signatureIndex != -1)
                {
                    text = text.Remove(signatureIndex);
                    text = text.Replace("\r", "");
                    text = text.Replace("\n", "");
                }

                // check for google reply message
                var indexReply = text.IndexOf("\r\nOn");
                if (indexReply != -1)
                {
                    text = text.Remove(indexReply);
                }

                // send to the developer to do their logic
                await mailService.InboundWebhook(new Models.Webhooks.SendGridWebhookContent()
                {
                    ToEmail = inboundMail.To.Select(t => new SendGridEmailToEmail() { Email = t.Email, Name = t.Name }).ToArray(),
                    Attachments = inboundMail.Attachments.Select(t => new SendGridEmailAttachment() 
                    {  
                        Id = t.Id,
                        ContentId = t.ContentId,
                        ContentType = t.ContentType,
                        Data = t.Data,
                        FileName = t.FileName,
                        Name = t.Name
                    }).ToArray(),
                    FromEmail = from.Email,
                    InboundType = InboundType.NewEmail,
                    Message = text
                });

                return Ok();
            }

            var reqId = ParseReqEmail(inboundMail.To);
            if (reqId != null)
            {
                var signatureIndex = text.IndexOf("--");
                if (signatureIndex != -1)
                {
                    text = text.Remove(signatureIndex);
                    text = text.Replace("\r", "");
                    text = text.Replace("\n", "");
                }

                // check for google reply message
                var indexReply = text.IndexOf("\r\nOn");
                if (indexReply != -1)
                {
                    text = text.Remove(indexReply);
                }

                // send to the developer to do their logic
                await mailService.InboundWebhook(new Models.Webhooks.SendGridWebhookContent()
                {
                    ToEmail = inboundMail.To.Select(t => new SendGridEmailToEmail() { Email = t.Email, Name = t.Name }).ToArray(),
                    Attachments = inboundMail.Attachments.Select(t => new SendGridEmailAttachment()
                    {
                        Id = t.Id,
                        ContentId = t.ContentId,
                        ContentType = t.ContentType,
                        Data = t.Data,
                        FileName = t.FileName,
                        Name = t.Name
                    }).ToArray(),
                    FromEmail = from.Email,
                    InboundType = InboundType.ReplyEmail,
                    Message = text
                });

                return Ok();
            }

            return BadRequest();
        }


        private long? ParseReqEmail(MailAddress[] To)
        {
            // find the email we are working with
            string email = null;
            foreach (var toEmail in To)
            {
                if (toEmail.Email.Contains("req-"))
                {
                    email = toEmail.Email;
                    break;
                }
            }

            if (email == null)
            {
                return null;
            }

            // parse the email we are working with
            var req = email.IndexOf("req-");
            if (req == -1)
            {
                return null;
            }

            email = email.Remove(req, 4);

            var atSign = email.IndexOf("@");
            if (atSign == -1)
            {
                return null;
            }

            email = email.Remove(atSign);

            if (!String.IsNullOrWhiteSpace(email))
            {
                return Convert.ToInt64(email);
            }
            else
            {
                return null;
            }
        }
    }
}