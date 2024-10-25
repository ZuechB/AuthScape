using Microsoft.Extensions.Options;
using OpenAI.Chat;
using OpenAI;
using Services.Database;

namespace AuthScape.OpenAI
{
	public interface IOpenAIService
    {
		Task<string> GenerateRawMessage(List<ChatMessage> messages);
		Task<string> GenerateWebPage(string aboutWebPage);
		Task<string> TranslateMessage(string message);
		Task<string?> GeneratePhoto(string message);
		Task<string> KeywordExtraction(string message);
		string TrimTextBasedOnTokens(string inputText, int limitTokens = 50);

    }

	public class OpenAIService : IOpenAIService
    {
		readonly AppSettings appSettings;
		public OpenAIService(IOptions<AppSettings> appSettings)
		{
			this.appSettings = appSettings.Value;
		}

		public async Task<string> GenerateRawMessage(List<ChatMessage> messages)
		{
			//var client = new OpenAIAPI(appSettings.OpenAI.APIKey);

			//var result = await client.Chat.CreateChatCompletionAsync(new ChatRequest()
			//{
			//	Model = Model.ChatGPTTurbo,
			//	Messages = messages
			//});

			//var choice = result.Choices.FirstOrDefault();
			//return choice.Message.TextContent;
			return "";
		}

		public async Task<string> GenerateWebPage(string aboutWebPage)
		{
			var messages = new List<ChatMessage>();
			//messages.Add(new ChatMessage()
			//{
			//	Role = ChatMessageRole.System,
			//	TextContent = "You are a single page web page builder."
			//});
			//messages.Add(new ChatMessage()
			//{
			//	Role = ChatMessageRole.User,
   //             TextContent = aboutWebPage
			//});
			return await GenerateRawMessage(messages);
		}

		public async Task<string> TranslateMessage(string message)
		{
			var messages = new List<ChatMessage>();
			//messages.Add(new ChatMessage()
			//{
			//	Role = ChatMessageRole.System,
   //             TextContent = "You are a translator."
			//});
			//messages.Add(new ChatMessage()
			//{
			//	Role = ChatMessageRole.User,
   //             TextContent = message
			//});
			return await GenerateRawMessage(messages);
		}

		public async Task<string?> GeneratePhoto(string message)
		{
			//string apiKey = appSettings.OpenAI.APIKey;
			//var client = new OpenAIAPI(apiKey);

			//var result = await client.ImageGenerations.CreateImageAsync(new ImageGenerationRequest(message, 1, ImageSize._512));

			//var data = result.Data.FirstOrDefault();
			//if (data != null)
			//{
			//	return data.Url;
			//}

			return null;
		}

        public string TrimTextBasedOnTokens(string inputText, int limitTokens = 50)
        {
			//1 token ~= 4 chars in English
			return new String(inputText.Take(limitTokens * 4).ToArray());
        }

        public async Task<string> KeywordExtraction(string message)
    {
        var messages = new List<ChatMessage>();
        //messages.Add(new ChatMessage()
        //{
        //    Role = ChatMessageRole.System,
        //    TextContent = "You will be provided with a block of text, and your task is to extract a list of keywords from it."
        //});
        //messages.Add(new ChatMessage()
        //{
        //    Role = ChatMessageRole.User,
        //    TextContent = message
        //});
        return await GenerateRawMessage(messages);
    }
	}
}