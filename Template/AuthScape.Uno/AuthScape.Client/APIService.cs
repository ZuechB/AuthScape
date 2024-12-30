using System.Net.Http.Headers;
using System.Net.Http.Json;
using AuthScape.Client.Models;

namespace AuthScape.Client;

public class APIService : APIBase, IAPIService
{
    // Post Request
    public void Post<T>(string url, object args, Action<T?> response)
    {
        Task.Run(async () =>
        {
            using (HttpClient client = new HttpClient())
            {
                if (AuthResponse != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
                }

                var response2 = await client.PostAsJsonAsync<object>(url, args);
                if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    if (AuthResponse != null)
                    {
                        RefreshToken(AuthResponse.refresh_token, (tokenResponse) =>
                        {
                            AuthResponse = tokenResponse;

                            Post<T>(url, args, (newResponse) =>
                            {
                                response(newResponse);
                            });
                        });
                    }
                }
                else
                {
                    response(await response2.Content.ReadFromJsonAsync<T?>());
                }
            }
        });
    }
    public async Task<T?> Post<T>(string url, object args)
    {
        using (HttpClient client = new HttpClient())
        {
            if (AuthResponse != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
            }

            var response2 = await client.PostAsJsonAsync<object>(url, args);
            if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                if (AuthResponse != null)
                {
                    var tokenResponse = await RefreshToken(AuthResponse.refresh_token);
                    if (tokenResponse != null)
                    {
                        AuthResponse = tokenResponse;
                        return await Post<T?>(url, args);
                    };
                }
            }
            else
            {
                return await response2.Content.ReadFromJsonAsync<T?>();
            }
        }

        return default(T);
    }

    // Get Request
    public void Get<T>(string url, Action<T?> response)
    {
        Task.Run(async () =>
        {
            using (HttpClient client = new HttpClient())
            {
                if (AuthResponse != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
                }

                var response2 = await client.GetAsync(url);
                if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    if (AuthResponse != null)
                    {
                        RefreshToken(AuthResponse.refresh_token, (tokenResponse) =>
                        {
                            AuthResponse = tokenResponse;

                            Get<T>(url, (newResponse) =>
                            {
                                response(newResponse);
                            });
                        });
                    }
                }
                else
                {
                    response(await response2.Content.ReadFromJsonAsync<T?>());
                }
            }
        });
    }
    public async Task<T?> Get<T>(string url)
    {
        using (HttpClient client = new HttpClient())
        {
            if (AuthResponse != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
            }

            var response2 = await client.GetAsync(url);
            if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                if (AuthResponse != null)
                {
                    var tokenResponse = await RefreshToken(AuthResponse.refresh_token);
                    if (tokenResponse != null)
                    {
                        AuthResponse = tokenResponse;
                        return await Get<T?>(url);
                    };
                }
            }
            else
            {
                return await response2.Content.ReadFromJsonAsync<T?>();
            }
        }

        return default(T);
    }

    // Put Request
    public void Put<T>(string url, object args, Action<T?> response)
    {
        Task.Run(async () =>
        {
            using (HttpClient client = new HttpClient())
            {
                if (AuthResponse != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
                }

                var response2 = await client.PutAsJsonAsync<object>(url, args);
                if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    if (AuthResponse != null)
                    {
                        RefreshToken(AuthResponse.refresh_token, (tokenResponse) =>
                        {
                            AuthResponse = tokenResponse;

                            Put<T>(url, args, (newResponse) =>
                            {
                                response(newResponse);
                            });
                        });
                    }
                }
                else
                {
                    response(await response2.Content.ReadFromJsonAsync<T?>());
                }
            }
        });
    }
    public async Task<T?> Put<T>(string url, object args)
    {
        using (HttpClient client = new HttpClient())
        {
            if (AuthResponse != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
            }

            var response2 = await client.PutAsJsonAsync<object>(url, args);
            if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                if (AuthResponse != null)
                {
                    var tokenResponse = await RefreshToken(AuthResponse.refresh_token);
                    if (tokenResponse != null)
                    {
                        AuthResponse = tokenResponse;
                        return await Put<T?>(url, args);
                    };
                }
            }
            else
            {
                return await response2.Content.ReadFromJsonAsync<T?>();
            }
        }

        return default(T);
    }

    // Delete Request
    public void Delete<T>(string url, Action<T?> response)
    {
        Task.Run(async () =>
        {
            using (HttpClient client = new HttpClient())
            {
                if (AuthResponse != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
                }

                var response2 = await client.DeleteAsync(url);
                if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    if (AuthResponse != null)
                    {
                        RefreshToken(AuthResponse.refresh_token, (tokenResponse) =>
                        {
                            AuthResponse = tokenResponse;

                            Delete<T>(url, (newResponse) =>
                            {
                                response(newResponse);
                            });
                        });
                    }
                }
                else
                {
                    response(await response2.Content.ReadFromJsonAsync<T?>());
                }
            }
        });
    }
    public async Task<T?> Delete<T>(string url)
    {
        using (HttpClient client = new HttpClient())
        {
            if (AuthResponse != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AuthResponse.access_token);
            }

            var response2 = await client.DeleteAsync(url);
            if (response2.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                if (AuthResponse != null)
                {
                    var tokenResponse = await RefreshToken(AuthResponse.refresh_token);
                    if (tokenResponse != null)
                    {
                        AuthResponse = tokenResponse;
                        return await Delete<T?>(url);
                    };
                }
            }
            else
            {
                return await response2.Content.ReadFromJsonAsync<T?>();
            }
        }

        return default(T);
    }
}
