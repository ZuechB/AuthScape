using AuthScape.AzureCloudService.Models;
using AuthScape.AzureOpenAI.Models;
using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;
using OpenAI.Chat;
using System.ClientModel;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AuthScape.AzureCloudService
{
    public interface IAzureOpenAIService
    {
        AsyncCollectionResult<StreamingChatCompletionUpdate> Generate(string endpoint, string deploymentName, List<Message> chatMessages);
    }

    public class AzureOpenAIService : AzureBaseService, IAzureOpenAIService
    {
        readonly IHttpContextAccessor _contextAccessor;

        public AzureOpenAIService(IHttpContextAccessor _contextAccessor)
        {
            this._contextAccessor = _contextAccessor;
        }

        public AsyncCollectionResult<StreamingChatCompletionUpdate> Generate(string endpoint, string deploymentName, List<Message> chatMessages)
        {
            var client = new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential());
            var chatClient = client.GetChatClient(deploymentName);

            var messages = new List<ChatMessage>();
            foreach (var message in chatMessages)
            {
                if (message.Type == ChatMessageType.SystemMessage)
                {
                    messages.Add(new SystemChatMessage(message.Content));
                }
                else if (message.Type == ChatMessageType.UserMessage)
                {
                    messages.Add(new UserChatMessage(message.Content));
                }
            }

            
            return chatClient.CompleteChatStreamingAsync(messages, new ChatCompletionOptions()
            {

            });
        }
    }
}