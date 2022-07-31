using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthScape.Models.Users;
using OpenIddict.Validation.AspNetCore;
using Services;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        readonly IUserService userService;
        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAllUsers(UserParam param)
        {
            var users = await userService.GetAllUsers(param.offset, param.length, param.userState);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = users.total,
                recordsFiltered = users.total,
                data = users.ToList()
            });
        }
    }
}