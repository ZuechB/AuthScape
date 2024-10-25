using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Services.Context;
using System.Collections.Specialized;
using System.Web;

namespace AuthScape.IDP.Controllers
{
    public class AuthScapePageModel : PageModel
    {
        readonly DatabaseContext databaseContext;

        public string? MinifiedCSS { get; set; }
        public string? CompanyName { get; set; }

        public AuthScapePageModel(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task EnablePrivateLabelExperience(string returnUrl)
        {
            string baseUrl = "";

            string queryString = returnUrl.Substring(returnUrl.IndexOf('?') + 1);
            NameValueCollection queryParameters = HttpUtility.ParseQueryString(queryString);

            var hasKey = queryParameters.AllKeys.Where(d => d == "redirect_uri").Any();

            if (hasKey)
            {
                var redirectUri = queryParameters["redirect_uri"];
                Uri uri = new Uri(redirectUri);

                if (uri.Port == 443 || uri.Port == 80)
                {
                    baseUrl = $"{uri.Scheme}://{uri.Host}";

                }
                else
                {
                    baseUrl = $"{uri.Scheme}://{uri.Host}:{uri.Port}";
                }

                // pull the private label minified code
                var dnsRecord = await databaseContext.DnsRecords.AsNoTracking().Where(d => d.Domain.ToLower() == baseUrl).FirstOrDefaultAsync();
                if (dnsRecord != null)
                {
                    var company = await databaseContext.Companies.Where(c => c.Id == dnsRecord.CompanyId).AsNoTracking().FirstOrDefaultAsync();

                    MinifiedCSS = dnsRecord.MinifiedCSSFile;
                    CompanyName = company.Title;
                }
                else
                {
                    MinifiedCSS = null;
                    CompanyName = null;
                }
            }
        }
    }
}
