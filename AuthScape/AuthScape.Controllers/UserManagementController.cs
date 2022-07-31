using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using Services;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class UserManagementController : ControllerBase
    {
        readonly IUserManagementService userManagementService;
        public UserManagementController(IUserManagementService userManagementService)
        {
            this.userManagementService = userManagementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(long id)
        {
            return Ok(await userManagementService.GetUser(id));
        }

        [HttpGet]
        public IActionResult GetAllRoles()
        {
            return Ok(userManagementService.GetAllRoles());
        }

        [HttpPut]
        public async Task<IActionResult> RestoreUser([FromQuery]long userId)
        {
            await userManagementService.RestoreAccount(userId);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> ArchiveUser([FromQuery]long userId)
        {
            await userManagementService.ArchiveAccount(userId);
            return Ok();
        }
    }
}
