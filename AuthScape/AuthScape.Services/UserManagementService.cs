using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using Services.Context;
using Microsoft.EntityFrameworkCore;
using AuthScape.Models.Users;
using System.Collections.Generic;
using CoreBackpack;

namespace Services
{
    public interface IUserManagementService
    {
        Task<AppUser> GetSignedInUser();
        
        List<QueryRole> GetAllRoles();
        Task RestoreAccount(long userId);
        Task ArchiveAccount(long userId);
        Task<AppUser?> GetUser(long userId);
    }

    public class UserManagementService : IUserManagementService
    {
        readonly IHttpContextAccessor httpContextAccessor;
        readonly DatabaseContext databaseContext;

        public UserManagementService(IHttpContextAccessor httpContextAccessor, DatabaseContext databaseContext)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.databaseContext = databaseContext;
        }

        public async Task<AppUser> GetSignedInUser()
        {
            var identity = httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.IsAuthenticated)
            {
                var sub = identity.Claims.Where(c => c.Type == "sub").FirstOrDefault();
                if (sub != null)
                {
                    var userId = Convert.ToInt64(sub.Value);

                    var usr = await databaseContext.Users.Include(u => u.Company).AsNoTracking().Where(u => u.Id == userId).FirstOrDefaultAsync();
                    if (usr != null)
                    {
                        return usr;
                    }
                }
            }

            return null;
        }

        public List<QueryRole> GetAllRoles()
        {
            var roles = new List<QueryRole>();

            Array enumValueArray = Enum.GetValues(typeof(Roles));
            foreach (int enumValue in enumValueArray)
            {
                roles.Add(new QueryRole()
                {
                    Id = enumValue,
                    Name = (Enum.GetName(typeof(Roles), enumValue))
                });
            }

            return roles;
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

        //public async Task<List<Role>> GetAllRoles()
        //{
        //    return await databaseContext.Roles.ToListAsync();
        //}
    }
}
