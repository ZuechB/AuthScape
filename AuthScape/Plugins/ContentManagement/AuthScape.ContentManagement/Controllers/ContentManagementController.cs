using AuthScape.ContentManagement.Models;
using AuthScape.ContentManagement.Services;
using AuthScape.Models.Pages;
using CoreBackpack.URL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> SavePageContent(EditorChanges editorChanges)
        {
            await contentManagementService.SaveChanges(editorChanges);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadAsset(IFormFile file)
        {
            var uploadedFile = new UploadedAsset();

            if (file == null || file.Length == 0)
                return BadRequest("Upload a valid file.");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            uploadedFile = new UploadedAsset
            {
                url = $"http://localhost:54218/images/{file.FileName}", // URL relative to the web root,
                name = file.FileName,
                type = file.ContentType,
                height = 300,  // You might need to get actual dimensions
                width = 300    // You might need to get actual dimensions
            };

            return Ok(uploadedFile);
        }
    }
}
