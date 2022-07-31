using AuthScape.Models.Exceptions;
using AuthScape.Models.Users;
using CoreBackpack;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AuthScape.Models.PaymentGateway;
using AuthScape.Plugins.Invoices.Models;
using Services.Context;
using Services.Database;
using System.Text;
using AuthScape.StripePayment.Services;
using AuthScape.SendGrid;

namespace Services
{
    public interface IInvoiceService
    {
        Task<PagedList<Invoice>> GetInvoices(int offset = 1, int length = 10, InvoiceState invoiceState = InvoiceState.Open);
        Task CreateLineItem(long invoiceId, long InvoiceLineItemNameId, decimal amount, int qty);
        Task<Tuple<long, Guid>> CreateInvoice(long userId);
        Task<SimpleInvoice> GetInvoiceDetail(long invoiceId, Guid secret);
        Task AssignCompanyToInvoice(AssignCompanyToInvoiceData assignCompany);
        Task<long> CreateLineItem(string name);
        Task<List<InvoiceLineItemsName>> GetListItemNames();
        Task<List<WalletQuery>> GetPaymentMethods();
        Task ArchiveInvoice(long invoiceId);
        Task PayInvoice(long InvoiceId, long walletId);
        Task RemoveLineItem(long id);
        Task SendInvoice(long invoiceId);
    }

    public class InvoiceService : IInvoiceService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userManagementService;
        readonly IStripePayService stripePayService;
        readonly ISendGridService sendGridService;
        readonly AppSettings appSettings;

        public InvoiceService(DatabaseContext databaseContext, IUserManagementService userManagementService, IStripePayService stripePayService, ISendGridService sendGridService, IOptions<AppSettings> appSettings)
        {
            this.databaseContext = databaseContext;
            this.userManagementService = userManagementService;
            this.stripePayService = stripePayService;
            this.sendGridService = sendGridService;
            this.appSettings = appSettings.Value;
        }

        public async Task<List<InvoiceLineItemsName>> GetListItemNames()
        {
            return await databaseContext.InvoiceLineItemNames.ToListAsync();
        }

        public async Task<List<WalletQuery>> GetPaymentMethods()
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var paymentMethods = await databaseContext.Wallets
                .Where(w => w.CompanyId == signedInUser.CompanyId)
                .Select(w => new WalletQuery()
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

        public async Task RemoveLineItem(long id)
        {
            var invoiceLineItem = await databaseContext.InvoiceLineItems.Where(i => i.Id == id).FirstOrDefaultAsync();
            databaseContext.InvoiceLineItems.Remove(invoiceLineItem);
            await databaseContext.SaveChangesAsync();
        }

        public async Task<Tuple<long, Guid>> CreateInvoice(long userId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            if (signedInUser.Roles == Roles.Admin)
            {
                var user = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();

                var invoice = new Invoice()
                {
                    InvoiceState = InvoiceState.InProgress,
                    Created = SystemTime.Now,
                    Total = 0,
                    BalanceDue = 0,
                    InvoiceToUserId = user.Id,
                    CompanyId = user.CompanyId,
                    Secret = Guid.NewGuid()
                };
                await databaseContext.Invoices.AddAsync(invoice);
                await databaseContext.SaveChangesAsync();

                return new Tuple<long, Guid>(invoice.Id, invoice.Secret);
            }
            else
            {
                throw new BadRequestException("Invalid Access");
            }
        }

        public async Task<PagedList<Invoice>> GetInvoices(int offset = 1, int length = 10, InvoiceState invoiceState = InvoiceState.Open)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            return await databaseContext.Invoices
                .Where(i => i.InvoiceState == invoiceState)
                .Include(i => i.Company)
                .OrderByDescending(i => i.Created)
                .OrderByDescending(i => i.InvoiceDueDate)
                .Select(i => new Invoice()
                {
                    Id = i.Id,
                    Total = i.Total,
                    Company = new Company()
                    {
                        Title = i.Company.Title
                    },
                    InvoiceState = i.InvoiceState,
                    CreatedString = i.Created.Convert(signedInUser.locale).ToShortDateString(),
                    DueDateString = i.InvoiceDueDate != null ? i.InvoiceDueDate.Value.Convert(signedInUser.locale).ToShortDateString() : "None",
                    Secret = i.Secret
                })
                .ToPagedResultAsync(offset - 1, length);
        }

        public async Task CreateLineItem(long invoiceId, long InvoiceLineItemNameId, decimal amount, int qty)
        {
            await databaseContext.InvoiceLineItems.AddAsync(new InvoiceLineItem()
            {
                InvoiceId = invoiceId,
                InvoiceLineItemNameId = InvoiceLineItemNameId,
                Price = amount,
                Qty = qty,
                Total = amount * qty
            });
            await databaseContext.SaveChangesAsync();

            var invoice = await databaseContext.Invoices.Where(i => i.Id == invoiceId).FirstOrDefaultAsync();
            if (invoice != null)
            {
                invoice.InvoiceState = InvoiceState.Open;
                await databaseContext.SaveChangesAsync();
            }

            // recalculate totals
            await RecalculateInvoice(invoiceId);
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
                invoice.InvoiceState = InvoiceState.Open;
            }

            invoice.Total = Total;
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

        public async Task<SimpleInvoice> GetInvoiceDetail(long invoiceId, Guid secret)
        {
            var user = await userManagementService.GetSignedInUser();

            var simpleInvoice = new SimpleInvoice();

            var invoice = await databaseContext.Invoices
                .Where(i => i.Id == invoiceId && i.Secret == secret)
                .Include(i => i.Company)
                .FirstOrDefaultAsync();

            //if (invoice == null)
            //{
            //    throw BadRequestException("Invoice not found");
            //}

            simpleInvoice.Id = invoiceId;
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

            if (invoice != null)
            {
                simpleInvoice.BalanceDue = invoice.BalanceDue;
                simpleInvoice.Total = invoice.Total;
                simpleInvoice.AmountPaid = invoice.AmountPaid;
            }
            else
            {
                simpleInvoice.AmountPaid = 0.00m;
            }

            return simpleInvoice;
        }

        public async Task PayInvoice(long InvoiceId, long walletId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var invoice = await databaseContext.Invoices.Where(z => z.Id == InvoiceId && z.CompanyId == signedInUser.CompanyId).FirstOrDefaultAsync();
            if (invoice == null)
            {
                throw new BadRequestException("Invoice does not exist");
            }

            if (invoice.BalanceDue > 0.00m)
            {
                var response = await stripePayService.Charge(new AuthScape.Models.PaymentGateway.Stripe.ChargeParam()
                {
                    walletId = walletId,
                    chargeAmount = invoice.BalanceDue
                });

                if (response != null)
                {
                    if (response.Success)
                    {
                        invoice.BalanceDue = 0.00m;
                        invoice.PaidById = signedInUser.Id;
                        invoice.WhenPaid = SystemTime.Now;
                        invoice.WalletId = walletId;
                        invoice.InvoiceState = InvoiceState.Paid;
                        await databaseContext.SaveChangesAsync();

                        // update the line items
                        var lineItems = await databaseContext.InvoiceLineItems.Where(i => i.InvoiceId == InvoiceId).ToListAsync();
                        foreach (var item in lineItems)
                        {
                            item.PaidDateTime = SystemTime.Now;
                            item.PaidBy = signedInUser.Id;
                        }
                        await databaseContext.SaveChangesAsync();

                        // recalculate totals
                        await RecalculateInvoice(InvoiceId);
                    }
                }
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
                var company = await databaseContext.Companies
                    .Include(c => c.Users)
                    .Where(c => c.Id == invoice.CompanyId)
                    .FirstOrDefaultAsync();

                if (company != null)
                {
                    await sendGridService.Send(company.Users.Where(u => u.IsActive).ToList(), appSettings.InvoiceAppSetting.InvoiceTemplateId, new InvoiceEmail()
                    {
                        amountdue = invoice.BalanceDue.ToString("C"),
                        paylink = "https://google.com"
                    });
                }
            }
        }
    }
}
