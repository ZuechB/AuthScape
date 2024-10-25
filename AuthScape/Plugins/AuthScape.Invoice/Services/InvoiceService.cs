using AuthScape.Models.Exceptions;
using AuthScape.Models.Users;
using CoreBackpack;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AuthScape.Plugins.Invoices.Models;
using Services.Context;
using Services.Database;
using System.Text;
using AuthScape.StripePayment.Services;
using AuthScape.Services;
using Models.Email;
using AuthScape.Invoice.Models;

namespace Services
{
    public interface IInvoiceService
    {
        Task<PagedList<Invoice>> GetInvoices(int offset = 1, int length = 10, long? companyId = null, long? locationId = null, InvoiceState invoiceState = InvoiceState.Active);
        Task<Guid> CreateLineItem(long invoiceId, long InvoiceLineItemNameId, decimal amount, int qty, string? description = null);
        Task<Tuple<long, Guid>> CreateInvoice(long locationId);
        Task<SimpleInvoice> GetInvoiceDetail(long invoiceId, Guid secret);
        Task AssignCompanyToInvoice(AssignCompanyToInvoiceData assignCompany);
        Task<long> CreateLineItem(string name);
        Task<List<InvoiceLineItemsName>> GetListItemNames();
        Task ArchiveInvoice(long invoiceId);

        // Remove return once debugging payment is complete
        Task<long> PayInvoice(long InvoiceId, Guid WalletPaymentMethodId);
        Task RemoveLineItem(Guid id);
        Task SendInvoice(long invoiceId);
        Task AssignLocationToInvoice(AssignLocationToInvoiceData assignLocation);


        Task SetStartDate(long invoiceId, DateTime startDate);
        Task SetEndDate(long invoiceId, DateTime endDate);
        Task SetDueDate(long invoiceId, DateTime dueDate);

        Task<PagedList<Location>> GetLocations(int offset = 1, int length = 10, string locationName = "", long? companyId = null, bool IsActive = true);
        Task<List<InvoiceQueryAutoComplete>> SearchLocation(int offset = 1, int length = 10, string locationName = "", long? companyId = null, bool IsActive = true);
        Task<PagedList<InvoiceLineItemView>> GetLineItems(long InvoiceId, int offset, int pageSize);
        Task ChangeLineItemValue(LineItemParamChange lineItemParamChange);
        Task SetNote(long InvoiceId, string Note);
    }

    public class InvoiceService : IInvoiceService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userManagementService;
        readonly IStripePayService stripePayService;
        readonly AppSettings appSettings;
        readonly INotificationService notificationService;

        public InvoiceService(DatabaseContext databaseContext, IUserManagementService userManagementService, IStripePayService stripePayService, INotificationService notificationService, IOptions<AppSettings> appSettings)
        {
            this.databaseContext = databaseContext;
            this.userManagementService = userManagementService;
            this.stripePayService = stripePayService;
            this.appSettings = appSettings.Value;
            this.notificationService = notificationService;
        }

        public async Task<List<InvoiceLineItemsName>> GetListItemNames()
        {
            return await databaseContext.InvoiceLineItemNames.ToListAsync();
        }

        public async Task ArchiveInvoice(long invoiceId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var invoice = await databaseContext.Invoices.Where(w => w.Id == invoiceId && w.CompanyId == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (invoice == null)
            {
                throw new BadRequestException("Could not find invoice");
            }

            invoice.InvoiceState = InvoiceState.Archived;
            await databaseContext.SaveChangesAsync();
        }

        public async Task<long> CreateLineItem(string name)
        {
            var newLineItem = new InvoiceLineItemsName()
            {
                Name = name
            };

            databaseContext.InvoiceLineItemNames.Add(newLineItem);
            await databaseContext.SaveChangesAsync();

            return newLineItem.Id;
        }

        public async Task RemoveLineItem(Guid id)
        {
            var invoiceLineItem = await databaseContext.InvoiceLineItems.Where(i => i.Id == id).FirstOrDefaultAsync();
            if (invoiceLineItem != null)
            {
                var invoiceId = invoiceLineItem.InvoiceId;
                databaseContext.InvoiceLineItems.Remove(invoiceLineItem);
                await databaseContext.SaveChangesAsync();

                // recalculate totals
                await RecalculateInvoice(invoiceId);
            }
        }

        public async Task<Tuple<long, Guid>> CreateInvoice(long locationId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            //if (signedInUser.Role == Roles.Admin)
            //{
                var location = await databaseContext.Locations.Include(l => l.Company).Where(l => l.Id == locationId).FirstOrDefaultAsync();
                if (location == null)
                {
                    throw new BadRequestException("Missing location");
                }

                var user = await databaseContext.Users.Where(u => u.LocationId == location.Id).FirstOrDefaultAsync();

                var invoice = new Invoice()
                {
                    InvoiceState = InvoiceState.Active,
                    Created = SystemTime.Now,
                    CompanyName = location.Company.Title,
                    AmountDue = 0,
                    BalanceDue = 0,
                    AmountPaid = 0,
                    LocationId = locationId,
                    InvoiceToUserId = user != null ? user.Id : null,
                    CompanyId = location.CompanyId,
                    Secret = Guid.NewGuid()
                };
                await databaseContext.Invoices.AddAsync(invoice);
                await databaseContext.SaveChangesAsync();

                return new Tuple<long, Guid>(invoice.Id, invoice.Secret);
            //}
            //else
            //{
            //    throw new BadRequestException("Invalid Access");
            //}
        }

        public async Task<PagedList<Invoice>> GetInvoices(int offset = 0, int length = 10, long? companyId = null, long? locationId = null, InvoiceState invoiceState = InvoiceState.Active)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            
            var invoices = databaseContext.Invoices
                .Include(i => i.Company)
                .Include(i => i.Location)
                .Where(i => i.InvoiceState == invoiceState);

            if (companyId != null)
            {
                invoices = invoices.Where(i => i.CompanyId == companyId.Value);
            }

            if (locationId != null)
            {
                invoices = invoices.Where(i => i.LocationId == locationId.Value);
            }

            return await invoices.OrderByDescending(i => i.Created)
                .OrderByDescending(i => i.DueDate)
                .Select(i => new Invoice()
                {
                    Id = i.Id,
                    AmountDue = i.AmountDue,
                    Company = new Company()
                    {
                        Title = i.Company.Title
                    },
                    InvoiceState = i.InvoiceState,
                    BillingPeriod = (i.BillingStartDate != null ? i.BillingStartDate.Value.ToShortDateString() : "Missing Start Date") + " - " + (i.BillingEndDate != null ? i.BillingEndDate.Value.ToShortDateString() : "Missing End Date"),
                    DueDateString = i.DueDate != null ? i.DueDate.ToShortDateString() : "None",
                    Secret = i.Secret,
                    LocationName = (i.Location.Address + ", " + i.Location.City + " " + i.Location.State + " " + i.Location.ZipCode)
                })
                .ToPagedResultAsync(offset, length);
        }

        public async Task<Guid> CreateLineItem(long invoiceId, long InvoiceLineItemNameId, decimal amount, int qty, string? description = null)
        {
            var lineItem = new InvoiceLineItem()
            {
                InvoiceId = invoiceId,
                InvoiceLineItemNameId = InvoiceLineItemNameId,
                Price = amount,
                Qty = qty,
                Description = description,
                Total = amount * qty,
            };

            await databaseContext.InvoiceLineItems.AddAsync(lineItem);
            await databaseContext.SaveChangesAsync();

            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.InvoiceState = InvoiceState.Active;
                await databaseContext.SaveChangesAsync();
            }

            // recalculate totals
            await RecalculateInvoice(invoiceId);

            return lineItem.Id;
        }

        private async Task RecalculateInvoice(long invoiceId)
        {
            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice == null)
            {
                throw new BadRequestException("Invoice not found");
            }

            // recalculate totals
            decimal BalanceDue = 0.00m;
            decimal Total = 0.00m;
            decimal AmountPaid = 0.00m;

            var lineItems = await databaseContext.InvoiceLineItems.Where(i => i.InvoiceId == invoiceId).ToListAsync();
            foreach (var item in lineItems)
            {
                if (item.PaidDateTime == null)
                {
                    BalanceDue += item.Total;
                }
                else
                {
                    AmountPaid += item.Total;
                }

                Total += item.Total;
            }

            if (BalanceDue == 0)
            {
                invoice.InvoiceState = InvoiceState.Paid;
            }
            else if (BalanceDue > 0)
            {
                invoice.InvoiceState = InvoiceState.Active;
            }

            invoice.AmountDue = Total;
            invoice.BalanceDue = BalanceDue;
            invoice.AmountPaid = AmountPaid;

            await databaseContext.SaveChangesAsync();
        }

        public async Task AssignCompanyToInvoice(AssignCompanyToInvoiceData assignCompany)
        {
            var invoice = await databaseContext.Invoices
                .Where(i => i.Id == assignCompany.InvoiceId)
                .FirstOrDefaultAsync();

            if (invoice != null)
            {
                invoice.CompanyId = assignCompany.CompanyId;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task AssignLocationToInvoice(AssignLocationToInvoiceData assignLocation)
        {
            var invoice = await databaseContext.Invoices
                .Where(i => i.Id == assignLocation.InvoiceId)
                .FirstOrDefaultAsync();

            if (invoice != null)
            {
                invoice.LocationId = assignLocation.LocationId;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<SimpleInvoice> GetInvoiceDetail(long invoiceId, Guid secret)
        {
            var user = await userManagementService.GetSignedInUser();

            var simpleInvoice = new SimpleInvoice();

            var invoice = await databaseContext.Invoices
                .Where(i => i.Id == invoiceId && i.Secret == secret)
                .Include(i => i.Company)
                .Include(i => i.Location)
                .FirstOrDefaultAsync();

            //if (invoice == null)
            //{
            //    throw BadRequestException("Invoice not found");
            //}

            simpleInvoice.Id = invoiceId;
            //simpleInvoice.PaymentGatewayCustomerId = invoice.Location.PaymentGatewayCustomerId;
            //simpleInvoice.InvoicePayments = await databaseContext.InvoicePayments.Where(i => i.InvoiceId == invoiceId).ToListAsync();

            simpleInvoice.InvoiceLineItems =
                await databaseContext.InvoiceLineItems
                .Include(i => i.InvoiceLineItemName)
                .Where(i => i.InvoiceId == invoiceId)
                .Select(i => new InvoiceLineItem()
                {
                    Id = i.Id,
                    Name = i.InvoiceLineItemName.Name,
                    Qty = i.Qty,
                    Price = i.Price,
                    Total = i.Total,
                    InvoiceId = i.InvoiceId,
                    PaidDateTimeString = i.PaidDateTime != null ? i.PaidDateTime.Value.Convert(user.locale).ToShortDateString() : ""
                })
                .ToListAsync();

            simpleInvoice.ClientName = invoice.Company != null ? invoice.Company.Title : null;
            simpleInvoice.LocationName = invoice.Location != null ? (invoice.Location.Address + " " + invoice.Location.City + " " + invoice.Location.State + " " + invoice.Location.ZipCode) : null;

            if (invoice.ShipToLocationId != null)
            {
                var shipToLocation = await databaseContext.Locations.AsNoTracking().Include(c => c.Company).Where(d => d.Id == invoice.ShipToLocationId.Value).FirstOrDefaultAsync();
                if (shipToLocation != null)
                {
                    simpleInvoice.ShipToCompany = shipToLocation.Company.Title;
                    simpleInvoice.ShipToAddress = (shipToLocation.Address + " " + shipToLocation.City + " " + shipToLocation.State + " " + shipToLocation.ZipCode);
                }
            }

            decimal TotalAmountDue = 0.00m;
            if (simpleInvoice.InvoiceLineItems != null)
            {
                foreach (var item in simpleInvoice.InvoiceLineItems)
                {
                    TotalAmountDue += (item.Price * item.Qty);
                }
            }

            simpleInvoice.Total = TotalAmountDue;
            simpleInvoice.InvoiceState = invoice.InvoiceState;
            simpleInvoice.CompanyId = invoice.CompanyId;
            simpleInvoice.LocationId = invoice.LocationId;

            if (invoice != null)
            {
                simpleInvoice.BalanceDue = invoice.BalanceDue;
                simpleInvoice.Total = invoice.AmountDue;
                simpleInvoice.AmountPaid = invoice.AmountPaid;

                // dates
                simpleInvoice.StartDate = invoice.BillingStartDate;
                simpleInvoice.EndDate = invoice.BillingEndDate;
                simpleInvoice.DueDate = invoice.DueDate;

                if (invoice.BillingStartDate != null)
                {
                    simpleInvoice.StringStartDate = invoice.BillingStartDate.Value.ToShortDateString();
                }

                if (invoice.BillingEndDate != null)
                {
                    simpleInvoice.StringEndDate = invoice.BillingEndDate.Value.ToShortDateString();
                }

                if (invoice.DueDate != null)
                {
                    simpleInvoice.StringDueDate = invoice.DueDate.ToShortDateString();
                }
            }
            else
            {
                simpleInvoice.AmountPaid = 0.00m;
            }

            return simpleInvoice;
        }

        // Remove return once debugging payment is complete
        public async Task<long> PayInvoice(long InvoiceId, Guid WalletPaymentMethodId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var invoice = await databaseContext.Invoices.Where(z => z.Id == InvoiceId).FirstOrDefaultAsync();

            if (invoice == null)
            {
                throw new BadRequestException("Invoice does not exist");
            }

            if (invoice.BalanceDue > 0.00m)
            {
                var response = await stripePayService.Charge(signedInUser, new AuthScape.Models.PaymentGateway.Stripe.ChargeParam()
                {
                    WalletPaymentMethodId = WalletPaymentMethodId,
                    Amount = invoice.BalanceDue,
                    PaymentMethodType = AuthScape.StripePayment.Models.PaymentMethodType.Location
                });

                if (response != null)
                {
                    if (response.Success)
                    {
                        invoice.BalanceDue = 0.00m;
                        invoice.InvoiceState = InvoiceState.Paid;
                        await databaseContext.SaveChangesAsync();

                        // update the line items
                        var lineItems = await databaseContext.InvoiceLineItems.Where(i => i.InvoiceId == InvoiceId).ToListAsync();
                        foreach (var item in lineItems)
                        {
                            item.PaidDateTime = SystemTime.Now;
                            item.PaidBy = signedInUser.Id;
                            item.PaymentIntentId = response.StripePaymentIntentId;
                        }
                        await databaseContext.SaveChangesAsync();

                        // recalculate totals
                        await RecalculateInvoice(InvoiceId);

                        // remove return when done debugging
                        return invoice.Id;
                    }
                    if (!response.Success)
                    {
                        // remove return when done debugging
                        return invoice.Id;
                    }
                }
                // remove return when done debugging
                return invoice.Id;
            }
            else
            {
                throw new BadRequestException("Invoice is already paid.");
            }
        }

        public async Task SendInvoice(long invoiceId)
        {
            

            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                string paymentLink = appSettings.LoginRedirectUrl + "/portal/invoice/detail?invoiceId=" + invoice.Id + "&secret=" + invoice.Secret;
                
                if (invoice.CompanyId != null && invoice.LocationId != null)
                {
                    await notificationService.SendInvoice(invoice.CompanyId.Value, invoice.LocationId.Value, new InvoiceEmail()
                    {
                        amountdue = invoice.BalanceDue.ToString("C"),
                        paylink = paymentLink
                    });
                }
            }
        }

        public async Task SetStartDate(long invoiceId, DateTime startDate)
        {
            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.BillingStartDate = startDate;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task SetEndDate(long invoiceId, DateTime endDate)
        {
            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.BillingEndDate = endDate;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task SetDueDate(long invoiceId, DateTime dueDate)
        {
            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.DueDate = dueDate;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<PagedList<Location>> GetLocations(int offset = 1, int length = 10, string locationName = "", long? companyId = null, bool IsActive = true)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            IQueryable<Location> locations = databaseContext.Locations.Include(c => c.Company);

            if (!String.IsNullOrWhiteSpace(locationName))
            {
                locationName = locationName.ToLower();

                locations = locations.Where(c => (c.Address + " " + c.City + ", " + c.State + " " + c.ZipCode).Contains(locationName) && c.Company.IsDeactivated == !IsActive);
            }
            else
            {
                locations = locations.Where(c => c.Company.IsDeactivated == !IsActive);
            }

            //if (signedInUser.Role == Roles.Admin)
            //{
            //    if (companyId != null && companyId != 0)
            //    {
            //        locations = locations.Where(l => l.CompanyId == companyId);
            //    }
            //}
            //else
            //{
                locations = locations.Where(l => l.CompanyId == companyId);
            //}

            var dataLocation = await locations
                .Select(c => new Location()
                {
                    Id = c.Id,
                    Title = c.Title,
                    Address = c.Address,
                    City = c.City,
                    State = c.State,
                    ZipCode = c.ZipCode,
                    //AmountDue = c.Invoices.Where(i => (i.InvoiceState == InvoiceState.Active || i.InvoiceState == InvoiceState.Draft)).Sum(s => s.AmountDue - s.AmountPaid)
                })
                .ToPagedResultAsync(offset - 1, length);

            foreach (var location in dataLocation)
            {
                location.TotalUsers = await databaseContext.UserLocations.Where(u => u.LocationId == location.Id).CountAsync();
                //var userLocations = await databaseContext.UserLocations.Where(u => u.LocationId == location.Id).ToListAsync();
                //foreach (var userLocation in userLocations)
                //{
                //    location.PointOfContact += userLocation.User.FirstName + " " + userLocation.User.LastName + "(" + userLocation.User.UserName + "), ";
                //}
            }

            return dataLocation;
        }

        public async Task<List<InvoiceQueryAutoComplete>> SearchLocation(int offset = 1, int length = 10, string locationName = "", long? companyId = null, bool IsActive = true)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            //if (signedInUser.Role == Roles.Customer)
            //{
            //    throw new BadRequestException("Unauthorized Access");
            //}

            IQueryable<Location> locations = databaseContext.Locations.Include(c => c.Company);

            if (!String.IsNullOrWhiteSpace(locationName))
            {
                locationName = locationName.ToLower();

                locations = locations.Where(c => (c.Address + " " + c.City + ", " + c.State + " " + c.ZipCode).Contains(locationName) && c.Company.IsDeactivated == !IsActive);
            }
            else
            {
                locations = locations.Where(c => c.Company.IsDeactivated == !IsActive);
            }

            //if (signedInUser.Role == Roles.Owner)
            //{
            //    locations = locations.Where(l => l.CompanyId == signedInUser.CompanyId);
            //}

            return await locations
                .Select(c => new InvoiceQueryAutoComplete()
                {
                    id = c.Id,
                    label = c.Address + ", " + c.City + " " + c.State + " " + c.ZipCode
                })
                .ToPagedResultAsync(offset - 1, length);

        }

        public async Task<PagedList<InvoiceLineItemView>> GetLineItems(long InvoiceId, int offset, int pageSize)
        {
            return await databaseContext.InvoiceLineItems
                .Include(i => i.InvoiceLineItemName)
                .Where(i => i.InvoiceId == InvoiceId)
                .Select(i => new InvoiceLineItemView()
                {
                    Id = i.Id,
                    Name = i.InvoiceLineItemName.Name,
                    Description = i.Description,
                    Qty = i.Qty,
                    Price= i.Price,
                    Total = i.Total,
                    PaidDate = i.PaidDateTime
                })
                .ToPagedResultAsync(offset - 1, pageSize);
        }

        public async Task ChangeLineItemValue(LineItemParamChange lineItemParamChange)
        {
            var invoiceLineItem = await databaseContext.InvoiceLineItems
                .Include(i => i.InvoiceLineItemName)
                .Where(l => l.InvoiceId == lineItemParamChange.InvoiceId && l.Id == lineItemParamChange.Id)
                .FirstOrDefaultAsync();

            if (invoiceLineItem != null)
            {
                if (lineItemParamChange.Field == "qty")
                {
                    invoiceLineItem.Qty = Convert.ToInt32(lineItemParamChange.Value);
                }
                else if (lineItemParamChange.Field == "price")
                {
                    invoiceLineItem.Price = Convert.ToDecimal(lineItemParamChange.Value);
                }
                else if (lineItemParamChange.Field == "name")
                {
                    if (lineItemParamChange.Value.ToLower() != invoiceLineItem.InvoiceLineItemName.Name.ToLower())
                    {
                        var invoiceLI = new InvoiceLineItemsName()
                        {
                            Name = lineItemParamChange.Value
                        };

                        await databaseContext.InvoiceLineItemNames.AddAsync(invoiceLI);
                        invoiceLineItem.InvoiceLineItemName = invoiceLI;
                    }
                }
                else if (lineItemParamChange.Field == "description")
                {
                    invoiceLineItem.Description = lineItemParamChange.Value;
                }

                RecalculateTotal(invoiceLineItem);
                await databaseContext.SaveChangesAsync();

                await RecalculateInvoice(invoiceLineItem.InvoiceId);
            }
        }

        private void RecalculateTotal(InvoiceLineItem invoiceLineItem)
        {
            var total = invoiceLineItem.Qty * invoiceLineItem.Price;
            invoiceLineItem.Total = total;
        }

        public async Task SetNote(long InvoiceId, string Note)
        {
            var invoice = await databaseContext.Invoices.Where(i => i.Id == InvoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.Notes = Note;
                await databaseContext.SaveChangesAsync();
            }
        }
    }
}
