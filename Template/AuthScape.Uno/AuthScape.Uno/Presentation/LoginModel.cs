using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using AuthScape.Client;
using AuthScape.Client.Models;
using IdentityModel.OidcClient;
using Microsoft.Maui.Storage;
using Newtonsoft.Json;
using Windows.System;

namespace AuthScape.Uno.Presentation;

public partial record LoginModel(IDispatcher Dispatcher, INavigator Navigator, IAuthenticationService Authentication, IAPIService aPIService)
{
    public string Title { get; } = "Login";



    public async ValueTask Login(CancellationToken token)
    {
        //var success = await Authentication.LoginAsync(Dispatcher);
        //if (success)
        //{
        //    await Navigator.NavigateViewModelAsync<MainModel>(this, qualifier: Qualifiers.ClearBackStack);
        //}


        aPIService.Authenticate(async (response) =>
        {
            if (response.state == LoginState.Success)
            {
                await SecureStorage.SetAsync("access_token", response.access_token);
                await SecureStorage.SetAsync("refresh_token", response.refresh_token);

                await Navigator.NavigateViewModelAsync<MainModel>(this, qualifier: Qualifiers.ClearBackStack);


                //await Navigator.ShowMessageDialogAsync(this, title: "Success1", content: response.access_token);

                //aPIService.RefreshToken(response.refresh_token, async (refreshResponse) =>
                //{
                //    await SecureStorage.SetAsync("access_token", refreshResponse.access_token);
                //    await SecureStorage.SetAsync("refresh_token", refreshResponse.refresh_token);

                //    await Navigator.ShowMessageDialogAsync(this, title: "Success2", content: refreshResponse.access_token);
                //});
            }
            else
            {
                await Navigator.ShowMessageDialogAsync(this, title: "Failed", content: "Not Correct");
            }

        }, async (authorizationRequest) =>
        {
            await Launcher.LaunchUriAsync(new Uri(authorizationRequest));

        });
    }
}
