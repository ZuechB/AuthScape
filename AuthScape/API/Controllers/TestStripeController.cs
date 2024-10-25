using AuthScape.StripePayment.Models;
using AuthScape.StripePayment.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestStripeController : ControllerBase
    {
        readonly IStripePayService stripePayService;
        readonly IStripeConnectService stripeConnectService;
        public TestStripeController(IStripePayService stripePayService, IStripeConnectService stripeConnectService)
        {
            this.stripePayService = stripePayService;
            this.stripeConnectService = stripeConnectService;
        }

        [HttpGet]
        public async Task<IActionResult> Connect(string email)
        {
            await stripeConnectService.CreateAccount(email);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice()
        {
            var customerId = await stripePayService.CreateCustomer("John Doe", "johndoe@gmail.com", "", 
                "3025 Carrington Mill Boulevard Suite 200", "Morrisville", "NC", "27560");

            var invoiceId = await stripePayService.CreateInvoice(customerId, true);

            await stripePayService.CreateItemForInvoice(customerId, invoiceId, "Name1", 10.95m, 2, TaxBehavior.exclusive);
            await stripePayService.CreateItemForInvoice(customerId, invoiceId, "Name2", 10.95m, 5, TaxBehavior.exclusive);

            return Ok(new
            {
                invoiceId = invoiceId,
                customerId = customerId
            });
        }

        [HttpPost]
        public async Task<IActionResult> PayInvoice(InvoicePayParamer param)
        {
            await stripePayService.PayInvoice(param.InvoiceId, param.PaymentMethodId);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteDraftInvoice(InvoiceParamer param)
        {
            await stripePayService.DeleteDraftInvoice(param.InvoiceId);
            return Ok();
        }
    }

    public class InvoicePayParamer
    {
        public string InvoiceId { get; set; }
        public string PaymentMethodId { get; set; }
    }

    public class InvoiceParamer
    {
        public string InvoiceId { get; set; }
    }
}
