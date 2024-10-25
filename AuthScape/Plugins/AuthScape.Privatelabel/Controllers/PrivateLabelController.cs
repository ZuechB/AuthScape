using AuthScape.AzureCloudService;
using AuthScape.Models.Fonts;
using AuthScape.Models.Storage;
using AuthScape.PrivateLabel.Models;
using AuthScape.PrivateLabel.Models.Azure;
using AuthScape.Services;
using AuthScape.PrivateLabel.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using Microsoft.Extensions.Options;
using Services.Database;
using Services.Context;

namespace AuthScape.PrivateLabel.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PrivateLabelController : ControllerBase
    {
        readonly IPrivateLabelService privateLabelService;
        readonly IUserManagementService userManagementService;
        readonly IAzureWebAppService azureWebAppService;
        readonly AppSettings appSettings;

        public PrivateLabelController(IOptions<AppSettings> appSettings, IPrivateLabelService privateLabelService, IUserManagementService userManagementService, IAzureWebAppService azureWebAppService)
        {
            this.privateLabelService = privateLabelService;
            this.userManagementService = userManagementService;
            this.azureWebAppService = azureWebAppService;
            this.appSettings = appSettings.Value;
        }

        //[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        //[HttpPost]
        //public async Task<IActionResult> AddRecord()
        //{

        //    return Ok();
        //}

        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> GetAllDomains()
        {
            return Ok(await privateLabelService.GetAllDomains());
        }

        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> GetAllDomainsUser()
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            return Ok(await privateLabelService.GetAllDomains(signedInUser.CompanyId));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetEditorData(string domain, long? companyId = null)
        {
            return Ok(await privateLabelService.GetEditorData(domain, companyId));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetFonts()
        {
            var fonts = await privateLabelService.GetGoogleFontAPI();
            int index = 1;
            if (fonts.httpStatusCode == System.Net.HttpStatusCode.OK)
            {
                var googleFonts = new List<GoogleFont>();
                foreach (var item in fonts.Content.items)
                {
                    var googleFont = new GoogleFont();
                    googleFont.Id = index;
                    googleFont.value = item.family;
                    googleFont.label = item.family;
                    
                    googleFonts.Add(googleFont);

                    index++;
                }
                return Ok(googleFonts);
            }
            else
            {
                return BadRequest("Unable to read google fonts");
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SetFont(PrivateLabelSetter fontSetter)
        {
            await privateLabelService.SetFontFamily(fontSetter.Domain, fontSetter.Value, fontSetter.CompanyId);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SetGlobalCSS(PrivateLabelSetter fontSetter)
        {
            await privateLabelService.SetCustomCSS(fontSetter.Domain, fontSetter.Value, fontSetter.CompanyId);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SetGlobalHTML(PrivateLabelSetter fontSetter)
        {
            await privateLabelService.SetCustomHtml(fontSetter.Domain, fontSetter.Value, fontSetter.CompanyId);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetFields(string domain, long? companyId = null)
        {
            return Ok(await privateLabelService.GetDNSFields(domain, companyId));
        }

        [HttpPost]
        public async Task<IActionResult> SetFieldValue(FieldValue fieldValue)
        {
            await privateLabelService.SetDNSField(fieldValue.Id, fieldValue.FieldId, fieldValue.Value);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetDataFromRecord(long oemCompanyId)
        {
            var dnsRecord = await privateLabelService.GetDataFromRecord(oemCompanyId);
            return Content(dnsRecord, "text/css");
        }

        [HttpPost]
		[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
		public async Task<IActionResult> UploadAppIcon([FromForm] UploadFileStorage appIconFile)
        {
            await privateLabelService.UploadAppIcon(appIconFile.file, appIconFile.domain);
			return Ok();
        }

		[HttpPost]
		[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
		public async Task<IActionResult> UploadCustomFont([FromForm] UploadFileStorage appIconFile)
		{
			await privateLabelService.UploadCustomFont(appIconFile.file, appIconFile.domain);
			return Ok();
		}

        [HttpGet]
        public async Task<IActionResult> GetCompanyIdFromDomain(string domain)
        {
            return Ok(await privateLabelService.GetCompanyIdFromDomain(domain));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GenerateDomain(AddDomainToWebAppRequest request)
        {
            string appServicePlanName = appSettings.PrivateLabel.AppServicePlanName;
            string webAppName = appSettings.PrivateLabel.WebAppName;
            string resourceGroupName = appSettings.PrivateLabel.ResourceGroupName;
            string subscriptionId = appSettings.PrivateLabel.SubscriptionId;

            string openIdApplicationId = appSettings.PrivateLabel.OpenIdApplicationId; // stored in the database

            var responseDomain = await azureWebAppService.AttachDomainToWebApp(new AzureCloudService.Models.DomainAttach()
            {
                hostName = request.HostName,
                name = webAppName,
                resourceGroupName = resourceGroupName,
                subscriptionId = subscriptionId,
                ClientId = appSettings.PrivateLabel.ClientId,
                ClientSecret = appSettings.PrivateLabel.ClientSecret,
                TenantId = appSettings.PrivateLabel.TenantId,
            });

            if (responseDomain == null)
            {
                var responseCertificate = await azureWebAppService.CreateManagedCertificate(new AuthScape.AzureCloudService.Models.DomainSSL()
                {
                    DomainName = request.HostName,
                    AppServicePlanName = appServicePlanName,
                    WebAppName = webAppName,
                    CertificateName = request.HostName + "-" + webAppName,
                    ResourceGroupName = resourceGroupName,
                    SubscriptionId = subscriptionId,
                    ClientId = appSettings.PrivateLabel.ClientId,
                    ClientSecret = appSettings.PrivateLabel.ClientSecret,
                    TenantId = appSettings.PrivateLabel.TenantId,
                });

                if (responseCertificate != null)
                {
                    return BadRequest(responseCertificate);
                }

                if (responseDomain == null && responseCertificate == null)
                {
                    while (true)
                    {
                        await Task.Delay(8000);

                        var response = await azureWebAppService.AssignManagedCertificate(new AzureCloudService.Models.AssignManageCertificateParam()
                        {
                            SubscriptionId = subscriptionId,
                            ResourceGroupName = resourceGroupName,
                            AppServiceName = webAppName,
                            DomainName = request.HostName,
                            CertificateName = request.HostName + "-" + webAppName,

                            ClientId = appSettings.PrivateLabel.ClientId,
                            ClientSecret = appSettings.PrivateLabel.ClientSecret,
                            TenantId = appSettings.PrivateLabel.TenantId
                        });
                        if (response == null)
                        {
                            break;
                        }
                    }

                    await privateLabelService.CreateDNSRecords(openIdApplicationId, request.HostName);

                    return Ok();
                }
            }
            else
            {
                return BadRequest(responseDomain.Message);
            }

            return BadRequest("Unable to complete process");
        }

        [HttpGet]
        public async Task<IActionResult> GetManifestFile (string domain)
        {
            return Ok(await privateLabelService.GetManifestFile(domain));
        }
    }

    public class UploadFileStorage : FileStorage
    {
        public string domain { get; set; }
    }

    public class FieldValue
    {
        public Guid Id { get; set; }
        public Guid FieldId { get; set; }
        public string Value { get; set; }
    }
}