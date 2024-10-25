using AuthScape.Models.PaymentGateway;
using CoreBackpack.cMath;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;
using Stripe;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.StripePayment.Models;
using AuthScape.Models.Users;

namespace AuthScape.StripePayment.Services
{
    public interface IStripePayService
    {
        Task<ConnectCustomerResponse> ConnectCustomer(SignedInUser signedInUser, PaymentRequest paymentRequest);
        Task<AuthScape.Models.PaymentGateway.Stripe.ChargeResponse> Charge(SignedInUser signedInUser, ChargeParam param);
        Task CancelPayment(string paymentIntent);
        Task<ICollection<WalletPaymentMethod>> GetPaymentMethods(SignedInUser signedInUser, PaymentMethodType paymentMethodType = PaymentMethodType.Company);
        Task ChargeWithExistingPayment(SignedInUser signedInUser, long invoiceId, Guid walletPaymentMethodId, decimal amount);
        Task<string> GeneratePaymentLink(PaymentLinkParam param);
        Task<Guid> AddPaymentMethod(SignedInUser signedInUser, PaymentMethodType paymentMethodType, Guid walletId, string paymentMethod);
        Task RemovePaymentMethod(SignedInUser signedInUser, Guid id);


        // Stripe Checkout
        Task<string> StripeCheckout(StripeCheckoutParam param);


        // Invoice logic
        Task<string> AddService(string stripeCustomerNumber, string stripeInvoiceNumber, decimal amount, string name, int qty, TaxBehavior taxBehavior, string taxCode);
        Task<string> CreateCustomer(string customerName, string email, string phone, string address, string city, string state, string postalCode, string country = "US", string address2 = null);
        Task<string> CreateInvoice(string customerId, bool AutomaticTax, long DaysUntilDue = 1826);
        Task<InvoiceItem> CreateItemForInvoice(string customerId, string invoiceId, string productName, decimal amount, int qty, TaxBehavior taxBehavior, string? taxCode = null);
        Task ChangeInvoiceLineItemQty(string invoiceLineItemId, long? Qty);
        Task RemoveItemFromInvoice(string stripeInvoiceId);
        Task<InvoiceResponse> GetInvoice(string invoiceId);
        Task DeleteDraftInvoice(string invoiceId);
        Task VoidInvoice(string invoiceId);
        Task PayInvoice(string invoiceId, string paymentMethod, decimal? amount = null);
        Task FinalizeInvoice(string invoiceId);
        //Task AttachPaymentMethodToCustomer(string customerId, string paymentMethodId);
        Task<string?> LookUpInvoiceLineItemIDByName(string stripeInvoiceId, string productName);






        // coupon logic
        Task CreateCouponPercentOff(decimal percentOff, string customerCode, CouponDuration couponDuration, long? MaxRedemptions = null);
        Task CreateCouponAmountOff(decimal amountOff, string customerCode, CouponDuration couponDuration, long? MaxRedemptions = null);
        Task DeleteCoupon(string customerCode);
        Task<string> SetupStripeConnect(SignedInUser signedInUser, string returnBaseUrl);
        Task<bool?> ACHNeedValidation(SignedInUser signedInUser);
        Task UpdateCustomerEmail(string paymentGatewayCustomerId, string email);
        Task UpdateCustomerAddress(string paymentGatewayCustomerId, string address, string city, string state, string postalCode, string country = "US");
        Task ChangeInvoiceLineItemPrice(string invoiceLineItemId, decimal amount);
        Task<List<StripeTaxCode>> GetAllTaxCodes(long? limit = null, string? StartingAfter = null, string? EndingBefore = null);
        Task SetPaymentMethod(string invoiceId, string paymentMethod);

        Task<ShippingRate> AddShippingRate(string displayName, decimal amount, TaxBehavior taxBehavior, string? taxCode = null);
		Task AddShippingRateToInvoice(string stripeInvoice, string shippingRateId);
        Task AddShippingToInvoice(string stripeInvoice, string displayName, decimal amount, TaxBehavior taxBehavior, string? taxCode = null, string currency = "usd");
        Task AddShippingAddress(string StripeInvoice, string RecipientName, string phoneNumber, string address, string city, string state, string postalCode, string country = "us");
        Task RemoveShippingQuote(string StripeInvoice);
	}

    public class StripePayService : IStripePayService
    {
        readonly DatabaseContext context;
        readonly AppSettings appSettings;

        public StripePayService(IOptions<AppSettings> appSettings, DatabaseContext context)
        {
            this.appSettings = appSettings.Value;
            this.context = context;

            if (this.appSettings.Stripe != null && this.appSettings.Stripe.SecretKey != null)
            {
                StripeConfiguration.ApiKey = this.appSettings.Stripe.SecretKey;
            }
        }

        public async Task ChargeWithExistingPayment(SignedInUser signedInUser, long invoiceId, Guid walletPaymentMethodId, decimal amount)
        {
            var wallet = await context.WalletPaymentMethods
                .Include(w => w.Wallet)
                .Where(w => w.Id == walletPaymentMethodId)
                .FirstOrDefaultAsync();

            if (wallet == null)
            {
                throw new AuthScape.Models.Exceptions.BadRequestException("Please provide a payment method");
            }

            var company = await context.Companies.Where(z => z.Id == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (company == null)
            {
                throw new AuthScape.Models.Exceptions.BadRequestException("Company does not exist");
            }

            // TODO: Charge the walletId for the invoice

        }

        public async Task<AuthScape.Models.PaymentGateway.Stripe.ChargeResponse> Charge(SignedInUser signedInUser, ChargeParam param)
        {
            var _wallet = context.WalletPaymentMethods
                .Include(w => w.Wallet)
                .Where(w => w.Id == param.WalletPaymentMethodId);

            if (param.PaymentMethodType == PaymentMethodType.User)
            {
                _wallet.Where(w => w.Wallet.UserId == signedInUser.Id);
            }
            else if (param.PaymentMethodType == PaymentMethodType.Location)
            {
                _wallet.Where(w => w.Wallet.LocationId == signedInUser.LocationId);
            }
            else if (param.PaymentMethodType == PaymentMethodType.Company)
            {
                _wallet.Where(w => w.Wallet.CompanyId == signedInUser.CompanyId);
            }

            var wallet = await _wallet.FirstOrDefaultAsync();

            if (wallet == null)
            {
                throw new AuthScape.Models.Exceptions.BadRequestException("Please provide a payment method");
            }

            var service = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = param.Amount.ConvertToCents(),
                Currency = "usd",
                //PaymentMethodTypes = new List<string> { "card" }, // still need to add in ACH
                Customer = wallet.Wallet.PaymentCustomerId,
                PaymentMethod = wallet.PaymentMethodId,
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
                        Success = true,
                        StripePaymentIntentId = paymentIntent.Id
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

        public async Task UpdateCustomerEmail(string paymentGatewayCustomerId, string email)
        {
            var service = new CustomerService();
            await service.UpdateAsync(paymentGatewayCustomerId, new CustomerUpdateOptions()
            {
                Email = email
            });
        }

        public async Task UpdateCustomerAddress(string paymentGatewayCustomerId, string address, string city, string state, string postalCode, string country = "US")
        {
            var service = new CustomerService();
            await service.UpdateAsync(paymentGatewayCustomerId, new CustomerUpdateOptions()
            {
                Address = new AddressOptions()
                {
                    Line1 = address,
                    City = city,
                    State = state,
                    PostalCode = postalCode,
                    Country = country
                }
            });
        }

        public async Task<ConnectCustomerResponse> ConnectCustomer(SignedInUser currentUser, PaymentRequest paymentRequest)
        {
            string? stripeCustomerId = null;
            Wallet? wallet = null;

            if (currentUser != null)
            {
                if (paymentRequest.PaymentMethodType == PaymentMethodType.User)
                {
                    var walletItem =  await context.Wallets
                        .Where(w => w.UserId == currentUser.Id)
                        .FirstOrDefaultAsync();

                    if (walletItem == null)
                    {
                        stripeCustomerId = await CreateCustomer(currentUser.FirstName + " " + currentUser.LastName, currentUser.Email, "", "", "", "", "");
                        var newWallet = new Wallet()
                        {
                            UserId = currentUser.Id,
                            PaymentCustomerId = stripeCustomerId,
                        };
                        await context.Wallets.AddAsync(newWallet);
                    }
                    else
                    {
                        stripeCustomerId = walletItem.PaymentCustomerId;
                    }

                    await context.SaveChangesAsync();
                }
                else if (paymentRequest.PaymentMethodType == PaymentMethodType.Location)
                {
                    var walletItem = await context.Wallets
                        .Where(w => w.LocationId == currentUser.LocationId)
                        .FirstOrDefaultAsync();

                    if (walletItem == null)
                    {
                        var location = await context.Locations.Where(l => l.Id == currentUser.LocationId).FirstOrDefaultAsync();
                        if (location != null)
                        {
                            stripeCustomerId = await CreateCustomer(location.Title, currentUser.Email, "", 
                                (!String.IsNullOrWhiteSpace(location.Address) ? location.Address : ""), 
                                (!String.IsNullOrWhiteSpace(location.City) ? location.City : ""), 
                                (!String.IsNullOrWhiteSpace(location.State) ? location.State : ""), 
                                (!String.IsNullOrWhiteSpace(location.ZipCode) ? location.ZipCode : ""));
                            
                            var newWallet = new Wallet()
                            {
                                LocationId = currentUser.LocationId,
                                PaymentCustomerId = stripeCustomerId,
                            };
                            await context.Wallets.AddAsync(newWallet);
                        }
                    }
                    else
                    {
                        stripeCustomerId = walletItem.PaymentCustomerId;
                    }

                    await context.SaveChangesAsync();
                }
                else if (paymentRequest.PaymentMethodType == PaymentMethodType.Company)
                {
                    var walletItem = await context.Wallets
                        .Where(w => w.CompanyId == currentUser.CompanyId)
                        .FirstOrDefaultAsync();

                    if (walletItem == null)
                    {
                        var company = await context.Companies.Where(c => c.Id == currentUser.CompanyId).FirstOrDefaultAsync();
                        if (company != null)
                        {
                            stripeCustomerId = await CreateCustomer(company.Title, currentUser.Email, "", "", "", "", "");
                            var newWallet = new Wallet()
                            {
                                CompanyId = currentUser.CompanyId,
                                PaymentCustomerId = stripeCustomerId,
                            };
                            await context.Wallets.AddAsync(newWallet);
                        }
                    }
                    else
                    {
                        stripeCustomerId = walletItem.PaymentCustomerId;
                    }

                    await context.SaveChangesAsync();
                }
            }

            if (String.IsNullOrWhiteSpace(paymentRequest.stripeCustomerId))
            {
                if (currentUser != null) // the user account was created already, let find a payment method
                {
                    if (paymentRequest.PaymentMethodType == PaymentMethodType.Company)
                    {
                        if (currentUser.CompanyId == null)
                        {
                            return null;
                        }

                        wallet = await context.Wallets
                                .Where(c => c.CompanyId == currentUser.CompanyId)
                                .FirstOrDefaultAsync();

                        if (wallet != null)
                        {
                            stripeCustomerId = wallet.PaymentCustomerId;
                        }
                        else
                        {
                            var service = new CustomerService();
                            var options = new CustomerCreateOptions
                            {
                                Description = currentUser.CompanyName,
                                Name = currentUser.CompanyName,
                                Email = currentUser.Email,
                                Expand = new List<string>() { "tax" }
                            };

                            var stripeCustomer = await service.CreateAsync(options);

                            wallet = new Wallet()
                            {
                                CompanyId = currentUser.CompanyId,
                                PaymentCustomerId = stripeCustomer.Id
                            };

                            await context.Wallets.AddAsync(wallet);
                            stripeCustomerId = stripeCustomer.Id;
                        }
                    }
                    else if (paymentRequest.PaymentMethodType == PaymentMethodType.User)
                    {
                        wallet = await context.Wallets
                                .Where(c => c.UserId == currentUser.Id)
                                .FirstOrDefaultAsync();

                        if (wallet != null)
                        {
                            stripeCustomerId = wallet.PaymentCustomerId;
                        }
                        else
                        {
                            var service = new CustomerService();
                            var options = new CustomerCreateOptions
                            {
                                Description = (currentUser.FirstName + " " + currentUser.LastName),
                                Name = (currentUser.FirstName + " " + currentUser.LastName),
                                Email = currentUser.Email,
                                Expand = new List<string>() { "tax" }
                            };

                            var stripeCustomer = await service.CreateAsync(options);

                            wallet = new Wallet()
                            {
                                UserId = currentUser.Id,
                                PaymentCustomerId = stripeCustomer.Id
                            };

                            await context.Wallets.AddAsync(wallet);
                            stripeCustomerId = stripeCustomer.Id;
                        }
                    }
                    else if (paymentRequest.PaymentMethodType == PaymentMethodType.Location)
                    {
                        if (currentUser.LocationId == null)
                        {
                            return null;
                        }

                        wallet = await context.Wallets
                                .Where(c => c.LocationId == currentUser.LocationId)
                                .FirstOrDefaultAsync();

                        if (wallet != null)
                        {
                            stripeCustomerId = wallet.PaymentCustomerId;
                        }
                        else
                        {
                            var location = await context.Locations
                                .Where(c => c.Id == currentUser.LocationId)
                                .FirstOrDefaultAsync();

                            var service = new CustomerService();
                            var options = new CustomerCreateOptions
                            {
                                Description = location.Title,
                                Name = location.Title,
                                Email = currentUser.Email,
                                Expand = new List<string>() { "tax" }
                            };

                            var stripeCustomer = await service.CreateAsync(options);

                            wallet = new Wallet()
                            {
                                LocationId = currentUser.LocationId,
                                PaymentCustomerId = stripeCustomer.Id
                            };

                            await context.Wallets.AddAsync(wallet);
                            stripeCustomerId = stripeCustomer.Id;
                        }
                    }

                    await context.SaveChangesAsync();
                }
                else // Not signed in, already create a new customer account
                {
                    var service = new CustomerService();
                    var options = new CustomerCreateOptions
                    {
                        Description = paymentRequest.Name, // need to change this...
                        Name = paymentRequest.Name,
                        Email = paymentRequest.Email,
                        Expand = new List<string>() { "tax" }
                    };

                    var stripeCustomer = await service.CreateAsync(options);
                    stripeCustomerId = stripeCustomer.Id;
                }
            }
            else
            {
                stripeCustomerId = paymentRequest.stripeCustomerId;
            }

            var setupIntentService = new SetupIntentService();
            var setupIntent = await setupIntentService.CreateAsync(new SetupIntentCreateOptions()
            {
                Customer = stripeCustomerId,
                AutomaticPaymentMethods = new SetupIntentAutomaticPaymentMethodsOptions()
                {
                    Enabled = true,
                }
            });

            return new ConnectCustomerResponse()
            {
                ClientSecret = setupIntent.ClientSecret,
                WalletId = wallet != null ? wallet.Id : null,
                StripePublicKey = appSettings.Stripe.PublishableKey
            };
        }

        public async Task<ICollection<WalletPaymentMethod>> GetPaymentMethods(SignedInUser signedInUser, PaymentMethodType paymentMethodType = PaymentMethodType.Company)
        {
            if (paymentMethodType == PaymentMethodType.Company)
            {
                return await context.Wallets
                    .Include(w => w.WalletPaymentMethods)
                    .Where(w => w.CompanyId == signedInUser.CompanyId)
                    .Select(w => w.WalletPaymentMethods)
                    .FirstOrDefaultAsync();
            }
            else if (paymentMethodType == PaymentMethodType.User)
            {
                return await context.Wallets
                    .Include(w => w.WalletPaymentMethods)
                    .Where(w => w.UserId == signedInUser.Id)
                    .Select(w => w.WalletPaymentMethods)
                    .FirstOrDefaultAsync();
            }
            else if (paymentMethodType == PaymentMethodType.Location)
            {
                return await context.Wallets
                    .Include(w => w.WalletPaymentMethods)
                    .Where(w => w.LocationId == signedInUser.LocationId)
                    .Select(w => w.WalletPaymentMethods)
                    .FirstOrDefaultAsync();
            }

            return new List<WalletPaymentMethod>();
        }

        public async Task<string> GeneratePaymentLink(PaymentLinkParam param)
        {
            var productOptions = new ProductCreateOptions
            {
                Name = param.ProductName,
            };
            var productService = new Stripe.ProductService();
            var productResponse = await productService.CreateAsync(productOptions);


            // setup your product catalog
            var priceOptions = new PriceCreateOptions
            {
                Currency = "usd",
                UnitAmount = MoneyExtender.ConvertToCents(param.Price),
                Product = productResponse.Id,
                TaxBehavior = "exclusive"
            };
            var priceService = new PriceService();
            var priceResponse = await priceService.CreateAsync(priceOptions);




            var paymentLinkOptions = new PaymentLinkCreateOptions
            {
                LineItems = new List<PaymentLinkLineItemOptions>
                {
                    new PaymentLinkLineItemOptions { Price = priceResponse.Id, Quantity = param.Qty },
                },
                AutomaticTax = new PaymentLinkAutomaticTaxOptions { Enabled = true },
                PaymentMethodTypes = new List<string> { "card" }
            };
            var paymentLinkService = new PaymentLinkService();
            var linkService = await paymentLinkService.CreateAsync(paymentLinkOptions);

            return linkService.Url;
        }

        //public async Task AttachPaymentMethodToCustomer(string customerId, string paymentMethodId)
        //{
        //    var options = new PaymentMethodAttachOptions
        //    {
        //        Customer = customerId,
        //    };
        //    var service = new PaymentMethodService();
        //    await service.AttachAsync(paymentMethodId, options);
        //}

        public async Task<ShippingRate> AddShippingRate(string displayName, decimal amount, TaxBehavior taxBehavior, string? taxCode = null)
        {
            var options = new ShippingRateCreateOptions
            {
                DisplayName = displayName,
                Type = "fixed_amount",
                TaxBehavior = taxBehavior.ToString(),
				FixedAmount = new ShippingRateFixedAmountOptions
                {
                    Amount = MoneyExtender.ConvertToCents(amount),
                    Currency = "usd",
                }
            };

            if (taxCode != null)
            {
				options.TaxCode = taxCode;
			}

            var service = new ShippingRateService();
            return await service.CreateAsync(options);
        }


        public async Task<string> StripeCheckout(StripeCheckoutParam param)
        {
            var newListItems = new List<Stripe.Checkout.SessionLineItemOptions>();
            foreach (var item in param.Items)
            {
                newListItems.Add(new Stripe.Checkout.SessionLineItemOptions
                {
                    Price = item.StripePriceId,
                    Quantity = item.Qty,
                });
            }

            var options = new Stripe.Checkout.SessionCreateOptions
            {
                LineItems = newListItems,
                Mode = param.mode == StripeCheckoutMode.Payment ? "payment" : "Subscription",
                SuccessUrl = param.SuccessURL,
            };
            var service = new Stripe.Checkout.SessionService();
            var session = await service.CreateAsync(options);

            return session.Url;
        }


        public async Task AddShippingRateToInvoice(string stripeInvoice, string shippingRateId)
        {
			var invoiceService = new InvoiceService();
            await invoiceService.UpdateAsync(stripeInvoice, new InvoiceUpdateOptions()
            {
                ShippingCost = new InvoiceShippingCostOptions()
                {
                    ShippingRate = shippingRateId
				}
            });
		}

        public async Task AddShippingAddress(string StripeInvoice, string RecipientName, string phoneNumber, string address, string city, string state, string postalCode, string country = "us")
        {
			var invoiceService = new InvoiceService();
			await invoiceService.UpdateAsync(StripeInvoice, new InvoiceUpdateOptions()
			{
				ShippingDetails = new InvoiceShippingDetailsOptions()
                {
                    Name = RecipientName,
                    Phone = phoneNumber,
                    Address = new AddressOptions()
                    {
                        Line1 = address,
                        City = city,
                        State = state,
                        PostalCode = postalCode,
                        Country = country
					}
				}
			});
		}

        public async Task RemoveShippingQuote(string StripeInvoice)
        {
			var invoiceService = new InvoiceService();
			await invoiceService.UpdateAsync(StripeInvoice, new InvoiceUpdateOptions()
			{
				ShippingCost = new InvoiceShippingCostOptions()
				{
					ShippingRateData = new InvoiceShippingCostShippingRateDataOptions()
					{
						FixedAmount = new InvoiceShippingCostShippingRateDataFixedAmountOptions()
						{
							Amount = MoneyExtender.ConvertToCents(0),
						},
						DisplayName = "none",
						TaxBehavior = TaxBehavior.exclusive.ToString(),
						Type = "fixed_amount"
					}
				}
			});
		}

		public async Task AddShippingToInvoice(string stripeInvoice, string displayName, decimal amount, TaxBehavior taxBehavior, string? taxCode = null, string currency = "usd")
		{
			var invoiceService = new InvoiceService();
			await invoiceService.UpdateAsync(stripeInvoice, new InvoiceUpdateOptions()
			{
				ShippingCost = new InvoiceShippingCostOptions()
				{
					ShippingRateData = new InvoiceShippingCostShippingRateDataOptions()
                    {
                        FixedAmount = new InvoiceShippingCostShippingRateDataFixedAmountOptions()
                        {
                            Currency = currency,
                            Amount = MoneyExtender.ConvertToCents(amount),
						},
                        DisplayName = displayName,
                        TaxBehavior = taxBehavior.ToString(),
                        TaxCode = taxCode,
                        Type = "fixed_amount"
					}
				}
			});
		}



		public async Task<string> CreateInvoice(string customerId, bool AutomaticTax, long DaysUntilDue = 1826)
        {
            // create the invoice
            var invoiceOptions = new InvoiceCreateOptions
            {
                AutoAdvance = false,
                Customer = customerId,
                CollectionMethod = "send_invoice",
                DaysUntilDue = DaysUntilDue, // max length in stripe
                AutomaticTax = new InvoiceAutomaticTaxOptions()
                {
                    Enabled = AutomaticTax
                }
            };
            var invoiceService = new InvoiceService();
            var invoice = await invoiceService.CreateAsync(invoiceOptions);
            return invoice.Id;
        }

        public async Task<string> AddService(string stripeCustomerNumber, string stripeInvoiceNumber, decimal amount, string name, int qty, TaxBehavior taxBehavior, string taxCode)
        {
            var invoiceItemService = new InvoiceItemService();
            var invoiceItemOptions = new InvoiceItemCreateOptions
            {
                Customer = stripeCustomerNumber,
                UnitAmount = MoneyExtender.ConvertToCents(amount),
                Invoice = stripeInvoiceNumber,
                Description = name,
                TaxBehavior = taxBehavior.ToString(),
                TaxCode = taxCode,
                Quantity = qty,
            };
            var invoiceItem = await invoiceItemService.CreateAsync(invoiceItemOptions);
            return invoiceItem.Id;
        }

		//public async Task UpdateCustomerOnInvoice(string invoiceId, string name, string email)
		//{
		//    var invoiceService = new InvoiceService();
		//    var updatedInvoice = invoiceService.Update(invoiceId, invoiceOptions);
		//}

		public async Task<InvoiceItem> CreateItemForInvoice(string customerId, string invoiceId, string productName, decimal amount, int qty, TaxBehavior taxBehavior, string? taxCode = null)
        {
            // need to make sure we don't duplicat this product... assign it to the product table
            var priceOptions = new PriceCreateOptions
            {
                UnitAmount = MoneyExtender.ConvertToCents(amount),
                Currency = "usd",
                TaxBehavior = taxBehavior.ToString(),
                ProductData = new PriceProductDataOptions { Name = productName },
            };
            var pricingService = new PriceService();
            var priceObj = await pricingService.CreateAsync(priceOptions);


            // Create an Invoice Item with the Price, and Customer you want to charge
            var invoiceItemOptions = new InvoiceItemCreateOptions
            {
                Customer = customerId,
                Price = priceObj.Id,
                Invoice = invoiceId,
                Quantity = qty,
            };

            var invoiceItemService = new InvoiceItemService();
            var invoiceItem = await invoiceItemService.CreateAsync(invoiceItemOptions);

            return invoiceItem;
        }


        public async Task ChangeInvoiceLineItemQty(string invoiceLineItemId, long? Qty)
        {
            var invoiceItemService = new InvoiceItemService();
            var invoiceItem = await invoiceItemService.UpdateAsync(invoiceLineItemId, new InvoiceItemUpdateOptions()
            {
                Quantity = Qty
            });
        }

        public async Task ChangeInvoiceLineItemPrice(string invoiceLineItemId, decimal amount)
        {
            var invoiceItemService = new InvoiceItemService();
            var invoiceItem = await invoiceItemService.UpdateAsync(invoiceLineItemId, new InvoiceItemUpdateOptions()
            {
                Amount = MoneyExtender.ConvertToCents(amount)
            });
        }

        public async Task RemoveItemFromInvoice(string stripeInvoiceId)
        {
            var invoiceItemService = new InvoiceItemService();
            await invoiceItemService.DeleteAsync(stripeInvoiceId);
        }

        public async Task<string?> LookUpInvoiceLineItemIDByName(string stripeInvoiceId, string productName)
        {
            var invoiceItemService = new InvoiceItemService();
            var invoiceList = await invoiceItemService.ListAsync(new InvoiceItemListOptions()
            {
                Invoice = stripeInvoiceId
            });

            var productItemService = new ProductService();
            foreach (var list in invoiceList)
            {
                var product = await productItemService.GetAsync(list.Price.ProductId);
                if (product.Name == productName)
                {
                    return list.Id;
                }
            }

            return null;
        }

        public async Task<string> CreateCustomer(string customerName, string email, string phone, string address, string city, string state, string postalCode, string country = "US", string address2 = null)
        {
            var service = new CustomerService();
            var options = new CustomerCreateOptions
            {
                Description = customerName,
                Name = customerName,
                Email = email,
                Phone = phone,
                Address = new AddressOptions()
                {
                    Line1 = address,
                    Line2 = address2,
                    City = city,
                    State = state,
                    PostalCode = postalCode,
                    Country = country
                },
                Expand = new List<string>() { "tax" }
            };

            var stripeCustomer = await service.CreateAsync(options);

            return stripeCustomer.Id;
        }

        public async Task<InvoiceResponse> GetInvoice(string invoiceId)
        {
            var invoiceService = new InvoiceService();
            var overallInvoice = await invoiceService.GetAsync(invoiceId);

            if (overallInvoice.Tax != null && overallInvoice.Tax != 0.00m)
            {
                var taxVal = MoneyExtender.ConvertToDollars(overallInvoice.Tax.Value) / MoneyExtender.ConvertToDollars(overallInvoice.Subtotal);
                var percent = Math.Round(taxVal * 100, 3, MidpointRounding.AwayFromZero);

				return new InvoiceResponse()
                {
                    PercentTax = percent.ToString() + "%",
                    ShippingAmount = overallInvoice.AmountShipping > 0 ? MoneyExtender.ConvertToDollars(overallInvoice.AmountShipping) : null,
                    Tax = overallInvoice.Tax != null ? MoneyExtender.ConvertToDollars(overallInvoice.Tax.Value) : 0.00m,
                    Subtotal = MoneyExtender.ConvertToDollars(overallInvoice.Subtotal),
                    Total = MoneyExtender.ConvertToDollars(overallInvoice.Total)
                };
            }
            else
            {
                return new InvoiceResponse()
                {
                    PercentTax = null,
                    Tax = 0.00m,
                    Subtotal = MoneyExtender.ConvertToDollars(overallInvoice.Subtotal),
                    Total = MoneyExtender.ConvertToDollars(overallInvoice.Total)
                };
            }

            
        }

        public async Task DeleteDraftInvoice(string invoiceId)
        {
            var service = new InvoiceService();
            await service.DeleteAsync(invoiceId);
        }

        public async Task VoidInvoice(string invoiceId)
        {
            var service = new InvoiceService();
            await service.VoidInvoiceAsync(invoiceId);
        }

        public async Task PayInvoice(string invoiceId, string paymentMethod, decimal? amount = null)
        {
            var invoiceService = new InvoiceService();
            
            //await service.UpdateAsync(invoiceId, new InvoiceUpdateOptions()
            //{
            //    DefaultPaymentMethod = paymentMethod
            //});


            if (amount != null)
            {
                //context.WalletPaymentMethods

                var creditNoteService = new CreditNoteService();
                var paymentIntentService = new PaymentIntentService();

                // Create a PaymentIntent for the partial amount
                var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
                {
                    Amount = MoneyExtender.ConvertToCents(amount.Value), // Amount in cents (e.g., $50.00)
                    Currency = "usd",
                    Customer = "cus_XXXXXXXXXXXXX", // Your customer's ID
                                                    // Add other necessary options
                });

                // Confirm the PaymentIntent if needed
                var confirmOptions = new PaymentIntentConfirmOptions
                {
                    PaymentMethod = paymentMethod // The ID of the payment method
                };
                var confirmedPaymentIntent = paymentIntentService.Confirm(paymentIntent.Id, confirmOptions);


                var creditNote = creditNoteService.Create(new CreditNoteCreateOptions
                {
                    Invoice = invoiceId, // Your invoice ID
                    Amount = confirmedPaymentIntent.AmountReceived,
                    Reason = "adjustment"
                });

                var updatedInvoice = invoiceService.Get(invoiceId);

                Console.WriteLine($"Partial payment accepted. New amount due: {updatedInvoice.AmountDue}");
            }
            else
            {
                await invoiceService.PayAsync(invoiceId, new InvoicePayOptions()
                {
                    PaymentMethod = paymentMethod
                });
            }
            
        }

        /// <summary>
        /// Stripe automatically finalizes drafts before sending and attempting payment on invoices. However, if you’d like to finalize a draft invoice manually, you can do so using this method.
        /// </summary>
        /// <param name="invoiceId"></param>
        /// <returns></returns>
        public async Task FinalizeInvoice(string invoiceId)
        {
            var service = new InvoiceService();
            await service.FinalizeInvoiceAsync(invoiceId);
        }

        public async Task CreateCouponPercentOff(decimal percentOff, string customerCode, CouponDuration couponDuration, long? MaxRedemptions = null)
        {
            string duration = "";
            switch (couponDuration)
            {
                case CouponDuration.Once:
                    duration = "once";
                    break;
                case CouponDuration.Repeating:
                    duration = "repeating";
                    break;
                case CouponDuration.Forever:
                    duration = "forever";
                    break;
            }

            var options = new CouponCreateOptions
            {
                Duration = duration,
                Id = customerCode,
                PercentOff = percentOff,
                MaxRedemptions = MaxRedemptions
            };
            var service = new CouponService();
            service.Create(options);
        }

        public async Task CreateCouponAmountOff(decimal amountOff, string customerCode, CouponDuration couponDuration, long? MaxRedemptions = null)
        {
            string duration = "";
            switch (couponDuration)
            {
                case CouponDuration.Once:
                    duration = "once";
                    break;
                case CouponDuration.Repeating:
                    duration = "repeating";
                    break;
                case CouponDuration.Forever:
                    duration = "forever";
                    break;
            }

            var options = new CouponCreateOptions
            {
                Duration = duration,
                Id = customerCode,
                Currency = "usd",
                AmountOff = MoneyExtender.ConvertToCents(amountOff),
                MaxRedemptions = MaxRedemptions
            };
            var service = new CouponService();
            service.Create(options);
        }

        public async Task DeleteCoupon(string customerCode)
        {
            var service = new CouponService();
            service.Delete(customerCode);
        }

        public async Task<string> SetupStripeConnect(SignedInUser signedInUser, string returnBaseUrl)
        {
            if (signedInUser.CompanyId == null)
            {
                throw new AuthScape.Models.Exceptions.BadRequestException("No company assigned to account.");
            }

            var options = new AccountCreateOptions { Type = "express", Email = signedInUser.Email
            };
            var service = new Stripe.AccountService();
            var accountResponse = await service.CreateAsync(options);

            var accountLinkOptions = new AccountLinkCreateOptions
            {
                Account = accountResponse.Id,
                RefreshUrl = returnBaseUrl + "/reauth",
                ReturnUrl = returnBaseUrl + "/return",
                Type = "account_onboarding",
            };
            var accountLinkservice = new AccountLinkService();
            var createService = await accountLinkservice.CreateAsync(accountLinkOptions);

            await context.StripeConnectAccounts.AddAsync(new StripeConnectAccount()
            {
                CompanyId = signedInUser.CompanyId.Value,
                StripeConnectAccountId = accountResponse.Id
            });
            await context.SaveChangesAsync();

            return createService.Url;
        }

        public async Task<bool?> ACHNeedValidation(SignedInUser signedInUser)
        {
            var stripeConnectAccount = await context.StripeConnectAccounts
                .Where(s => s.CompanyId == signedInUser.CompanyId)
                .FirstOrDefaultAsync();

            if (stripeConnectAccount != null)
            {
                return stripeConnectAccount.ValidationCompleted;
            }

            return null;
        }


        public async Task<Guid> AddPaymentMethod(SignedInUser signedInUser, PaymentMethodType paymentMethodType, Guid walletId, string paymentMethod)
        {
            var company = await context.Companies.Where(c => c.Id == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (company == null)
            {
                throw new AuthScape.Models.Exceptions.BadRequestException("Company not assigned");
            }

            // can we determine the payment type from stripe api?
            var paymentMethodService = new PaymentMethodService();
            var paymentMethodItem = await paymentMethodService.GetAsync(paymentMethod);

            WalletType walletType;
            Enum.TryParse(paymentMethodItem.Type, out walletType);

            if (walletType == WalletType.card)
            {
                var walletPaymentMethod = new WalletPaymentMethod()
                {
                    WalletId = walletId,
                    Brand = paymentMethodItem.Card.Brand,
                    ExpYear = paymentMethodItem.Card.ExpYear,
                    ExpMonth = paymentMethodItem.Card.ExpMonth,
                    FingerPrint = paymentMethodItem.Card.Fingerprint,
                    Last4 = paymentMethodItem.Card.Last4,
                    Funding = paymentMethodItem.Card.Funding,
                    WalletType = walletType,
                    PaymentMethodId = paymentMethod,
                };

                await context.WalletPaymentMethods.AddAsync(walletPaymentMethod);
                await context.SaveChangesAsync();

                return walletPaymentMethod.Id;
            }
            else if (walletType == WalletType.us_bank_account)
            {
                var walletPaymentMethod = new WalletPaymentMethod()
                {
                    WalletId = walletId,
                    BankName = paymentMethodItem.UsBankAccount.BankName,
                    AccountType = paymentMethodItem.UsBankAccount.AccountType,
                    FingerPrint = paymentMethodItem.UsBankAccount.Fingerprint,
                    RoutingNumber = paymentMethodItem.UsBankAccount.RoutingNumber,
                    AccountHolderType = paymentMethodItem.UsBankAccount.AccountHolderType,
                    Last4 = paymentMethodItem.UsBankAccount.Last4,
                    WalletType = walletType,
                    PaymentMethodId = paymentMethod,
                };
                await context.WalletPaymentMethods.AddAsync(walletPaymentMethod);
                await context.SaveChangesAsync();

                return walletPaymentMethod.Id;
            }

            throw new AuthScape.Models.Exceptions.BadRequestException("Unsupported Payment Method");
        }

        public async Task RemovePaymentMethod(SignedInUser signedInUser, Guid id)
        {
            var paymentMethod = await context.WalletPaymentMethods
                .Where(w => w.Id == id)
                .FirstOrDefaultAsync();

            if (paymentMethod != null)
            {
                var paymentMethodService = new PaymentMethodService();
                await paymentMethodService.DetachAsync(paymentMethod.PaymentMethodId);

                context.WalletPaymentMethods.Remove(paymentMethod);
                await context.SaveChangesAsync();
            }
        }


        public async Task<List<StripeTaxCode>> GetAllTaxCodes(long? limit = null, string? StartingAfter = null, string? EndingBefore = null)
        {
            var options = new TaxCodeListOptions();

            if (limit !=  null)
            {
                options.Limit = limit.Value;
            }

            if (StartingAfter != null)
            {
                options.StartingAfter = StartingAfter;
            }

            if (EndingBefore != null)
            {
                options.EndingBefore = EndingBefore;
            }

            var service = new TaxCodeService();
            
            StripeList<TaxCode> taxCodes = await service.ListAsync(options);

            return taxCodes.Select(s => new StripeTaxCode()
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
            }).ToList();
        }

        public async Task SetPaymentMethod(string invoiceId, string paymentMethod)
        {
            var service = new InvoiceService();
            await service.UpdateAsync(
              invoiceId,
              new InvoiceUpdateOptions() { 
                DefaultPaymentMethod = paymentMethod
            });
        }
    }

    public enum CouponDuration
    {
        Once,
        Forever,
        Repeating
    }
}
