using AuthScape.AzureCloudService;
using AuthScape.AzureCloudService.Models.DocumentIntelligence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AzureDocumentIntelligenceTestController : ControllerBase
    {
        readonly IAzureDocumentIntelligenceService azureDocumentIntelligenceService;
        public AzureDocumentIntelligenceTestController(IAzureDocumentIntelligenceService azureDocumentIntelligenceService)
        {
            this.azureDocumentIntelligenceService = azureDocumentIntelligenceService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var models = await azureDocumentIntelligenceService.GetAllModels();
            return Ok(models);
        }

        [HttpPost]
        public async Task<IActionResult> Post(DocumentBuildParam param)
        {
            await azureDocumentIntelligenceService.BuildDocument(param);
            return Ok();
        }
    }
}
