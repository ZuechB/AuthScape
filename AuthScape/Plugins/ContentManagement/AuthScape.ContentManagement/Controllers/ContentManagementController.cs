using AuthScape.ContentManagement.Models;
using AuthScape.ContentManagement.Services;
using AuthScape.Models.Pages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.DocumentReader.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public  class ContentManagementController : ControllerBase
    {
        readonly IContentManagementService contentManagementService;
        public ContentManagementController(IContentManagementService contentManagementService)
        {
            this.contentManagementService = contentManagementService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreatePage(Page page)
        {
            return Ok(await contentManagementService.CreatePage(page));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var page = await contentManagementService.GetPage(id);
            return Ok(page);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetPages()
        {
            return Ok(await contentManagementService.GetAllPages());
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(long Id)
        {
            await contentManagementService.DeletePage(Id);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task SavePageContent(EditorChanges editorChanges)
        {
            await contentManagementService.SaveChanges(editorChanges);
        }
    }
}
