using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace AuthScape.Spreadsheet.Controller.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class JiraController : ControllerBase
    {
        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    string summaryTasks = "Create a summary of all the tasks completed by the development teams sprint only display markdown code. ";
        //    using (var client2 = new HttpClient())
        //    {
        //        var byteArray = new System.Text.ASCIIEncoding().GetBytes($"{username}:{password}");
        //        client2.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

        //        var requestUri = $"{jiraBaseUrl}/rest/api/2/search?jql=project='KAN' AND status='Done' AND sprint='1'&maxResults=10000";
        //        var response2 = await client2.GetAsync(requestUri);
        //        response2.EnsureSuccessStatusCode();

        //        var content = await response2.Content.ReadAsStringAsync();
        //        var issues = JsonConvert.DeserializeObject<Issues>(content);


        //        foreach (var issue in issues.issues)
        //        {
        //            summaryTasks += "- " + issue.fields.summary;
        //        }
        //    }

        //    //Set up the Ollama client
        //    var client = new OllamaClient("http://localhost:11434");

        //    //Chat completion
        //    ChatMessageHistory messages = [];

        //    messages.AddUserMessage(summaryTasks);

        //    ChatCompletionResponse response = await client.ChatCompletionAsync("llama3.2", messages);

        //    Console.WriteLine(response.Message.Content);

        //    return Ok();
        //}
    }
}