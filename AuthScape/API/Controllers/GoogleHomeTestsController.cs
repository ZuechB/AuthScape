using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleHomeTestsController : ControllerBase
    {
        //readonly IGoogleHome googleHome;
        //public GoogleHomeTestsController(IGoogleHome googleHome)
        //{
        //    this.googleHome = googleHome;
        //}

        [HttpGet]
        public async Task<IActionResult> GetDevices()
        {
            return Ok();
            //return Ok(googleHome.ListDevices());
        }
    }
}
