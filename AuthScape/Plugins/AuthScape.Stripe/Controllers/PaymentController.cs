using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.StripePayment.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        readonly IStripePayService stripePayService;
        public PaymentController(IStripePayService stripePayService)
        {
            this.stripePayService = stripePayService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ConnectCustomer(PaymentRequest paymentRequest)
        {
            return Ok(await stripePayService.ConnectCustomer(paymentRequest));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Charge(ChargeParam param)
        {
            return Ok(await stripePayService.Charge(param));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChargeWithExistingPayment(ChargeWithExistingPaymentParam param)
        {
            await stripePayService.ChargeWithExistingPayment(param.InvoiceId, param.WalletId, param.Amount);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateACHPayment(decimal amount)
        {
            await stripePayService.CreateACHPaymentIntent(amount);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SyncPaymentMethod(PaymentMethodSyncParam param)
        {
            await stripePayService.SyncPaymentMethod(param.payment_intent, param.invoiceId);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetPaymentMethods()
        {
            var paymentMethods = await stripePayService.GetPaymentMethods();
            return Ok(paymentMethods);
        }
    }

    public class PaymentMethodSyncParam
    {
        public string payment_intent { get; set; }
        public long? invoiceId { get; set; }
    }

    public class ChargeWithExistingPaymentParam
    {
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
        public decimal Amount { get; set; }
    }
}
