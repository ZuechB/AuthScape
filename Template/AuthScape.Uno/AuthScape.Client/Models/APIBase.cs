using System.Net;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;

namespace AuthScape.Client.Models;
public class APIBase
{
    public string BaseURL { get; set; }

    public string clientID = "postman";
    public string clientSecret = "postman-secret";
    public string authorizationEndpoint = "https://localhost:44303/connect/authorize";
    public string tokenEndpoint = "https://localhost:44303/connect/token";

    private const string code_challenge_method = "S256";
    private const int redirectPort = 51772;

    public LoginResponse? AuthResponse { get; set; }






    public async void RefreshToken(string refreshToken, Action<LoginResponse> Response)
    {
        //Debug.Log("Refreshing token...");
        // builds the  request
        string tokenRequestBody = string.Format("refresh_token={0}&client_id={1}&client_secret={2}&scope=&grant_type=refresh_token",
            refreshToken,
            clientID,
            clientSecret
            );

        using (HttpClient client = new HttpClient())
        {
            var requestContent = new StringContent(tokenRequestBody, Encoding.UTF8, "application/x-www-form-urlencoded");
            try
            {
                HttpResponseMessage response = await client.PostAsync(tokenEndpoint, requestContent);
                response.EnsureSuccessStatusCode();

                string responseText = await response.Content.ReadAsStringAsync();
                var tokenEndpointDecoded = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseText);

                if (tokenEndpointDecoded != null)
                {
                    string? access_token = tokenEndpointDecoded.GetValueOrDefault("access_token");
                    string? refresh_token = tokenEndpointDecoded.GetValueOrDefault("refresh_token");
                    string? expires_in = tokenEndpointDecoded.GetValueOrDefault("expires_in");
                    string? id_token = tokenEndpointDecoded.GetValueOrDefault("id_token");

                    Response(new LoginResponse()
                    {
                        access_token = access_token,
                        expires_in = expires_in,
                        id_token = id_token,
                        refresh_token = refresh_token,
                        state = LoginState.Success
                    });

                }
            }
            catch (HttpRequestException ex)
            {
                // Handle exception
                //Debug.Log($"HTTP Request Exception: {ex.Message}");
            }
        }
    }

    public async Task<LoginResponse?> RefreshToken(string refreshToken)
    {
        //Debug.Log("Refreshing token...");
        // builds the  request
        string tokenRequestBody = string.Format("refresh_token={0}&client_id={1}&client_secret={2}&scope=&grant_type=refresh_token",
            refreshToken,
            clientID,
            clientSecret
            );

        using (HttpClient client = new HttpClient())
        {
            var requestContent = new StringContent(tokenRequestBody, Encoding.UTF8, "application/x-www-form-urlencoded");
            try
            {
                HttpResponseMessage response = await client.PostAsync(tokenEndpoint, requestContent);
                response.EnsureSuccessStatusCode();

                string responseText = await response.Content.ReadAsStringAsync();
                var tokenEndpointDecoded = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseText);

                if (tokenEndpointDecoded != null)
                {
                    string? access_token = tokenEndpointDecoded.GetValueOrDefault("access_token");
                    string? refresh_token = tokenEndpointDecoded.GetValueOrDefault("refresh_token");
                    string? expires_in = tokenEndpointDecoded.GetValueOrDefault("expires_in");
                    string? id_token = tokenEndpointDecoded.GetValueOrDefault("id_token");

                    return new LoginResponse()
                    {
                        access_token = access_token,
                        expires_in = expires_in,
                        id_token = id_token,
                        refresh_token = refresh_token,
                        state = LoginState.Success
                    };
                }
            }
            catch (HttpRequestException ex)
            {
                // Handle exception
                //Debug.Log($"HTTP Request Exception: {ex.Message}");
            }
        }

        return null;
    }

    public async void Authenticate(Action<LoginResponse> Response, Action<string> LauncherUri)
    {
        // Generates state and PKCE values.
        string state = randomDataBase64url(32);
        string code_verifier = randomDataBase64url(32);
        string code_challenge = base64urlencodeNoPadding(sha256(code_verifier));
        // Creates a redirect URI using the loopback address.

        string redirectURI = string.Format("http://{0}:{1}/", IPAddress.Loopback, redirectPort);

        // Creates an HttpListener to listen for requests on that redirect URI.
        var http = new HttpListener();
        http.Prefixes.Add(redirectURI);
        //Debug.Log("Listening..");
        http.Start();

        // Creates the OAuth 2.0 authorization request.
        string authorizationRequest = string.Format("{0}?response_type=code&scope=email%20openid%20offline_access%20profile%20api1&redirect_uri={1}&client_id={2}&state={3}&code_challenge={4}&code_challenge_method={5}",
            authorizationEndpoint,
            System.Uri.EscapeDataString(redirectURI),
            clientID,
            state,
            code_challenge,
            code_challenge_method);

        // Opens request in the browser.
        var test = authorizationRequest;




        // uno approach
        LauncherUri(authorizationRequest);
        //var success = await Launcher.LaunchUriAsync(new Uri(authorizationRequest));

        // unity approach
        //System.Diagnostics.Process.Start(authorizationRequest);




        // Waits for the OAuth authorization response.
        var context = await http.GetContextAsync();

        // Sends an HTTP response to the browser.
        var response = context.Response;
        string responseString = string.Format("<html><head><title>Logged In</title></head><body>Please return to the app.</body></html>");
        var buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        response.ContentLength64 = buffer.Length;
        var responseOutput = response.OutputStream;
        Task responseTask = responseOutput.WriteAsync(buffer, 0, buffer.Length).ContinueWith((task) =>
        {
            responseOutput.Close();
            http.Stop();
            Console.WriteLine("HTTP server stopped.");
        });
        // Checks for errors.
        if (context.Request.QueryString.Get("error") != null)
        {
            //Debug.Log(String.Format("OAuth authorization error: {0}.", context.Request.QueryString.Get("error")));
            return;
        }
        if (context.Request.QueryString.Get("code") == null
            || context.Request.QueryString.Get("state") == null)
        {
            //Debug.Log("Malformed authorization response. " + context.Request.QueryString);
            return;
        }
        // extracts the code
        var code = context.Request.QueryString.Get("code");
        var incoming_state = context.Request.QueryString.Get("state");
        // Compares the receieved state to the expected value, to ensure that
        // this app made the request which resulted in authorization.
        if (incoming_state != state)
        {
            //Debug.Log(String.Format("Received request with invalid state ({0})", incoming_state));
            return;
        }
        //Debug.Log("Authorization code: " + code);
        // Starts the code exchange at the Token Endpoint.
        performCodeExchange(code, code_verifier, redirectURI, Response);
    }

    private async void performCodeExchange(string code, string code_verifier, string redirectURI, Action<LoginResponse> Response)
    {
        //Debug.Log("Exchanging code for tokens...");
        // builds the  request
        string tokenRequestBody = string.Format("code={0}&redirect_uri={1}&client_id={2}&code_verifier={3}&client_secret={4}&scope=&grant_type=authorization_code",
            code,
            System.Uri.EscapeDataString(redirectURI),
            clientID,
            code_verifier,
            clientSecret
            );
        // sends the request
        HttpWebRequest tokenRequest = (HttpWebRequest)WebRequest.Create(tokenEndpoint);
        tokenRequest.Method = "POST";
        tokenRequest.ContentType = "application/x-www-form-urlencoded";
        //tokenRequest.Accept = "Accept=application/json;charset=UTF-8";
        byte[] _byteVersion = Encoding.ASCII.GetBytes(tokenRequestBody);
        tokenRequest.ContentLength = _byteVersion.Length;
        Stream stream = tokenRequest.GetRequestStream();
        await stream.WriteAsync(_byteVersion, 0, _byteVersion.Length);
        stream.Close();
        try
        {
            // gets the response
            WebResponse tokenResponse = await tokenRequest.GetResponseAsync();
            using (StreamReader reader = new StreamReader(tokenResponse.GetResponseStream()))
            {
                // reads response body
                string responseText = await reader.ReadToEndAsync();
                //Console.WriteLine(responseText);
                // converts to dictionary
                var tokenEndpointDecoded = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseText);
                string? access_token = tokenEndpointDecoded["access_token"];
                string? refresh_token = tokenEndpointDecoded["refresh_token"];
                string? expires_in = tokenEndpointDecoded["expires_in"];
                string? id_token = tokenEndpointDecoded["id_token"];

                // store the access token and refresh token if available...
                //PlayerPrefs.SetString("accessToken", access_token);

                Response(new LoginResponse()
                {
                    state = LoginState.Success,
                    access_token = access_token,
                    refresh_token = refresh_token,
                    expires_in = expires_in,
                    id_token = id_token
                });

            }
        }
        catch (WebException ex)
        {
            if (ex.Status == WebExceptionStatus.ProtocolError)
            {
                var response = ex.Response as HttpWebResponse;
                if (response != null)
                {
                    //Debug.Log("HTTP: " + response.StatusCode);
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        // reads response body
                        string responseText = await reader.ReadToEndAsync();
                        //Debug.Log(responseText);
                    }
                }
            }

            Response(new LoginResponse()
            {
                state = LoginState.InvalidLogin
            });
        }
    }

    /// <summary>
    /// Returns URI-safe data with a given input length.
    /// </summary>
    /// <param name="length">Input length (nb. output will be longer)</param>
    /// <returns></returns>
    private static string randomDataBase64url(uint length)
    {
        byte[] bytes = new byte[length];
        RandomNumberGenerator.Fill(bytes);
        return base64urlencodeNoPadding(bytes);
    }

    /// <summary>
    /// Returns the SHA256 hash of the input string.
    /// </summary>
    /// <param name="inputString"></param>
    /// <returns></returns>
    private static byte[] sha256(string inputString)
    {
        byte[] bytes = Encoding.ASCII.GetBytes(inputString);
        using (SHA256 sha256 = SHA256.Create())
        {
            return sha256.ComputeHash(bytes);
        }
    }

    /// <summary>
    /// Base64url no-padding encodes the given input buffer.
    /// </summary>
    /// <param name="buffer"></param>
    /// <returns></returns>
    private static string base64urlencodeNoPadding(byte[] buffer)
    {
        string base64 = Convert.ToBase64String(buffer);

        // Converts base64 to base64url.
        base64 = base64.Replace("+", "-");
        base64 = base64.Replace("/", "_");
        // Strips padding.
        base64 = base64.Replace("=", "");

        return base64;
    }

    private string GenerateCodeVerifier()
    {
        const int length = 64;
        using (var rng = RandomNumberGenerator.Create())
        {
            byte[] data = new byte[length];
            rng.GetBytes(data);
            return Convert.ToBase64String(data).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        }
    }

    private string GenerateCodeChallenge(string codeVerifier)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] challengeBytes = sha256.ComputeHash(Encoding.ASCII.GetBytes(codeVerifier));
            return Convert.ToBase64String(challengeBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        }
    }
}
