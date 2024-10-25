using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.Services;
using AuthScape.StripePayment.Models;
using AuthScape.StripePayment.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using System;
using System.Threading.Tasks;

namespace AuthScape.StripePayment.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        readonly IStripePayService stripePayService;
        readonly IUserManagementService userManagementService;
        public PaymentController(IStripePayService stripePayService, IUserManagementService userManagementService)
        {
            this.stripePayService = stripePayService;
            this.userManagementService = userManagementService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ConnectCustomer(PaymentRequest paymentRequest)
        {
            return Ok(await stripePayService.ConnectCustomer(await userManagementService.GetSignedInUser(), paymentRequest));
        }

        [HttpPost]
        public async Task<IActionResult> ConnectCustomerNoAuth(PaymentRequest paymentRequest)
        {
            return Ok(await stripePayService.ConnectCustomer(null, paymentRequest));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SetupStripeConnect(string returnBaseUrl)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            return Ok(await stripePayService.SetupStripeConnect(signedInUser, returnBaseUrl));
        }

        [HttpPost]
        public async Task<IActionResult> GeneratePaymentLink(PaymentLinkParam param)
        {
            return Ok(await stripePayService.GeneratePaymentLink(param));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Charge(ChargeParam param)
        {
            return Ok(await stripePayService.Charge(await userManagementService.GetSignedInUser(), param));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChargeWithExistingPayment(ChargeWithExistingPaymentParam param)
        {
            await stripePayService.ChargeWithExistingPayment(await userManagementService.GetSignedInUser(), param.InvoiceId, param.WalletPaymentMethodId, param.Amount);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetPaymentMethods(PaymentMethodType paymentMethodType)
        {
            var paymentMethods = await stripePayService.GetPaymentMethods(await userManagementService.GetSignedInUser(), paymentMethodType);
            return Ok(paymentMethods);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CheckIfACHNeedValidation()
        {
            return Ok(await stripePayService.ACHNeedValidation(await userManagementService.GetSignedInUser()));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddPaymentMethod(SavePaymentMethod savePaymentMethod)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            return Ok(await stripePayService.AddPaymentMethod(signedInUser, savePaymentMethod.PaymentMethodType, savePaymentMethod.WalletId, savePaymentMethod.StripePaymentMethod));
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> RemovePaymentMethod(Guid Id)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            await stripePayService.RemovePaymentMethod(signedInUser, Id);

            return Ok();
        }
    }

    public class PaidInvoiceParam
    {
        public long InvoiceId { get; set; }
        public string PaymentIntent { get; set; }
    }

    public class SavePaymentMethod
    {
        public Guid WalletId { get; set; }
        public PaymentMethodType PaymentMethodType { get; set; }
        public string StripePaymentMethod { get; set; }
    }

    public class PaymentMethodSyncParam
    {
        public string payment_intent { get; set; }
        public long? invoiceId { get; set; }
    }

    public class ChargeWithExistingPaymentParam
    {
        public long InvoiceId { get; set; }
        public Guid WalletPaymentMethodId { get; set; }
        public decimal Amount { get; set; }
    }

    public class PaymentMethodAttachParam
    {
        public string CustomerId { get; set; }
        public string PaymentMethodId { get; set; }
    }
}
