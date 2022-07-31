using IDP.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using AuthScape.Models;
using AuthScape.Models.Users;
using OpenIddict.Validation.AspNetCore;
using Services;
using Services.Context;
using Services.Database;
using Services.PolicyManger;
using System;
using System.Security.Cryptography.X509Certificates;
using static OpenIddict.Abstractions.OpenIddictConstants;
using AuthScape.IDP;

namespace IDP
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        { 
            Configuration = configuration;
            _currentEnvironment = env;
            authenticationManager = new AuthenticationManager();
        }

        private AuthenticationManager authenticationManager;
        readonly IWebHostEnvironment _currentEnvironment;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            authenticationManager.RegisterConfigureServices(Configuration, services, _currentEnvironment, (authBuilder) =>
            {
                //authBuilder
                //    .AddFacebook(facebookOptions =>
                //    {
                //        facebookOptions.AppId = "test";
                //        facebookOptions.AppSecret = "test";
                //    });
                //    .AddGoogle((googleOOptions) =>
                //    {
                //        googleOOptions.ClientId = "";
                //        googleOOptions.ClientSecret = "";
                //    });
            });

            services.AddScoped<IMailService, MailService>();
        }

        public void Configure(IApplicationBuilder app)
        {
            authenticationManager.RegisterConfigure(app);
        }
    }

}
