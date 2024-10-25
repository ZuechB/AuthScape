using AuthScape.Models.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Services
{
    public class ThirdPartyAuthService
    {
        public static void AddThirdPartyAutentication(IServiceCollection services)
        {
            var authBuilder = services.AddAuthentication();

            var databaseContext = services.BuildServiceProvider().GetService<DatabaseContext>();

            //var thirdPartyAuths = databaseContext.ThirdPartyAuthentications.ToList();
            //if (!thirdPartyAuths.Any())
            //{
            //    return;
            //}
            //foreach (var thirdPartyAuth in thirdPartyAuths)
            //{
            //    if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Facebook) 
            //    {
            //        authBuilder.AddFacebook(facebookOptions =>
            //        {
            //            facebookOptions.AppId = thirdPartyAuth.ClientId;
            //            facebookOptions.AppSecret = thirdPartyAuth.ClientSecret;
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Google)
            //    {
            //        //authBuilder.goog
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Microsoft)
            //    {
                    
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Github)
            //    {
            //        authBuilder.AddGitHub(options =>
            //         {
            //             options.ClientId = thirdPartyAuth.ClientId;
            //             options.ClientSecret = thirdPartyAuth.ClientSecret;
            //             //options.EnterpriseDomain = Configuration["GitHub:EnterpriseDomain"] ?? string.Empty;
            //             options.Scope.Add("user:email");
            //         });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Discord)
            //    {
            //        authBuilder.AddDiscord(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Spotify)
            //    {
            //        authBuilder.AddSpotify(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Amazon)
            //    {
            //        authBuilder.AddAmazon(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Slack)
            //    {
            //        authBuilder.AddSlack(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Custom)
            //    {
            //        // need to figure out how to do this..

            //        //authBuilder.AddOAuth(options =>
            //        //{
            //        //    options.ClientId = thirdPartyAuth.ClientId;
            //        //    options.ClientSecret = thirdPartyAuth.ClientSecret;
            //        //    //options.Scope.Add("user:email");
            //        //});
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.HubSpot)
            //    {
            //        authBuilder.AddHubSpot(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Fitbit)
            //    {
            //        authBuilder.AddFitbit(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Coinbase)
            //    {
            //        authBuilder.AddCoinbase(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.BattleNet)
            //    {
            //        authBuilder.AddBattleNet(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Basecamp)
            //    {
            //        authBuilder.AddBasecamp(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Autodesk)
            //    {
            //        authBuilder.AddAutodesk(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Apple)
            //    {
            //        authBuilder.AddApple(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Asana)
            //    {
            //        authBuilder.AddAsana(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.AdobeIO)
            //    {
            //        authBuilder.AddAdobeIO(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Dropbox)
            //    {
            //        authBuilder.AddDropbox(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.LinkedIn)
            //    {
            //        authBuilder.AddLinkedIn(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Notion)
            //    {
            //        authBuilder.AddNotion(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Patreon)
            //    {
            //        authBuilder.AddPatreon(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Paypal)
            //    {
            //        authBuilder.AddPaypal(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.WordPress)
            //    {
            //        authBuilder.AddWordPress(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Yammer)
            //    {
            //        authBuilder.AddYammer(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.Yahoo)
            //    {
            //        authBuilder.AddYahoo(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }
            //    else if (thirdPartyAuth.ThirdPartyAuthenticationType == ThirdPartyAuthenticationType.MailChimp)
            //    {
            //        authBuilder.AddMailChimp(options =>
            //        {
            //            options.ClientId = thirdPartyAuth.ClientId;
            //            options.ClientSecret = thirdPartyAuth.ClientSecret;
            //            //options.Scope.Add("user:email");
            //        });
            //    }


            //}


            


            //    .AddGoogle((googleOOptions) =>
            //    {
            //        googleOOptions.ClientId = "";
            //        googleOOptions.ClientSecret = "";
            //    });

            //.AddMicrosoftAccount(microsoftOptions => {

            //})
            //.AddGoogle(googleOptions => {


            //})
            //.AddTwitter(twitterOptions => {


            //})
        }
    }
}
