using AuthScape.Models.Exceptions;
using AuthScape.Models.PaymentGateway;
using CoreBackpack.cMath;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services;
using Services.Context;
using Services.Database;
using Stripe;
using AuthScape.Models.PaymentGateway.Stripe;
using CoreBackpack.Time;
using AuthScape.StripePayment.Models;
using AuthScape.Plugins.Invoices.Models;

namespace AuthScape.StripePayment.Services
{
    public interface IStripePayService
    {
        Task<string> ConnectCustomer(PaymentRequest paymentRequest);
        Task<AuthScape.Models.PaymentGateway.Stripe.ChargeResponse> Charge(ChargeParam param);
        Task CreateACHPaymentIntent(decimal amount);
        Task SyncPaymentMethod(string payment_intent, long? invoiceId = null);
        Task CancelPayment(string paymentIntent);
        Task<List<Wallet>> GetPaymentMethods();
        Task ChargeWithExistingPayment(long InvoiceId, long WalletId, decimal Amount);
    }

    public class StripePayService : IStripePayService
    {
        readonly DatabaseContext context;
        readonly AppSettings appSettings;
        readonly IUserManagementService userService;

        public StripePayService(IOptions<AppSettings> appSettings, IUserManagementService userService, DatabaseContext context)
        {
            this.appSettings = appSettings.Value;
            this.userService = userService;
            this.context = context;

            StripeConfiguration.ApiKey = this.appSettings.Stripe.SecretKey;
        }

        public async Task SyncPaymentMethod(string payment_intent, long? invoiceId = null)
        {
            var signedInUser = await userService.GetSignedInUser();

            var company = await context.Companies.Where(c => c.Id == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (company == null)
            {
                throw new BadRequestException("Company not found");
            }

            var options = new PaymentMethodListOptions
            {
                Type = "card",
                Customer = company.PaymentGatewayCustomerId,
            };
            var service = new PaymentMethodService();
            StripeList<PaymentMethod> paymentMethods = service.List(options);


            var options2 = new PaymentMethodListOptions
            {
                Type = "us_bank_account",
                Customer = company.PaymentGatewayCustomerId,
            };
            var service2 = new PaymentMethodService();
            StripeList<PaymentMethod> paymentMethods2 = service2.List(options2);


            foreach (var paymentMethod in paymentMethods)
            {
                if (!await context.Wallets.Where(p => p.PaymentGatewayId == paymentMethod.Id).AnyAsync())
                {
                    context.Wallets.Add(new Wallet()
                    {
                        CompanyId = signedInUser.CompanyId,
                        UserId = signedInUser.Id,
                        ExpMonth = paymentMethod.Card.ExpMonth,
                        ExpYear = paymentMethod.Card.ExpYear,
                        FingerPrint = paymentMethod.Card.Fingerprint,
                        Last4 = paymentMethod.Card.Last4,
                        Funding = paymentMethod.Card.Funding,
                        WalletType = paymentMethod.Type == "card" ? WalletType.Card : WalletType.ACH,
                        Archived = null,
                        PaymentGatewayId = paymentMethod.Id,
                        Brand = paymentMethod.Card.Networks.Available.FirstOrDefault()
                    });
                }
            }

            await context.SaveChangesAsync();


            // Invoice logic here...
            if (invoiceId != null)
            {
                // update the invoice
                var invoice = await context.Invoices.Where(i => i.Id == invoiceId.Value).FirstOrDefaultAsync();
                if (invoice != null)
                {
                    invoice.InvoiceState = InvoiceState.Paid;
                    invoice.BalanceDue = 0m;
                    invoice.AmountPaid = invoice.Total;
                }

                // update the items
                var items = await context.InvoiceLineItems.Where(i => i.InvoiceId == invoiceId).ToListAsync();
                foreach (var item in items)
                {
                    item.PaidDateTime = SystemTime.Now;
                    item.PaidBy = signedInUser.Id;
                }

                // get the payment intent
                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = await paymentIntentService.GetAsync(payment_intent);

                // get the walletId
                var wallet = await context.Wallets.Where(w => w.CompanyId == signedInUser.CompanyId && w.PaymentGatewayId == paymentIntent.PaymentMethodId).FirstOrDefaultAsync();
                if (wallet != null)
                {
                    // add the invoice payment
                    context.InvoicePayments.Add(new InvoicePayment()
                    {
                        InvoiceId = invoiceId.Value,
                        WalletId = wallet.Id,
                        Amount = paymentIntent.Amount.ConvertToDollars()
                    });
                }

                try
                {
                    await context.SaveChangesAsync();
                }
                catch (Exception exp)
                {

                }
            }
        }

        public async Task ChargeWithExistingPayment(long invoiceId, long walletId, decimal amount)
        {
            var signedInUser = await userService.GetSignedInUser();

            var wallet = await context.Wallets.Where(w => w.CompanyId == signedInUser.CompanyId && w.Id == walletId).FirstOrDefaultAsync();
            if (wallet == null)
            {
                throw new BadRequestException("Please provide a payment method");
            }

            var company = await context.Companies.Where(z => z.Id == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (company == null)
            {
                throw new BadRequestException("Company does not exist");
            }

            // TODO: Charge the walletId for the invoice

        }

        public async Task<AuthScape.Models.PaymentGateway.Stripe.ChargeResponse> Charge(ChargeParam param)
        {
            var signedInUser = await userService.GetSignedInUser();

            var wallet = await context.Wallets.Where(w => w.CompanyId == signedInUser.CompanyId && w.Id == param.walletId).FirstOrDefaultAsync();
            if (wallet == null)
            {
                throw new BadRequestException("Please provide a payment method");
            }

            var company = await context.Companies.Where(z => z.Id == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (company == null)
            {
                throw new BadRequestException("Company does not exist");
            }

            var service = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = param.chargeAmount.ConvertToCents(),
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }, // still need to add in ACH
                Customer = company.PaymentGatewayCustomerId,
                PaymentMethod = wallet.PaymentGatewayId,
                Confirm = true,
                OffSession = true
            };
            var paymentIntent = await service.CreateAsync(options);
            if (paymentIntent != null)
            {
                if (paymentIntent.Status == "succeeded")
                {
                    return new AuthScape.Models.PaymentGateway.Stripe.ChargeResponse()
                    {
                        Success = true
                    };
                }
                else
                {
                    return new AuthScape.Models.PaymentGateway.Stripe.ChargeResponse()
                    {
                        Success = false,
                        Reason = paymentIntent.Status
                    };
                }
            }

            return null;
        }

        public async Task CancelPayment(string paymentIntent)
        {
            var service = new PaymentIntentService();
            await service.CancelAsync(paymentIntent); //Example: service.Cancel("pi_3LMF1oIzHVecDm4C21zJCX09");
        }

        public async Task<string> ConnectCustomer(PaymentRequest paymentRequest)
        {
            var currentUser = await userService.GetSignedInUser();
            if (currentUser != null)
            {
                if (paymentRequest.PaymentRequestType == PaymentRequestType.CompanyCard)
                {
                    string stripeCustomerId = null;

                    var company = await context.Companies
                        .Where(c => c.Id == currentUser.CompanyId)
                        .FirstOrDefaultAsync();

                    if (string.IsNullOrWhiteSpace(company.PaymentGatewayCustomerId))
                    {
                        var service = new CustomerService();
                        var options = new CustomerCreateOptions
                        {
                            Name = currentUser.Company.Title,
                            Email = currentUser.UserName
                        };

                        var stripeCustomer = await service.CreateAsync(options);
                        company.PaymentGatewayCustomerId = stripeCustomer.Id;
                        stripeCustomerId = stripeCustomer.Id;

                        await context.SaveChangesAsync();
                    }
                    else
                    {
                        stripeCustomerId = company.PaymentGatewayCustomerId;
                    }

                    return await GetPaymentClientSecret(currentUser.CompanyId.Value, stripeCustomerId, paymentRequest.Amount, paymentRequest.PriceId);
                }
                else
                {
                    // personal card logic here...
                    throw new Exception("ConnectCustomer not available for user yet.");
                }
            }
            return null;
        }

        public async Task CreateACHPaymentIntent(decimal amount)
        {
            var currentUser = await userService.GetSignedInUser();
            if (currentUser != null)
            {
                var company = await context.Companies
                        .Where(c => c.PaymentGatewayCustomerId != null && c.Id == currentUser.CompanyId)
                        .FirstOrDefaultAsync();

                if (company != null)
                {
                    var options = new PaymentIntentCreateOptions
                    {
                        Amount = amount.ConvertToCents(),
                        Currency = "usd",
                        SetupFutureUsage = "off_session",
                        Customer = company.PaymentGatewayCustomerId,
                        PaymentMethodTypes = new List<string>
                          {
                            "us_bank_account",
                          },
                    };

                    var service = new PaymentIntentService();
                    var paymentIntent = service.Create(options);

                    context.Wallets.Add(new Wallet()
                    {
                        CompanyId = currentUser.Location.CompanyId,
                        UserId = currentUser.Id,
                        WalletType = WalletType.ACH,
                        PaymentGatewayId = paymentIntent.Id
                    });

                    await context.SaveChangesAsync();

                }
            }
        }

        private async Task<string> GetPaymentClientSecret(long companyId, string customerId, decimal? amount, string priceId = null)
        {
            if (!string.IsNullOrWhiteSpace(priceId))
            {
                var subscriptionOptions = new SubscriptionCreateOptions
                {
                    Customer = customerId,
                    Items = new List<SubscriptionItemOptions>
                    {
                        new SubscriptionItemOptions
                        {
                            Price = priceId,
                        },
                    },
                    PaymentBehavior = "default_incomplete",
                };
                subscriptionOptions.AddExpand("latest_invoice.payment_intent");
                var subscriptionService = new SubscriptionService();

                Subscription subscription = null;
                try
                {
                    subscription = subscriptionService.Create(subscriptionOptions);
                }
                catch (Exception ex)
                {

                }
                //context.Subscriptions.Add(new AuthScape.Models.PaymentGateway.Subscription()
                //{
                //    CompanyId = companyId,
                //    Created = SystemTime.Now,
                //    Expires = SystemTime.Now,
                //    PaymentGatewaySubscriptionId = subscription.Id
                //});
                //await context.SaveChangesAsync();

                return subscription.LatestInvoice.PaymentIntent.ClientSecret;
            }
            else
            {
                //var options = new SetupIntentCreateOptions();
                //var service = new SetupIntentService();
                //var response = await service.CreateAsync(options);
                //return response.ClientSecret;


                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = await paymentIntentService.CreateAsync(new PaymentIntentCreateOptions
                {
                    Customer = customerId,
                    Amount = amount.Value.ConvertToCents(),
                    Currency = "usd",
                    //PaymentMethodTypes = new List<string>
                    //{
                    //    "card",
                    //    "ach_credit_transfer"
                    //},
                    SetupFutureUsage = "off_session",
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                    },
                });

                return paymentIntent.ClientSecret;
            }
        }

        public async Task<List<Wallet>> GetPaymentMethods()
        {
            var signedInUser = await userService.GetSignedInUser();

            var paymentMethods = await context.Wallets
                .Where(w => w.CompanyId == signedInUser.CompanyId)
                .Select(w => new Wallet()
                {
                    Id = w.Id,
                    Brand = w.Brand,
                    ExpMonth = w.ExpMonth,
                    ExpYear = w.ExpYear,
                    FingerPrint = w.FingerPrint,
                    Funding = w.Funding,
                    Last4 = w.Last4,
                    WalletType = w.WalletType
                })
                .ToListAsync();

            return paymentMethods;
        }

        //public async Task CreateSubscription(string PriceId)
        //{
        //    var currentUser = await userService.GetSignedInUser();
        //    if (currentUser != null)
        //    {
        //        var customerId = await context.Wallets.Where(w => w.CompanyId == currentUser.CompanyId).FirstOrDefaultAsync();

        //        // Create the subscription. Note we're expanding the Subscription's
        //        // latest invoice and that invoice's payment_intent
        //        // so we can pass it to the front end to confirm the payment
        //        var subscriptionOptions = new SubscriptionCreateOptions
        //        {
        //            Customer = customerId.PaymentGatewayId,
        //            Items = new List<SubscriptionItemOptions>
        //        {
        //            new SubscriptionItemOptions
        //            {
        //                Price = PriceId,
        //            },
        //        },
        //            PaymentBehavior = "default_incomplete",
        //        };
        //        subscriptionOptions.AddExpand("latest_invoice.payment_intent");
        //        var subscriptionService = new SubscriptionService();
        //        try
        //        {
        //            Stripe.Subscription subscription = subscriptionService.Create(subscriptionOptions);


        //            context.Subscriptions.Add(new AuthScape.Models.PaymentGateway.Subscription()
        //            {
        //                CompanyId = currentUser.CompanyId,
        //                Created = SystemTime.Now,
        //                Expires = SystemTime.Now,
        //                PaymentGatewaySubscriptionId = subscription.Id
        //            });
        //            await context.SaveChangesAsync();

        //            //var subscriptionQuery = await context.Subscriptions
        //            //    .Where(s => s.CompanyId == currentUser.CompanyId)
        //            //    .FirstOrDefaultAsync();



        //            //return new SubscriptionCreateResponse
        //            //{
        //            //    SubscriptionId = subscription.Id,
        //            //    ClientSecret = subscription.LatestInvoice.PaymentIntent.ClientSecret,
        //            //};
        //        }
        //        catch (StripeException e)
        //        {
        //            Console.WriteLine($"Failed to create subscription.{e}");
        //            //return BadRequest();
        //        }
        //    }
        //}
    }
}
