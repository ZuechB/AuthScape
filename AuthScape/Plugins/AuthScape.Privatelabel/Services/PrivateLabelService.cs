using Authsome.Models;
using Authsome;
using Services.Database;
using Microsoft.Extensions.Options;
using AuthScape.Services;
using Services.Context;
using Microsoft.EntityFrameworkCore;
using NUglify;
using System.Text;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using AuthScape.Services.Azure.Storage;
using Scryber.OpenType;
using CoreBackpack.Services;
using AuthScape.PrivateLabel.Models;
using AuthScape.Document.Models;
using Newtonsoft.Json;

namespace AuthScape.PrivateLabel.Services
{
    public interface IPrivateLabelService
    {
        Task<HttpResponseWrapper<GoogleFonts>> GetGoogleFontAPI();
        Task SetFontFamily(string domain, string fontFamily, long? CompanyId = null);
        Task SetCustomCSS(string domain, string customCSS, long? CompanyId = null);
        Task SetCustomHtml(string domain, string customHtml, long? CompanyId = null);
        Task<List<PrivateLabelDNSFields>> GetDNSFields(string domain, long? companyId = null);
        Task SetDNSField(Guid id, Guid fieldId, string value);
        Task<DnsRecord> GetEditorData(string domain, long? companyId = null);
        Task<string?> GetDataFromRecord(long oemCompanyId);
        Task UploadAppIcon(IFormFile file, string domain);
        Task UploadCustomFont(IFormFile file, string domain);
        Task<IdFromDomainResponse> GetCompanyIdFromDomain(string domain);
        Task<List<Domain>> GetAllDomains(long? companyId = null);
        Task CreateDNSRecords(string openIdApplicationId, string newDomain);
        Task<ManifestFile> GetManifestFile(string domain);
    }

    public class PrivateLabelService : IPrivateLabelService
    {
        readonly IAuthsomeService authsomeService;
        readonly AppSettings appSettings;
        readonly IUserManagementService userManagementService;
        readonly DatabaseContext databaseContext;
        readonly IAzureBlobStorage azureBlobStorage;
		readonly IImageService imageService;
		public PrivateLabelService(IOptions<AppSettings> appSettings, IAuthsomeService authsomeService, IUserManagementService userManagementService, IAzureBlobStorage azureBlobStorage, DatabaseContext databaseContext, IImageService imageService)
        {
            this.appSettings = appSettings.Value;
            this.authsomeService = authsomeService;
            this.userManagementService = userManagementService;
            this.databaseContext = databaseContext;
            this.azureBlobStorage = azureBlobStorage;
            this.imageService = imageService;
		}

        public async Task<HttpResponseWrapper<GoogleFonts>> GetGoogleFontAPI()
        {
            return await authsomeService.GetAsync<GoogleFonts>("https://www.googleapis.com/webfonts/v1/webfonts?key=" + appSettings.PrivateLabel.GoogleFontsAPIKey);
        }

        public async Task<List<Domain>> GetAllDomains(long? companyId = null)
        {
            var dnsRecord = databaseContext.DnsRecords
                .AsNoTracking();

            if (companyId != null)
            {
                dnsRecord = dnsRecord.Where(c => c.CompanyId == companyId);
            }

            return await dnsRecord.Select(s => new Domain()
            {
                Id = s.Id,
                Name = s.Domain
            }).ToListAsync();
        }

        public async Task<DnsRecord> GetEditorData(string domain, long? companyId = null)
        {
            if (companyId != null)
            {
                return await databaseContext.DnsRecords.Where(d => d.CompanyId == companyId.Value).FirstOrDefaultAsync();
            }
            else
            {
                return await databaseContext.DnsRecords.Where(d => d.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            }
        }

        public async Task SetFontFamily(string domain, string fontFamily, long? CompanyId = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            DnsRecord? dnsRecord = null;
            if (CompanyId != null)
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.CompanyId == CompanyId.Value).FirstOrDefaultAsync();
            }
            else
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            }

            dnsRecord.FontFamily = fontFamily;
            dnsRecord.FontUrl = null;
			await databaseContext.SaveChangesAsync();

            await MinifyCSSFile(dnsRecord.Id);
        }

        public async Task SetCustomCSS(string domain, string customCSS, long? CompanyId = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            DnsRecord? dnsRecord = null;
            if (CompanyId != null)
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.CompanyId == CompanyId.Value).FirstOrDefaultAsync();
            }
            else
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            }

            dnsRecord.PrettyCSS = customCSS;
            await databaseContext.SaveChangesAsync();

            await MinifyCSSFile(dnsRecord.Id);
        }

        public async Task SetCustomHtml(string domain, string customHtml, long? CompanyId = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            DnsRecord? dnsRecord = null;
            if (CompanyId != null)
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.CompanyId == CompanyId.Value).FirstOrDefaultAsync();
            }
            else
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            }

            dnsRecord.PrettyHTML = customHtml;
            dnsRecord.MinifiedHTML = Uglify.Html(customHtml).Code;

            await databaseContext.SaveChangesAsync();

            await MinifyCSSFile(dnsRecord.Id);
        }

        public async Task<string?> GetDataFromRecord(long oemCompanyId)
        {
            var dnsRecord = await databaseContext.DnsRecords.AsNoTracking().Where(d => d.CompanyId == oemCompanyId).FirstOrDefaultAsync();
            if (dnsRecord != null)
            {
                //var fields = await databaseContext.DnsRecordFields.Where(d => d.DnsRecordId == dnsRecord.Id).AsNoTracking().ToListAsync();

                return dnsRecord.MinifiedCSSFile;
            }

            return null;
        }

        private async Task MinifyCSSFile(Guid dnsRecordId)
        {
            var dnsRecord = await databaseContext.DnsRecords.Where(d => d.Id == dnsRecordId).FirstOrDefaultAsync();
            if (dnsRecord != null)
            {
                var builder = new StringBuilder();

                if (!String.IsNullOrWhiteSpace(dnsRecord.FontUrl))
                {
                    if (dnsRecord.FontUrl.ToLower().Contains(".otf"))
                    {
                        builder.AppendLine("@font-face { font-family: " + dnsRecord.FontFamily + "; src: url(\"" + dnsRecord.FontUrl + "\") format(\"opentype\"); }");
                    }
                    else if (dnsRecord.FontUrl.ToLower().Contains(".ttf"))
                    {
						builder.AppendLine("@font-face { font-family: " + dnsRecord.FontFamily + "; src: url(\"" + dnsRecord.FontUrl + "\") format(\"truetype\"); }");
					}
					else if (dnsRecord.FontUrl.ToLower().Contains(".woff"))
					{
						builder.AppendLine("@font-face { font-family: " + dnsRecord.FontFamily + "; src: url(\"" + dnsRecord.FontUrl + "\") format(\"woff\"); }");
					}
					else if (dnsRecord.FontUrl.ToLower().Contains(".woff2"))
					{
						builder.AppendLine("@font-face { font-family: " + dnsRecord.FontFamily + "; src: url(\"" + dnsRecord.FontUrl + "\") format(\"woff2\"); }");
					}
				}
                else
                {
					builder.AppendLine("@import url('https://fonts.googleapis.com/css?family=" + dnsRecord.FontFamily + "&display=swap');");
				}
                
                builder.AppendLine("body{font-family:\"" + dnsRecord.FontFamily + "\" !important;}.MuiTypography-root{font-family:\"" + dnsRecord.FontFamily + "\" !important;}button{font-family:\"" + dnsRecord.FontFamily + "\" !important;}\"");
                builder.AppendLine(dnsRecord.PrettyCSS);

                var dnsField = await databaseContext.PrivateLabelSelectedFields
                    .Include(p => p.PrivateLabelField)
                    .Where(d => d.DnsRecordId == dnsRecordId && d.PrivateLabelField.FieldType == PrivateLabelFieldType.Color).ToListAsync();

                foreach (var item in dnsField)
                {
                    builder.AppendLine(item.PrivateLabelField.CSSSelector.ToString() + "{" + item.PrivateLabelField.CSSProperty + ":" + item.CSSValue + " !important}");
                }

                dnsRecord.MinifiedCSSFile = Uglify.Css(builder.ToString()).Code;
                await databaseContext.SaveChangesAsync();
            }
        }

		public async Task UploadAppIcon(IFormFile file, string domain)
		{
            var signedInUser = await userManagementService.GetSignedInUser();

            var dnsRecord = await databaseContext.DnsRecords
                .Where(d => d.Domain.ToLower() == domain.ToLower())
                .FirstOrDefaultAsync();

            if (dnsRecord != null)
            {
				var appIcons = "privatelabel";
				if (!String.IsNullOrWhiteSpace(appSettings.PrivateLabel.AppIconContainer))
                {
                    appIcons = appSettings.PrivateLabel.AppIconContainer;
				}
                
                if (appSettings.Stage == AuthScape.Models.Stage.Development)
                {
					appIcons += "-development";
				}
                else if (appSettings.Stage == AuthScape.Models.Stage.Staging)
                {
                    appIcons += "-staging";
				}


                var appIconsUrl = await azureBlobStorage.StoreAppIcons(file, appIcons, dnsRecord.Id.ToString());

                dnsRecord.AppIconUrl = appIconsUrl.AppIconDefault;
                dnsRecord.AppIcon16Url = appIconsUrl.AppIcon16x16Uri;
                dnsRecord.AppIcon32Url = appIconsUrl.AppIcon32x32Uri;

				await databaseContext.SaveChangesAsync();
			}
        }

		public async Task UploadCustomFont(IFormFile file, string domain)
		{
			var signedInUser = await userManagementService.GetSignedInUser();

			var dnsRecord = await databaseContext.DnsRecords
				.Where(d => d.Domain.ToLower() == domain.ToLower())
				.FirstOrDefaultAsync();

			if (dnsRecord != null)
			{
				var appIcons = "privatelabel";
				if (!String.IsNullOrWhiteSpace(appSettings.PrivateLabel.AppIconContainer))
				{
					appIcons = appSettings.PrivateLabel.AppIconContainer;
				}

				if (appSettings.Stage == AuthScape.Models.Stage.Development)
				{
					appIcons += "-development";
				}
				else if (appSettings.Stage == AuthScape.Models.Stage.Staging)
				{
					appIcons += "-staging";
				}

				var filesName = await azureBlobStorage.UploadFile(file, appIcons, dnsRecord.Id.ToString().Replace("-", "") + "-" + Guid.NewGuid().ToString().Replace("-", ""));

				dnsRecord.FontUrl = appSettings.Storage.BaseUri + "/" + appIcons + "/" + filesName;

				using (var reader = new  TypefaceReader())
				{
					var remoteUri = new Uri(dnsRecord.FontUrl);
					var font = await reader.GetFontsAsync(remoteUri);
                    var firstFont = font.FirstOrDefault();
                    if (firstFont != null)
                    {
						dnsRecord.FontFamily = firstFont.FamilyName;
					}
				}

				await databaseContext.SaveChangesAsync();

				await MinifyCSSFile(dnsRecord.Id);
			}
		}


		public async Task<List<PrivateLabelDNSFields>> GetDNSFields(string domain, long? companyId = null)
        {
            var dnsFields = new List<PrivateLabelDNSFields>();


            DnsRecord? dnsRecord = null;
            if (companyId != null)
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.CompanyId == companyId.Value).FirstOrDefaultAsync();
            }
            else
            {
                dnsRecord = await databaseContext.DnsRecords.Where(d => d.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            }

            if (dnsRecord != null)
            {
                var recordFieldTypes = await databaseContext.PrivateLabelFields.AsNoTracking().ToListAsync();
                foreach (var recordFieldType in recordFieldTypes)
                {
                    var recordField = await databaseContext.PrivateLabelSelectedFields
                        .Where(d => d.DnsRecordId == dnsRecord.Id && d.PrivateLabelFieldId == recordFieldType.Id)
                    .FirstOrDefaultAsync();

                    if (recordField != null)
                    {
                        dnsFields.Add(new PrivateLabelDNSFields()
                        {
                            Id = dnsRecord.Id,
                            FieldId = recordFieldType.Id,
                            Property = recordFieldType.CSSProperty,
                            Name = recordFieldType.Name,
                            Selector = recordFieldType.CSSSelector,
                            Value = recordField.CSSValue,
                        });
                    }
                    else
                    {
                        dnsFields.Add(new PrivateLabelDNSFields()
                        {
                            Id = dnsRecord.Id,
                            FieldId = recordFieldType.Id,
                            Property = recordFieldType.CSSProperty,
                            Selector = recordFieldType.CSSSelector,
                            Name = recordFieldType.Name,
                            Value = null
                        });
                    }
                }
            }

            return dnsFields;
        }


        public async Task SetDNSField(Guid id, Guid fieldId, string value)
        {
            var dnsField = await databaseContext.PrivateLabelSelectedFields
                .Include(d => d.PrivateLabelField)
                .Where(d => d.DnsRecordId == id && d.PrivateLabelField.Id == fieldId)
                .FirstOrDefaultAsync();

            if (dnsField != null)
            {
                dnsField.CSSValue = value;
            }
            else
            {
                await databaseContext.PrivateLabelSelectedFields.AddAsync(new PrivateLabelSelectedFields()
                {
                    DnsRecordId = id,
                    PrivateLabelFieldId = fieldId, 
                    CSSValue = value
                });
            }
            await databaseContext.SaveChangesAsync();

            await MinifyCSSFile(id);
        }

        public async Task<IdFromDomainResponse> GetCompanyIdFromDomain(string domain)
        {
            var dnsRecord = await databaseContext.DnsRecords
                .Where(d => d.Domain.ToLower() == domain.ToLower())
                .AsNoTracking()
                .Select(s => new IdFromDomainResponse() {
                    CompanyId = s.CompanyId,
                    DemoCompanyId = s.DemoCompanyId,
                    FavIcon = s.FavIcon,
                })
                .FirstOrDefaultAsync();

            if (dnsRecord != null)
            {
                var companyName = await databaseContext.Companies
                    .Where(c => c.Id == dnsRecord.CompanyId)
                    .Select(s => s.Title)
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                dnsRecord.CompanyName = companyName;
            }

            return dnsRecord;
        }

        public async Task CreateDNSRecords(string openIdApplicationId, string newDomain)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            // add the redirect URL
            var application = await databaseContext.OpenIddictApplications
                .Where(o => o.Id == openIdApplicationId)
                .FirstOrDefaultAsync();

            if (application != null)
            {
                var redirects = JsonConvert.DeserializeObject<List<string>>(application.RedirectUris);
                if (redirects == null)
                {
                    redirects = new List<string>();
                }

                if (!redirects.Contains(newDomain))
                {
                    redirects.Add("https://" + newDomain + "/signin-oidc");

                    application.RedirectUris = JsonConvert.SerializeObject(redirects);

                    await databaseContext.SaveChangesAsync();
                }
            }

            // add the DNS record
            if (!await databaseContext.DnsRecords.Where(d => d.Domain == newDomain).AnyAsync())
            {
                await databaseContext.DnsRecords.AddAsync(new DnsRecord()
                {
                    CompanyId = signedInUser.CompanyId,
                    Domain = newDomain,
                    AppIconUrl = "",
                    AppIcon16Url = "",
                    AppIcon32Url = "",
                    WebAppCreated = DateTime.Now,
                    DomainValidated = DateTime.Now,
                    SSLCreated = DateTime.Now,
                    SSLConnectedToDomain = DateTime.Now,
                });
                await databaseContext.SaveChangesAsync();
            }


        }

        public async Task<ManifestFile> GetManifestFile(string domain)
        {
            var company = await databaseContext.DnsRecords
                    .Where(c => c.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();

            if (company != null)
            {
                var icons = new List<Icons>();
                
                //icons.Add(new Icons()
                //{
                //    src = company.Logo512X512,
                //    sizes = "512x512",
                //    type = "image/png"
                //});

                //icons.Add(new Icons()
                //{
                //    src = company.Logo512X512,
                //    sizes = "192x192",
                //    type = "image/png"
                //});

                //icons.Add(new Icons()
                //{
                //    src = company.Logo512X512,
                //    sizes = "32x32",
                //    type = "image/png"
                //});

                //icons.Add(new Icons()
                //{
                //    src = company.Logo512X512,
                //    sizes = "16x16",
                //    type = "image/png"
                //});


                return new ManifestFile
                {
                    //name = company.Company.Title,
                    //short_name = company.Company.Title.Trim(),
                    icons = icons,
                    theme_color = "#404A61",
                    background_color = "#404A61",
                    start_url = company.Domain,
                    display = "standalone",
                    orientation = "portrait"
                };
            }

            return null;
        }
    }
}