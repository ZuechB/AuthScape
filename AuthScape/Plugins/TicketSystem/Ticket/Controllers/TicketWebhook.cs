using AuthScape.Models.Mail;
using AuthScape.TicketSystem.Services;
using Microsoft.AspNetCore.Mvc;
using StrongGrid;

namespace AuthScape.TicketSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketWebhookController : ControllerBase
    {
        readonly ITicketService ticketService;
        public TicketWebhookController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var parser = new WebhookParser();
            var inboundMail = await parser.ParseInboundEmailWebhookAsync(Request.Body);

            var headers = inboundMail.Headers;
            var from = inboundMail.From;
            var text = inboundMail.Text;
            var attachments = inboundMail.Attachments.Select(a => new Attachments()
            {
                ContentId = a.ContentId,
                ContentType = a.ContentType,
                Data = a.Data,
                FileName = a.FileName,
                Id = a.Id,
                Name = a.Name
            }).ToArray();

            var mail = inboundMail.To.Select(s => new EMailAddress()
            {
                Email = s.Email
            });

            await ticketService.InboundEmail(from.Email, mail.ToArray(), text, attachments);
            return Ok();
        }
    }
}