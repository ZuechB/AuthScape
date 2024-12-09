using AuthScape.Marketplace.Models;
using AuthScape.Marketplace.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace AuthScape.Marketplace.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MarketplaceController : ControllerBase
    {
        readonly IMarketplaceService marketplaceService;
        public MarketplaceController(IMarketplaceService marketplaceService)
        {
            this.marketplaceService = marketplaceService;
        }

        [HttpGet]
        //public IActionResult Search([FromQuery] string[] colors, [FromQuery] string[] categories, [FromQuery] string[] sizes)
        public async Task<IActionResult> Search([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
        {
            var results = await marketplaceService.SearchProducts(pageNumber, pageSize);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            await marketplaceService.IndexProducts();
            return Ok();
        }
    }
}