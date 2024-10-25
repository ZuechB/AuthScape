using AuthScape.ReadMail;
using AuthScape.SendGrid;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestEmailController : ControllerBase
    {
        readonly IReadMailService _readMailService;
        readonly ISendGridService sendGridService;
        public TestEmailController(IReadMailService _readMailService, ISendGridService sendGridService)
        {
            this._readMailService = _readMailService;
            this.sendGridService = sendGridService;
        }



        [HttpGet]
        public async Task<IActionResult> AuthenticateExchange()
        {
            var authResult = await _readMailService.GetPublicClientOAuth2AccessTokenAsync("IMAP", "email-here");
            return Ok(authResult);
        }

        [HttpGet]
        public async Task<string> GetAccessTokenAsync(string code)
        {
            var values = new Dictionary<string, string>
            {
                { "client_id", "clientId" },
                { "scope", "https://graph.microsoft.com/.default" },
                { "code", code },
                { "redirect_uri", "http://localhost:54218/api/TestEmail/GetAccessToken" },
                { "grant_type", "authorization_code" },
                { "client_secret", "secretId" }
            };

            var content = new FormUrlEncodedContent(values);

            var tenant = "tenantId";

            using var client = new HttpClient();
            var response = await client.PostAsync($"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token", content);
            var responseString = await response.Content.ReadAsStringAsync();

            // Parse the response to extract the access token
            var tokenResponse = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseString);
            return tokenResponse["access_token"];
        }





    [HttpGet]
        public async Task<IActionResult> GetEmails()
        {
            return Ok(await _readMailService.ReadMail());
        }

        [HttpPost]
        public async Task<IActionResult> TestEmailAnalytics()
        {
            await sendGridService.IncomingAnalytics();
            return Ok();
        }
    }
}
