using AuthScape.AzureOpenAI.Models;
using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Identity.Client;
using OpenAI.Chat;

namespace AzureOpenAI
{
    public interface IAzureOpenAIService
    {
        Task<IReadOnlyList<ChatMessageContentPart>> Generate(List<Message> chatMessages);
    }

    public class AzureOpenAIService : IAzureOpenAIService
    {
        public async Task<IReadOnlyList<ChatMessageContentPart>> Generate(List<Message> chatMessages)
        {
            //string connectionString = "your-connection-string";
            //string query = "SELECT * FROM Orders WHERE CustomerID = @CustomerID";
            //List<Order> orders = new List<Order>();

            //using (SqlConnection connection = new SqlConnection(connectionString))
            //{
            //    SqlCommand command = new SqlCommand(query, connection);
            //    command.Parameters.AddWithValue("@CustomerID", customerId);

            //    connection.Open();
            //    SqlDataReader reader = command.ExecuteReader();

            //    while (reader.Read())
            //    {
            //        orders.Add(new Order
            //        {
            //            OrderID = reader["OrderID"].ToString(),
            //            OrderDate = Convert.ToDateTime(reader["OrderDate"]),
            //            OrderStatus = reader["OrderStatus"].ToString()
            //        });
            //    }
            //}

            //string prompt = "Here is the order information for customer ID " + customerId + ":\n";
            //foreach (var order in orders.Take(50)) // Process in batches of 50
            //{
            //    prompt += $"OrderID: {order.OrderID}, Date: {order.OrderDate}, Status: {order.OrderStatus}\n";
            //}
            //prompt += "Please summarize the order status for the customer.";

            var client = new AzureOpenAIClient(new Uri("https://axiomnaopenai.openai.azure.com"), new DefaultAzureCredential());
            var chatClient = client.GetChatClient("gpt-4");


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
            
            var response = await chatClient.CompleteChatAsync(messages, new ChatCompletionOptions()
            {

            });

            return response.Value.Content;
        }
    }
}