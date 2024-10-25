using AuthScape.AzureCloudService.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using Services.Database;
using Microsoft.Extensions.Options;

namespace AuthScape.AzureCloudService
{
    public interface IAzureWebAppService
    {
        Task<AzureWebAppBadRequest?> AttachDomainToWebApp(DomainAttach domainAttach);
        Task<string?> CreateManagedCertificate(DomainSSL domainSSL);

        Task<string?> AssignManagedCertificate(AssignManageCertificateParam param);
    }

    public class AzureWebAppService : AzureBaseService, IAzureWebAppService
    {
        readonly AppSettings appSettings;
        public AzureWebAppService(IOptions<AppSettings> appSettings) 
        {
            this.appSettings = appSettings.Value;
        }


        public async Task<AzureWebAppBadRequest?> AttachDomainToWebApp(DomainAttach domainAttach)
        {
            var accessToken = await GetAccessToken(domainAttach.TenantId, domainAttach.ClientId, domainAttach.ClientSecret);


            HttpClient client = new HttpClient();

            var apiVersion = "2023-12-01";

            var requestUri = $"https://management.azure.com/subscriptions/{domainAttach.subscriptionId}/resourceGroups/{domainAttach.resourceGroupName}/providers/Microsoft.Web/sites/{domainAttach.name}/hostNameBindings/{domainAttach.hostName}?api-version={apiVersion}";

            var requestBody = new
            {
                // Add your request body properties here
            };

            var jsonContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(requestBody));
            jsonContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var request = new HttpRequestMessage(HttpMethod.Put, requestUri)
            {
                Content = jsonContent
            };

            // Add your authorization header if needed
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return null;
            }
            else
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<AzureWebAppBadRequest>(errorMessage);
            }
        }





        public async Task<string?> CreateManagedCertificate(DomainSSL domainSSL)
        {
            var token = await GetAccessToken(domainSSL.TenantId, domainSSL.ClientId, domainSSL.ClientSecret);

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var requestUri = $"https://management.azure.com/subscriptions/{domainSSL.SubscriptionId}/resourceGroups/{domainSSL.ResourceGroupName}/providers/Microsoft.Web/certificates/{domainSSL.CertificateName}?api-version=2023-12-01";

            var requestBody = new
            {
                location = "East US",
                properties = new
                {
                    canonicalName = domainSSL.DomainName,
                    hostNames = new[] { domainSSL.DomainName },
                    serverFarmId = $"/subscriptions/{domainSSL.SubscriptionId}/resourceGroups/{domainSSL.ResourceGroupName}/providers/Microsoft.Web/serverfarms/{domainSSL.AppServicePlanName}",
                    friendlyName = domainSSL.DomainName
                }
            };

            var jsonContent = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

            var response = await client.PutAsync(requestUri, jsonContent);

            if (response.IsSuccessStatusCode)
            {
                return null;
            }
            else
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                return errorMessage;
            }

            
        }




        private async Task<string?> GetCertificateThumbprint(string accessToken, string tenantId, string clientId, string clientSecret, string subscriptionId, string resourceGroupName, string certificateName)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var requestUri = $"https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates/{certificateName}?api-version=2023-12-01";


            var response = await client.GetAsync(requestUri);
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var responseBody = await response.Content.ReadAsStringAsync();

            var certificates = JsonConvert.DeserializeObject<CollectCertificateThumbprint>(responseBody);

            if (certificates != null)
            {
                return certificates.properties.thumbprint;
            }
            else
            {
                return null;
            }
        }

        public async Task<string?> AssignManagedCertificate(AssignManageCertificateParam param)
        {
            var token = await GetAccessToken(param.TenantId, param.ClientId, param.ClientSecret);

            var thumbprint = await GetCertificateThumbprint(token, param.TenantId, param.ClientId, param.ClientSecret, param.SubscriptionId, param.ResourceGroupName, param.CertificateName);

            if (thumbprint == null)
            {
                return "Not Found";
            }

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var requestUri = $"https://management.azure.com/subscriptions/{param.SubscriptionId}/resourceGroups/{param.ResourceGroupName}/providers/Microsoft.Web/sites/{param.AppServiceName}/hostNameBindings/{param.DomainName}?api-version=2023-12-01";

            var requestBody = new
            {
                properties = new
                {
                    sslState = "SniEnabled",
                    thumbprint = thumbprint
                }
            };

            var jsonContent = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

            var response = await client.PutAsync(requestUri, jsonContent);
            if (response.IsSuccessStatusCode)
            {
                return null;
            }
            else
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                return errorMessage;
            }

        }
    }
}
