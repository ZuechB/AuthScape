using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;
using Stripe;

namespace AuthScape.StripePayment.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StripeWebHooksController : ControllerBase
    {
        readonly AppSettings appSettings;
        readonly DatabaseContext context;
        public StripeWebHooksController(DatabaseContext context, IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Stripe()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    appSettings.Stripe.SigningSecret
                );
                //Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");
            }
            catch (Exception e)
            {
                //Console.WriteLine($"Something failed {e}");
                return BadRequest(e.Message);
            }

            if (stripeEvent.Type == "invoice.paid") // paid subscription
            {
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate
                // limits.
                var paymentIntent = stripeEvent.Data.Object as Stripe.Invoice;

                var client = new StripeClient(
                    appSettings.Stripe.SecretKey,
                    httpClient: new SystemNetHttpClient());

                var subscriptionService = new SubscriptionService(client);
                var subscription = await subscriptionService.GetAsync(paymentIntent.SubscriptionId);
            }

            if (stripeEvent.Type == "invoice.payment_failed") // payment fialed
            {
                // If the payment fails or the customer does not have a valid payment method,
                // an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.

                //var paymentIntent = stripeEvent.Data.Object as Stripe.Invoice;

                //var client = new StripeClient(
                //    appSettings.Stripe.secretKey,
                //    httpClient: new SystemNetHttpClient());

                //var subscriptionService = new SubscriptionService(client);
                //var subscription = await subscriptionService.GetAsync(paymentIntent.SubscriptionId);

            }

            if (stripeEvent.Type == "customer.subscription.deleted") // unsubscribe
            {
                // handle subscription cancelled automatically based
                // upon your subscription settings. Or if the user cancels it.

                var paymentIntent = stripeEvent.Data.Object as Stripe.Subscription;

                var client = new StripeClient(
                    appSettings.Stripe.SecretKey,
                    httpClient: new SystemNetHttpClient());

                var subscriptionService = new SubscriptionService(client);
                var subscription = await subscriptionService.GetAsync(paymentIntent.Id);
            }

            if (stripeEvent.Type == "account.updated")
            {
                var accountIntent = stripeEvent.Data.Object as Stripe.Account;

                var stripeConnectAccount = await context.StripeConnectAccounts
                    .Where(s => s.StripeConnectAccountId == accountIntent.Id)
                    .FirstOrDefaultAsync();

                if (stripeConnectAccount != null)
                {

                    stripeConnectAccount.BusinessName = accountIntent.BusinessProfile.Name;
                    stripeConnectAccount.SupportPhone = accountIntent.BusinessProfile.SupportPhone;
                    stripeConnectAccount.Url = accountIntent.BusinessProfile.Url;
                    stripeConnectAccount.SupportAddress = accountIntent.BusinessProfile.SupportAddress.Line1;
                    stripeConnectAccount.SupportCity = accountIntent.BusinessProfile.SupportAddress.City;
                    stripeConnectAccount.SupportState = accountIntent.BusinessProfile.SupportAddress.State;
                    stripeConnectAccount.SupportZipCode = accountIntent.BusinessProfile.SupportAddress.PostalCode;

                    await context.SaveChangesAsync();
                }
            }

            return Ok();
        }
    }
}
