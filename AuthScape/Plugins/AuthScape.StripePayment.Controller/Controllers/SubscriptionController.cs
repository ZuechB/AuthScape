using AuthScape.Services;
using CoreBackpack.cMath;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OpenIddict.Validation.AspNetCore;
using Services.Context;
using Services.Database;
using Stripe;

namespace AuthScape.StripePayment.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class SubscriptionController : ControllerBase
    {
        readonly DatabaseContext context;
        readonly AppSettings appSettings;
        readonly IUserManagementService userManagementService;

        public SubscriptionController(IOptions<AppSettings> appSettings, DatabaseContext context, IUserManagementService userManagementService)
        {
            this.appSettings = appSettings.Value;
            this.context = context;
            this.userManagementService = userManagementService;

            if (this.appSettings.Stripe != null && this.appSettings.Stripe.SecretKey != null)
            {
                StripeConfiguration.ApiKey = this.appSettings.Stripe.SecretKey;
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateSubscription(CreateSubscriptionRequest req)
        {
            // Automatically save the payment method to the subscription
            // when the first payment is successful.
            //var paymentSettings = new SubscriptionPaymentSettingsOptions
            //{
            //    SaveDefaultPaymentMethod = "on_subscription",
            //};

            var signedInUser = await userManagementService.GetSignedInUser();
            var company = await context.Companies.Where(c => c.Id == signedInUser.CompanyId).AsNoTracking().FirstOrDefaultAsync();


            var wallet = await context.Wallets.Where(c => c.CompanyId == company.Id).AsNoTracking().FirstOrDefaultAsync();
            var walletPaymentMethod = await context.WalletPaymentMethods.Where(w => w.Id == Guid.Parse(req.PaymentMethodId)).AsNoTracking().FirstOrDefaultAsync();


            var productService = new ProductService();
            var productCreateOptions = new ProductCreateOptions
            {
                Name = "Your Product Name", // Set your product name
                Description = "Your Product Description", // Set your product description (optional)
                                                          // You can set other options like 'Active' as needed
            };
            var product = productService.Create(productCreateOptions);

            // Create the subscription. Note we're expanding the Subscription's
            // latest invoice and that invoice's payment_intent
            // so we can pass it to the front end to confirm the payment
            var subscriptionOptions = new SubscriptionCreateOptions
            {
                DefaultPaymentMethod = walletPaymentMethod.PaymentMethodId,
                Customer = wallet.PaymentCustomerId,
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions
                    {
                        Quantity = 1,
                        PriceData = new SubscriptionItemPriceDataOptions()
                        {
                            Product = product.Id,
                            Recurring = new SubscriptionItemPriceDataRecurringOptions()
                            {
                                Interval = "month",
                                IntervalCount = 1,
                            },
                            Currency = "usd",
                            UnitAmount = MoneyExtender.ConvertToCents(20.00m),
                        }

                        //Price = req.PriceId,
                    },
                },
                //PaymentSettings = paymentSettings,
                PaymentBehavior = "default_incomplete",
                
                
                TrialPeriodDays = 12,
                TrialSettings = new SubscriptionTrialSettingsOptions
                {
                    EndBehavior = new SubscriptionTrialSettingsEndBehaviorOptions
                    {
                        MissingPaymentMethod = "cancel", // or you can pause MissingPaymentMethod = "pause"
                    },
                },
            };


            subscriptionOptions.AddExpand("latest_invoice.payment_intent");
            var subscriptionService = new SubscriptionService();
            try
            {
                Subscription subscription = subscriptionService.Create(subscriptionOptions);

                return Ok(new SubscriptionCreateResponse
                {
                    SubscriptionId = subscription.Id,
                });
            }
            catch (StripeException e)
            {
                Console.WriteLine($"Failed to create subscription.{e}");
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult<IActionResult> CancelSubscription([FromBody] CancelSubscriptionRequest req)
        {
            var service = new SubscriptionService();
            var subscription = service.Cancel(req.SubscriptionId, null);
            return Ok(subscription);
        }

        [HttpPost]
        public async Task<IActionResult> UpgradeOrDowngradeSubscription()
        {
            var options = new SubscriptionUpdateOptions
            {
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions
                    {
                        Id = "{{SUB_ITEM_ID}}",
                        Price = "{{NEW_PRICE_ID}}",
                    },
                },
            };
            var service = new SubscriptionService();
            service.Update("sub_xxxxxxxxx", options);


            return Ok();
        }




    }

    public class CancelSubscriptionRequest
    {
        public string SubscriptionId { get; set; }
    }

    public class CreateSubscriptionRequest
    {
        public string? PriceId { get; set; }
        public string? PaymentMethodId { get; set; }
    }

    public class SubscriptionCreateResponse
    {
        public string SubscriptionId { get; set; }
        public string ClientSecret { get; set; }
    }
}
