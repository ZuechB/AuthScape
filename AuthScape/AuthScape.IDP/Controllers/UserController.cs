using Microsoft.AspNetCore.Mvc;

namespace IDP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                id = 1,
                firstName = "Brandon",
                lastName = "Zuech"
            });
        }
    }
}