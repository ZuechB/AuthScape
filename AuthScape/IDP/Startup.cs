using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AuthScape.IDP;
using AuthScape.SendGrid;
using Services;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Services.Context;
using System;
using AuthScape.Models.Users;
using Microsoft.AspNetCore.Identity;
using AuthScape.StripePayment.Services;

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
            authenticationManager.RegisterConfigureServices(Configuration, services, _currentEnvironment, (_appsettings) =>
            {
                services.AddIdentity<AppUser, Role>()
                    .AddEntityFrameworkStores<DatabaseContext>()
                    .AddDefaultTokenProviders()
                    .AddDefaultUI();

                // database connections
                if (_currentEnvironment.IsDevelopment())
                {
                    services.AddDbContext<DatabaseContext>(options =>
                    {
                        // Configure the context to use Microsoft SQL Server.
                        options.UseSqlServer(_appsettings.DatabaseContext,
                            sqlServerOptionsAction: sqlOptions =>
                            {
                            // will attempt to reconnect the connection
                                sqlOptions.EnableRetryOnFailure(
                                maxRetryCount: 10,
                                maxRetryDelay: TimeSpan.FromSeconds(30),
                                errorNumbersToAdd: null);
                            });

                        // Register the entity sets needed by OpenIddict.
                        // Note: use the generic overload if you need
                        // to replace the default OpenIddict entities.
                        options.UseOpenIddict();
                    });
                }
                else if (_currentEnvironment.IsStaging())
                {
                    services.AddDbContext<DatabaseContext>(options =>
                    {
                        // Configure the context to use Microsoft SQL Server.
                        options.UseSqlServer(_appsettings.DatabaseContext,
                            sqlServerOptionsAction: sqlOptions =>
                            {
                                // will attempt to reconnect the connection
                                sqlOptions.EnableRetryOnFailure(
                                maxRetryCount: 10,
                                maxRetryDelay: TimeSpan.FromSeconds(30),
                                errorNumbersToAdd: null);
                            });

                        // Register the entity sets needed by OpenIddict.
                        // Note: use the generic overload if you need
                        // to replace the default OpenIddict entities.
                        options.UseOpenIddict();
                    });
                }
                else if (_currentEnvironment.IsProduction())
                {
                    services.AddDbContext<DatabaseContext>(options =>
                    {
                        // Configure the context to use Microsoft SQL Server.
                        options.UseSqlServer(_appsettings.DatabaseContext,
                            sqlServerOptionsAction: sqlOptions =>
                            {
                            // will attempt to reconnect the connection
                                sqlOptions.EnableRetryOnFailure(
                                maxRetryCount: 10,
                                maxRetryDelay: TimeSpan.FromSeconds(30),
                                errorNumbersToAdd: null);
                            });

                        // Register the entity sets needed by OpenIddict.
                        // Note: use the generic overload if you need
                        // to replace the default OpenIddict entities.
                        options.UseOpenIddict();
                    });
                }

            }, (authBuilder) =>
            {
                services.AddScoped<IUserService, UserService>();
                services.AddScoped<ISendGridService, SendGridService>();
                services.AddScoped<IStripePayService, StripePayService>();
                services.AddScoped<IInviteService, InviteService>();

                //ThirdPartyAuthService.AddThirdPartyAutentication(services);


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


            }, "DRjd/GnduI3Efzen9V9BvbNUfc/VKgXltV7Kbk9sMkY=", "ProductionCertificateThumbprint");
        }

        public void Configure(IApplicationBuilder app)
        {
            authenticationManager.RegisterConfigure(app);
        }
    }
}