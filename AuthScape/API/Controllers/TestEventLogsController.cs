using AuthScape.Logging.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestEventLogsController : ControllerBase
    {
        readonly ILogService logService;
        public TestEventLogsController(ILogService logService)
        {
            this.logService = logService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string messsage)
        {
            await logService.Info(messsage);
            return Ok();
        }   
    }
}
