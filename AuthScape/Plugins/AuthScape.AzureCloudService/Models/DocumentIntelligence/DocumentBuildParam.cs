using System.Globalization;

namespace AuthScape.AzureCloudService.Models.DocumentIntelligence
{
    public class DocumentBuildParam
    {
        public string AzureBlobUri { get; set; }
        public string ModelName { get; set; }
        public string Description { get; set; }
    }
}