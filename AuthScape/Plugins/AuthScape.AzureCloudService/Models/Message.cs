namespace AuthScape.AzureOpenAI.Models
{
    public class Message
    {
        public ChatMessageType Type { get; set; }
        public string Content { get; set; }
    }

    public enum ChatMessageType
    {
        SystemMessage = 1,
        UserMessage = 2
    }
}
