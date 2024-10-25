using Authscape.IdentityServer.Models;
using Authscape.IdentityServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace Authscape.IdentityServer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class IdentityServerController : ControllerBase
    {
        readonly IIdentityServerService identityServerService;
        public IdentityServerController(IIdentityServerService identityServerService)
        {
            this.identityServerService = identityServerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetApplications()
        {
            return Ok(await identityServerService.GetApplications());
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication(IdentityCreateApplication identityCreate)
        {
            await identityServerService.CreateApplication(identityCreate);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetApplication(string applicationId)
        {
            return Ok(await identityServerService.GetApplication(applicationId));
        }

        [HttpPost]
        public async Task<IActionResult> GenerateCredentials()
        {
            return Ok();
        }

    }
}