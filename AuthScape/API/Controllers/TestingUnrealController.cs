using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestingUnrealController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var responseList = new List<UnrealResponse>();
            for (int i = 0; i < 50; i++)
            {
                responseList.Add(new UnrealResponse()
                {
                    Name = "The name " + i,
                    Description = "about this" + i,
                    Price = i
                });
            }

            return Ok(responseList);
        }
    }

    public class UnrealResponse
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
