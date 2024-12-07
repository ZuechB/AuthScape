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
        public IActionResult Search([FromQuery] string[] colors, [FromQuery] string[] categories, [FromQuery] string[] sizes)
        {
            var results = marketplaceService.SearchProducts(colors, categories, sizes);
            return Ok(results);
        }

        [HttpGet]
        public IActionResult Index()
        {
            marketplaceService.IndexProducts();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetMarketplace()
        {
            return Ok(await marketplaceService.GetMarketplace());
        }

    }
}