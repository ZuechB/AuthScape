using Microsoft.EntityFrameworkCore;
using AuthScape.Models.PaymentGateway;
using Services.Context;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public interface IStoreCreditService
    {
        Task AddStoreCredit(decimal amount, string memo, long? companyId = null, long? userId = null);
        Task AddCompanyCredit(decimal amount, string memo, long companyId);
        Task AddGiftCredit(decimal amount, string memo, long? userId = null);
    }

    public class StoreCreditService : IStoreCreditService
    {
        readonly DatabaseContext context;

        public StoreCreditService(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task AddStoreCredit(decimal amount, string memo, long? companyId = null, long? userId = null)
        {
            context.StoreCredits.Add(new StoreCredit()
            {
                StartingAmount = amount,
                ActualAmount = amount,
                Memo = memo,
                CreditType = CreditType.StoreCredit,
                UserId = userId
            });
            await context.SaveChangesAsync();
        }


        /// <summary>
        /// Apply credit to all users within a company
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="memo"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public async Task AddCompanyCredit(decimal amount, string memo, long companyId)
        {
            var users = await context.Users.Where(u => u.CompanyId == companyId).ToListAsync();
            foreach (var usr in users)
            {
                context.StoreCredits.Add(new StoreCredit()
                {
                    StartingAmount = amount,
                    ActualAmount = amount,
                    Memo = memo,
                    CreditType = CreditType.CompanyCredit,
                    UserId = usr.Id
                });
            }
            
            await context.SaveChangesAsync();
        }

        /// <summary>
        /// Send a gift credit to another user
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="memo"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task AddGiftCredit(decimal amount, string memo, long? userId = null)
        {
            context.StoreCredits.Add(new StoreCredit()
            {
                StartingAmount = amount,
                ActualAmount = amount,
                Memo = memo,
                CreditType = CreditType.GiftCredit,
                UserId = userId
            });
            await context.SaveChangesAsync();
        }
    }
}
