using AuthScape.Document.Mapping.Models;
using AuthScape.Document.Mapping.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class TestingMappingController : ControllerBase
	{
		readonly IMappingService mappingService;
		public TestingMappingController(IMappingService mappingService)
		{
			this.mappingService = mappingService;
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromForm]UploadMappedFile upload)
		{
			var documentOptions = new DocumentOptions();
			documentOptions.HeaderOptions.AutoDetectHeadersWithAI = true;

            await mappingService.Execute(upload.file, upload.documentComponentId, documentOptions, upload.companyId, upload.locationId, upload.userId, Row: (Row) =>
			{
                //var total = Row.Sales + Row.Rebatable;
                //Row.Vendor = total.ToString();

                //Row.Vendor = "Brandon";
            });


			return Ok();
		}
    }
}