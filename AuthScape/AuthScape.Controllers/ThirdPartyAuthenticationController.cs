using AuthScape.Models.Authentication;
using AuthScape.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class ThirdPartyAuthenticationController : ControllerBase
    {
        readonly IUserManagementService userManagementService;
        public ThirdPartyAuthenticationController(IUserManagementService userManagementService)
        {
            this.userManagementService = userManagementService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateConnection(ThirdPartyAuthentication thirdPartyAuthentication)
        {


            return Ok();
        }
    }
}
