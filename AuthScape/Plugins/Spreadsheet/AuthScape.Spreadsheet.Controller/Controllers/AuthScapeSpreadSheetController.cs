using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using AuthScape.Spreadsheet.Models.Hubs;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Services.Database;
using Microsoft.Extensions.Options;

namespace AuthScape.Spreadsheet.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthScapeSpreadSheetController : ControllerBase
    {
        readonly IHubContext<SpreadsheetHub> _hub;
        readonly ISpreadsheetService spreadsheetService;
        readonly AppSettings appSettings;
        public AuthScapeSpreadSheetController(IHubContext<SpreadsheetHub> hub, ISpreadsheetService spreadsheetService, IOptions<AppSettings> appSettings)
        {
            this.spreadsheetService = spreadsheetService;
            _hub = hub;
            this.appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult GetActiveSessions(Guid documentId)
        {
            return Ok(SpreadsheetHub.CurrentConnections.Where(d => d != null && d.DocumentId == documentId).ToList());
        }

        [HttpPost]
        public async Task<IActionResult> RemoveBackground(UploadPhotoParam param)
        {
            string subscriptionKey = appSettings.Spreadsheet.AzureVisionKey;
            string endpoint = appSettings.Spreadsheet.AzureVisionEndpoint;
            string requestParameters = "mode=backgroundRemoval&api-version=2023-02-01-preview";

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            string uri = endpoint + "/computervision/imageanalysis:segment?" + requestParameters;


            if (param.File != null)
            {
                var sourceStream = param.File.OpenReadStream();

                using (var memoryStream = new MemoryStream())
                {
                    sourceStream.CopyTo(memoryStream);

                    // take the file and save it on our blob temp
                    using (var content = new ByteArrayContent(memoryStream.ToArray()))
                    {
                        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                        var response = await client.PostAsync(uri, content);
                        var imageBytes = await response.Content.ReadAsByteArrayAsync();

                        return File(imageBytes, "image/png");
                    }
                }
                
            }
            else if (param.Url != null)
            {
                string requestBody = JsonConvert.SerializeObject(new { url = param.Url });
                byte[] byteData = Encoding.UTF8.GetBytes(requestBody);

                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    var response = await client.PostAsync(uri, content);
                    var imageBytes = await response.Content.ReadAsByteArrayAsync();

                    return File(imageBytes, "image/png");
                }
            }

            return BadRequest("No data provided");
        }
    }

    public class UploadPhotoParam
    {
        public IFormFile? File { get; set; }
        public string? Url { get; set; }
    }
}