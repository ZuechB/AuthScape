using AuthScape.LuceneSearch;
using AuthScape.LuceneSearch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LuceneTestController : ControllerBase
    {
        readonly ILuceneSearchSevice luceneSearchSevice;
        public LuceneTestController(ILuceneSearchSevice luceneSearchSevice)
        {
            this.luceneSearchSevice = luceneSearchSevice;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string input, string field, int totalResults = 10)
        {
            var result = luceneSearchSevice.Search(input, field, totalResults);


            foreach (var document in result.Documents)
            {

                //document.Document.Get("")
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var docs = new List<LuceneDocument>();



            var doc = new LuceneDocument();

            var field = new LuceneField("name", "value", FieldType.StringField, true);
            field.StoreField = true;

            doc.Add(new LuceneField("name", "value", FieldType.StringField, true));
            
            docs.Add(doc);



            luceneSearchSevice.CreateIndex(docs);

            return Ok();
        }
    }
}
