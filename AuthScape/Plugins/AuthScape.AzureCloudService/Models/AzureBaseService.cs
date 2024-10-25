using Microsoft.Identity.Client;

namespace AuthScape.AzureCloudService.Models
{
    public class AzureBaseService
    {
        public async Task<string> GetAccessToken(string tenantID, string clientID, string clientSecret)
        {
            var scopes = new List<string>();

            scopes.Add("https://management.azure.com/.default");


            var app = ConfidentialClientApplicationBuilder.Create(clientID)
                                                      .WithClientSecret(clientSecret)
                                                      .WithAuthority(new Uri("https://login.microsoftonline.com/" + tenantID))
            .Build();

            var result = await app.AcquireTokenForClient(scopes)
                              .ExecuteAsync();

            return result.AccessToken;
        }

    }
}
