using Microsoft.EntityFrameworkCore;
using Services.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Services
{
    public interface IRoleService
    {
        Task AddRole(string name);
        Task DeleteRole(long Id);
        Task ChangeName(long Id, string name);
    }

    public class RoleService : IRoleService
    {
        readonly DatabaseContext context;
        public RoleService(DatabaseContext context) 
        {
            this.context = context;
        }

        public async Task AddRole(string name)
        {
            var newRole = new Models.Users.Role()
            {
                Name = name,
                NormalizedName = name.ToLower(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };

            await context.Roles.AddAsync(newRole);
            await context.SaveChangesAsync();
        }

        public async Task DeleteRole(long Id)
        {
            var role = await context.Roles.Where(r => r.Id == Id).FirstOrDefaultAsync();
            if (role != null)
            {
                context.Roles.Remove(role);
                await context.SaveChangesAsync();
            }
        }

        public async Task ChangeName(long Id, string name)
        {
            var role = await context.Roles.Where(r => r.Id == Id).FirstOrDefaultAsync();
            if (role != null)
            {
                role.Name = name;
                await context.SaveChangesAsync();
            }
        }
    }
}
