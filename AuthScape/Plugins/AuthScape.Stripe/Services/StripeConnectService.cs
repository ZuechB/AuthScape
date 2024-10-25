using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;
using Stripe;

namespace AuthScape.StripePayment.Services
{
    public interface IStripeConnectService
    {
        Task CreateAccount(string email);
        Task DeleteAccount(string stripeAccountId);
        Task RejectAccount(string stripeAccountId);
    }

    public class StripeConnectService : IStripeConnectService
    {
        readonly DatabaseContext context;
        readonly AppSettings appSettings;
        public StripeConnectService(IOptions<AppSettings> appSettings, DatabaseContext context)
        {
            this.appSettings = appSettings.Value;
            this.context = context;

            if (this.appSettings.Stripe != null && this.appSettings.Stripe.SecretKey != null)
            {
                StripeConfiguration.ApiKey = this.appSettings.Stripe.SecretKey;
            }
        }

        public async Task CreateAccount(string email)
        {
            var options = new AccountCreateOptions
            {
                Type = "custom",
                Country = "US",
                Email = email,
                Capabilities = new AccountCapabilitiesOptions
                {
                    CardPayments = new AccountCapabilitiesCardPaymentsOptions
                    {
                        Requested = true,
                    },
                    Transfers = new AccountCapabilitiesTransfersOptions { Requested = true },
                },
            };
            var service = new AccountService();
            var created = await service.CreateAsync(options);
        }

        public async Task DeleteAccount(string stripeAccountId)
        {
            var service = new AccountService();
            await service.DeleteAsync(stripeAccountId);
        }

        public async Task RejectAccount(string stripeAccountId)
        {
            var options = new AccountRejectOptions { Reason = "fraud" };
            var service = new AccountService();
            await service.RejectAsync(stripeAccountId, options);
        }

    }
}
