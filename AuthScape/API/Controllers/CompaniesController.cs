using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthScape.Models.Companies;
using AuthScape.Models.Users;
using OpenIddict.Validation.AspNetCore;
using Services;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class CompaniesController : ControllerBase
    {
        readonly ICompaniesService CompaniesService;
        public CompaniesController(ICompaniesService CompaniesService)
        {
            this.CompaniesService = CompaniesService;
        }

        [HttpPut]
        public async Task<IActionResult> Put(Company nCACompany)
        {
            await CompaniesService.CreateCompany(nCACompany);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post(CompanyParam companyParam)
        {
            var companies = await CompaniesService.GetCompanies(companyParam.offset, companyParam.length, companyParam.companyName);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = companies.total,
                recordsFiltered = companies.total,
                data = companies.ToList()
            });
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await CompaniesService.GetCompany(id));
        }

        [HttpGet("GetCompanyByName")]
        public async Task<IActionResult> Get(string companyName)
        {
            return Ok(await CompaniesService.GetCompanyByName(companyName));
        }
    }
}
