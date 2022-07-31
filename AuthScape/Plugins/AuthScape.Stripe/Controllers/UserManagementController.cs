using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using Services;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class UserManagementController : ControllerBase
    {
        readonly IUserManagementService userService;

        public UserManagementController(IUserManagementService userService)
        {
            this.userService = userService;
        }

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    return Ok(await userService.GetAllUsers());
        //}

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var signedInUser = await userService.GetSignedInUser();
            if (signedInUser == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(new
                {
                    firstName = signedInUser.FirstName,
                    lastName = signedInUser.LastName,
                    email = signedInUser.Email
                });
            }
        }
    }
}
