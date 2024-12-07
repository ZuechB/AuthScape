using AuthScape.Marketplace.Models;
using AuthScape.Marketplace.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace AuthScape.Marketplace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        readonly IMarketplaceService marketplaceService;
        public ProductsController(IMarketplaceService marketplaceService)
        {
            this.marketplaceService = marketplaceService;
        }

        [HttpGet("search")]
        public ActionResult<List<MarketplaceProduct>> Search([FromQuery] string[] colors, [FromQuery] string[] categories, [FromQuery] string[] sizes)
        {
            var results = marketplaceService.SearchProducts(colors, categories, sizes);
            return Ok(results);
        }


        [HttpGet("index")]
        public ActionResult<List<MarketplaceProduct>> Index()
        {
            var products = new List<MarketplaceProduct> {
                new MarketplaceProduct { Id = "1", Color = "Red", Category = "Shirt", Size = "M" },
                new MarketplaceProduct { Id = "2", Color = "Blue", Category = "Jeans", Size = "L" }
            };

            marketplaceService.IndexProducts(products);
            return Ok();
        }
    }

}
