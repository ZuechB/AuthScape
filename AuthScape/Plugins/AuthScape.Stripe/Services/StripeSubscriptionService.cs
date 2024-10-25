using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.StripePayment.Services
{
    public interface IStripeSubscriptionService
    {

    }

    public class StripeSubscriptionService : IStripeSubscriptionService
    {
        readonly DatabaseContext context;
        readonly AppSettings appSettings;
        public StripeSubscriptionService(IOptions<AppSettings> appSettings, DatabaseContext context)
        {
            this.appSettings = appSettings.Value;
            this.context = context;

            if (this.appSettings.Stripe != null && this.appSettings.Stripe.SecretKey != null)
            {
                StripeConfiguration.ApiKey = this.appSettings.Stripe.SecretKey;
            }
        }

        public async Task CreateSubscription()
        {
            var options = new SubscriptionCreateOptions
            {
                Customer = "cus_Na6dX7aXxi11N4",
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions { Price = "price_1MowQULkdIwHu7ixraBm864M" },
                },
            };
            var service = new SubscriptionService();
            await service.CreateAsync(options);
        }

        public async Task GetSubscription()
        {
            var service = new SubscriptionService();
            service.Get("sub_1MowQVLkdIwHu7ixeRlqHVzs");
        }

        public async Task ListSubscriptions()
        {
            var options = new SubscriptionListOptions { Limit = 3 };
            var service = new SubscriptionService();
            StripeList<Subscription> subscriptions = service.List(options);
        }

        public async Task CancelSubscription()
        {
            var service = new SubscriptionService();
            service.Cancel("sub_1MlPf9LkdIwHu7ixB6VIYRyX");
        }

        public async Task ResumeSubscription()
        {
            var options = new SubscriptionResumeOptions
            {
                BillingCycleAnchor = SubscriptionBillingCycleAnchor.Now,
            };
            var service = new SubscriptionService();
            service.Resume("sub_1MoGGtLkdIwHu7ixk5CfdiqC", options);
        }



    }
}
