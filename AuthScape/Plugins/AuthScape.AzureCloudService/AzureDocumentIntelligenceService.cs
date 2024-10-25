using AuthScape.AzureCloudService.Models.DocumentIntelligence;
using Azure;
using Azure.AI.DocumentIntelligence;

namespace AuthScape.AzureCloudService
{
    public interface IAzureDocumentIntelligenceService
    {
        Task<List<DocumentModel>> GetAllModels();
        Task BuildDocument(DocumentBuildParam param);
    }

    public class AzureDocumentIntelligenceService : IAzureDocumentIntelligenceService
    {
        readonly string apiKey;
        readonly string endpoint;
        public AzureDocumentIntelligenceService(string apiKey, string endpoint)
        {
            this.apiKey = apiKey;
            this.endpoint = endpoint;
        }

        public async Task BuildDocument(DocumentBuildParam param)
        {
            var adminClient = new DocumentIntelligenceAdministrationClient(new Uri(endpoint), new AzureKeyCredential(apiKey));

            var buildRequest = new BuildDocumentModelContent(param.ModelName, DocumentBuildMode.Neural)
            {
                AzureBlobSource = new AzureBlobContentSource(new Uri(param.AzureBlobUri)),
                Description = param.Description,
                AllowOverwrite = true
            };

            var operation = await adminClient.BuildDocumentModelAsync(WaitUntil.Completed, buildRequest, CancellationToken.None);
            var modelDetails = operation.Value;

            Console.WriteLine($"Model ID: {modelDetails.ModelId}");
            Console.WriteLine($"Model Description: {modelDetails.Description}");
            Console.WriteLine($"Model Created On: {modelDetails.CreatedOn}");
        }

        public async Task<List<DocumentModel>> GetAllModels()
        {
            var documentModels = new List<DocumentModel>();

            var adminClient = new DocumentIntelligenceAdministrationClient(new Uri(endpoint), new AzureKeyCredential(apiKey));

            // List models
            AsyncPageable<DocumentModelDetails> models = adminClient.GetModelsAsync();
            await foreach (var modelDetails in models)
            {
                if (!modelDetails.ModelId.Contains("prebuilt-"))
                {
                    documentModels.Add(new DocumentModel()
                    {
                        ModelId = modelDetails.ModelId,
                        CreatedOn = modelDetails.CreatedOn,
                        Description = modelDetails.Description,
                    });
                }
            }

            return documentModels;
        }

        public async Task ReadDocument()
        {
            //var client2 = new DocumentAnalysisClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
        }
    }
}