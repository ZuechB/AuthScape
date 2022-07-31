using AuthScape.Models.Users;
using CoreBackpack;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Services.Context;

namespace Services
{
    public interface IUserService
    {
        Task<PagedList<UserSummary>> GetAllUsers(int offset = 1, int length = 10, int userState = 0);
    }

    public class UserService : IUserService
    {
        readonly IHttpContextAccessor httpContextAccessor;
        readonly DatabaseContext databaseContext;

        public UserService(IHttpContextAccessor httpContextAccessor, DatabaseContext databaseContext)
        {
            this.httpContextAccessor = httpContextAccessor;
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
                    Created = i.Created.DateTime.ToShortDateString()
                })
                .ToPagedResultAsync(offset - 1, length);
        }
    }
}
