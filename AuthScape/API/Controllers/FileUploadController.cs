using AuthScape.Models.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using System.Threading.Tasks;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
	public class FileUploadController : ControllerBase
	{
		[HttpPost]
		[RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
		[RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
		public async Task<IActionResult> Post([FromForm] FileStorage file)
		{
			return Ok();
		}
	}
}
