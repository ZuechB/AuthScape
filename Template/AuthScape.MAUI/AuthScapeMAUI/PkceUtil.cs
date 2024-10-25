using System.Security.Cryptography;
using System.Text;

namespace AuthScapeMAUI
{
    public class PkceUtil
    {
        public static string CreateCodeVerifier()
        {
            var bytes = new byte[32];
            RandomNumberGenerator.Fill(bytes);
            return Base64UrlEncode(bytes);
        }

        public static string CreateCodeChallenge(string codeVerifier)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.ASCII.GetBytes(codeVerifier);
                var hash = sha256.ComputeHash(bytes);
                return Base64UrlEncode(hash);
            }
        }

        private static string Base64UrlEncode(byte[] bytes)
        {
            return Convert.ToBase64String(bytes)
                .TrimEnd('=')
                .Replace('+', '-')
                .Replace('/', '_');
        }


        private async Task OpenWebPage(string url)
        {
            try
            {
                Uri uri = new Uri(url);
                await Browser.Default.OpenAsync(uri, BrowserLaunchMode.SystemPreferred);
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., no browser installed)
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }


        public async Task RedirectAuthorizeEndpoint()
        {
            string clientId = "postman";
            string redirectUri = "http://10.0.2.2:3000";
            string codeVerifier = PkceUtil.CreateCodeVerifier();
            string codeChallenge = PkceUtil.CreateCodeChallenge(codeVerifier);
            
            string authorizationUrl = $"https://10.0.2.2:44303/connect/authorize?response_type=code&state=1234&client_id={clientId}&scope=email%20openid%20offline_access%20profile%20api1&redirect_uri={Uri.EscapeDataString(redirectUri)}&code_challenge={codeChallenge}&code_challenge_method=S256";

            // Redirect the user to the authorization URL
            await OpenWebPage(authorizationUrl);
        }
    }
}
