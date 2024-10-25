using MailKit.Net.Imap;
using MailKit;
using Microsoft.Identity.Client;
using System.Security.Cryptography;
using System.Text;

namespace AuthScape.ReadMail
{
    public interface IReadMailService
    {
        Task<List<string>> ReadMail();
        Task<string> GetImapServerFromAutoconfig(string domain);
        string GetImapServer(string email);
        Task<AuthenticationResult> GetPublicClientOAuth2AccessTokenAsync(string protocol, string emailAddress, CancellationToken cancellationToken = default);
    }

    public class ReadMailService : IReadMailService
    {
        public async Task<AuthenticationResult> GetPublicClientOAuth2AccessTokenAsync(string protocol, string emailAddress, CancellationToken cancellationToken = default)
        {
            var options = new PublicClientApplicationOptions
            {
                ClientId = "clientId",
                TenantId = "TenantId",
                RedirectUri = "http://localhost:54218/api/TestEmail/GetAccessToken",
            };

            var publicClientApplication = PublicClientApplicationBuilder
                .CreateWithApplicationOptions(options)
                .Build();

                    string[] scopes;

            if (protocol.Equals("IMAP", StringComparison.OrdinalIgnoreCase))
            {
                scopes = new string[] {
                    "email",
                    "offline_access",
                    "https://outlook.office.com/IMAP.AccessAsUser.All"
                };
            }
            else if (protocol.Equals("POP", StringComparison.OrdinalIgnoreCase))
            {
                scopes = new string[] {
                    "email",
                    "offline_access",
                    "https://outlook.office.com/POP.AccessAsUser.All"
                };
            }
            else
            {
                scopes = new string[] {
                    "email",
                    "offline_access",
                    "https://outlook.office.com/SMTP.Send"
                };
            }

            //var (codeVerifier, codeChallenge) = PkceUtil.GeneratePkcePair();

            try
            {
                // First, check the cache for an auth token.
                return await publicClientApplication.AcquireTokenSilent(scopes, emailAddress)
                    //.WithExtraQueryParameters(new Dictionary<string, string>
                    //{
                    //    { "code_challenge", codeChallenge },
                    //    { "code_challenge_method", "S256" }
                    //})
                    .ExecuteAsync(cancellationToken);
            }
            catch (MsalUiRequiredException exp)
            {
                // If that fails, then try getting an auth token interactively.
                return await publicClientApplication.AcquireTokenInteractive(scopes).WithLoginHint(emailAddress).ExecuteAsync(cancellationToken);
            }
        }






























        public async Task<List<string>> ReadMail()
        {
            var emails = new List<string>();

            var client = new ImapClient();
            client.Connect("imap-mail.outlook.com", 993, true);
            client.Authenticate("name@companyname.com", "password");

            var inbox = client.Inbox;
            await inbox.OpenAsync(FolderAccess.ReadOnly);

            foreach (var message in inbox)
            {
                emails.Add(message.Subject);
            }

            await client.DisconnectAsync(true);

            return emails;
        }
        

        public async Task<string> GetImapServerFromAutoconfig(string domain)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"https://autoconfig.{domain}/mail/config-v1.1.xml");
                if (response.IsSuccessStatusCode)
                {
                    var xml = await response.Content.ReadAsStringAsync();
                    // Parse XML to find IMAP server
                    // Example: <incomingServer type="imap"> <hostname>imap.example.com</hostname> </incomingServer>
                    // Use an XML parser to extract the hostname
                }
            }
            return null;
        }

        //public string GetImapServerFromDns(string domain)
        //{
        //    var request = new DnsRequest();
        //    var response = request.Resolve($"_imap._tcp.{domain}", DnsRecordType.SRV);
        //    if (response.Answers.Count > 0)
        //    {
        //        var srvRecord = (SrvRecord)response.Answers[0];
        //        return srvRecord.Target;
        //    }
        //    return null;
        //}

        public string GetImapServer(string email)
        {
            if (email.EndsWith("@gmail.com"))
                return "imap.gmail.com";
            if (email.EndsWith("@yahoo.com"))
                return "imap.mail.yahoo.com";
            if (email.EndsWith("@outlook.com") || email.EndsWith("@hotmail.com"))
                return "imap-mail.outlook.com";
            // Add more providers as needed
            return null;
        }
    }


    public static class PkceUtil
    {
        public static (string CodeVerifier, string CodeChallenge) GeneratePkcePair()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                var codeVerifierBytes = new byte[32];
                rng.GetBytes(codeVerifierBytes);
                var codeVerifier = Base64UrlEncode(codeVerifierBytes);

                using (var sha256 = SHA256.Create())
                {
                    var codeChallengeBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
                    var codeChallenge = Base64UrlEncode(codeChallengeBytes);
                    return (codeVerifier, codeChallenge);
                }
            }
        }

        private static string Base64UrlEncode(byte[] input)
        {
            return Convert.ToBase64String(input)
                .Replace("+", "-")
                .Replace("/", "_")
                .TrimEnd('=');
        }
    }
}
