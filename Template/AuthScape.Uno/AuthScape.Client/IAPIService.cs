using AuthScape.Client.Models;

namespace AuthScape.Client;
public interface IAPIService
{
    // Post Request
    void Post<T>(string url, object args, Action<T?> response);
    Task<T?> Post<T>(string url, object args);

    // Get Request
    void Get<T>(string url, Action<T?> response);
    Task<T?> Get<T>(string url);

    // Put Request
    void Put<T>(string url, object args, Action<T?> response);
    Task<T?> Put<T>(string url, object args);

    // Delete Request
    void Delete<T>(string url, Action<T?> response);
    Task<T?> Delete<T>(string url);


    // Authenticate
    void Authenticate(Action<LoginResponse> Response, Action<string> LauncherUri);
    void RefreshToken(string refreshToken, Action<LoginResponse> Response);
    Task<LoginResponse?> RefreshToken(string refreshToken);
}
