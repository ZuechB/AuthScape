using CoreBackpack;
using Microsoft.EntityFrameworkCore;
using AuthScape.Models.Users;
using Services.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public interface ICompaniesService
    {
        Task CreateCompany(Company nCACompany);
        Task<PagedList<Company>> GetCompanies(int offset = 1, int length = 10, string companyName = "");
        Task<List<Company>> GetCompany(long id);
        Task<List<NCACompanyQuery>> GetCompanyByName(string name);
    }

    public class CompaniesService : ICompaniesService
    {
        readonly DatabaseContext databaseContext;
        public CompaniesService(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task CreateCompany(Company nCACompany)
        {
            await databaseContext.Companies.AddAsync(nCACompany);
            await databaseContext.SaveChangesAsync();
        }

        public async Task<PagedList<Company>> GetCompanies(int offset = 1, int length = 10, string companyName = "")
        {
            if (!String.IsNullOrWhiteSpace(companyName))
            {
                companyName = companyName.ToLower();
                return await databaseContext.Companies.Where(c => c.Title.Contains(companyName)).ToPagedResultAsync(offset - 1, length);
            }
            else
            {
                return await databaseContext.Companies.ToPagedResultAsync(offset - 1, length);
            }
        }

        public async Task<List<Company>> GetCompany(long id)
        {
            return await databaseContext.Companies
                .Where(n => n.Id == id)
                .ToListAsync();
        }

        public async Task<List<NCACompanyQuery>> GetCompanyByName(string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                name = name.ToLower();
                return await databaseContext.Companies
                    .Where(n => n.Title.Contains(name))
                    .Select(n => new NCACompanyQuery()
                    {
                        id = n.Id,
                        label = n.Title
                    })
                    .ToListAsync();
            }
            else
            {
                return new List<NCACompanyQuery>();
            }
        }
    }
}
