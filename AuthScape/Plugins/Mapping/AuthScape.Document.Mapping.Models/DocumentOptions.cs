namespace AuthScape.Document.Mapping.Models
{
    public class DocumentOptions
    {
        public DocumentOptions()
        {
            HeaderOptions = new ChatGPTDocumentOption();
        }

        public bool WriteToDatabaseAutomatically { get; set; } = true;
        public bool EnablePDFAndPhotoReading { get; set; } = false;
        public string AzureModuleId { get; set; } = "prebuilt-invoice";
        public ChatGPTDocumentOption HeaderOptions { get; set; }
    }

    public class ChatGPTDocumentOption
    {
        public bool AutoDetectHeadersWithAI { get; set; } = false;
        public int RowsToTrain { get; set; } = 50;
    }
}