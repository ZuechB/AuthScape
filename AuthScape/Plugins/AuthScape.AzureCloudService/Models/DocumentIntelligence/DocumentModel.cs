namespace AuthScape.AzureCloudService.Models.DocumentIntelligence
{
    public class DocumentModel
    {
        public string ModelId { get; set; }
        public string Description { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
    }
}