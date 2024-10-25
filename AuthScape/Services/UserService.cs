using AuthScape.Models.Users;
using CoreBackpack;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Context;

namespace Services
{
    public interface IUserService
    {
        Task RestoreAccount(long userId);
        Task ArchiveAccount(long userId);
        Task<AppUser?> GetUser(long userId);
        Task<PagedList<UserSummary>> GetAllUsers(int offset = 1, int length = 10, int userState = 0);
    }

    public class UserService : IUserService
    {
        readonly DatabaseContext databaseContext;

        public UserService(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<PagedList<UserSummary>> GetAllUsers(int offset = 1, int length = 10, int userState = 0)
        {
            IQueryable<AppUser> users = databaseContext.Users;
            if (userState == 0) // Active
            {
                users = users.Where(u => u.IsActive);
            }
            else if (userState == 1) // Archive
            {
                users = users.Where(u => !u.IsActive);
            }

            return await users
                .Include(i => i.Company)
                .Select(i => new UserSummary()
                {
                    Id = i.Id,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.UserName,
                    Phone = i.PhoneNumber,
                    Created = i.Created.DateTime.ToShortDateString()
                })
                .ToPagedResultAsync(offset - 1, length);
        }

        public async Task RestoreAccount(long userId)
        {
            var usr = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (usr != null)
            {
                usr.IsActive = true;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task ArchiveAccount(long userId)
        {
            var usr = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (usr != null)
            {
                usr.IsActive = false;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<AppUser?> GetUser(long userId)
        {
            return await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<AppUser?> EditUser(long userId)
        {
            return await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
        }
    }
}