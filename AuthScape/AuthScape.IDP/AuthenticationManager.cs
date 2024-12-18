using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services;
using Services.Context;
using Services.Database;
using Microsoft.AspNetCore.Builder;
using AuthScape.Models.Users;
using Microsoft.AspNetCore.Identity;
using static OpenIddict.Abstractions.OpenIddictConstants;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography.X509Certificates;
using IDP.Services;
using Microsoft.AspNetCore.Authentication;
using Services.Tracking;
using AuthScape.Services;
using Services.Cores;
using AuthScape.IDP.Services;
using Microsoft.EntityFrameworkCore;

namespace AuthScape.IDP
{
    public class AuthenticationManager
    {
        public void RegisterConfigureServices(IConfiguration Configuration, IServiceCollection services, IWebHostEnvironment _currentEnvironment, Action<AppSettings> databaseConnection, Action<AuthenticationBuilder> authBuilder, 
            string symmetricSecurityKey, string certificateThumbprint)
        {
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);
            var _appsettings = Configuration.GetSection("AppSettings").Get<AppSettings>();

            databaseConnection(_appsettings);

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.SameSite = SameSiteMode.None;
            });


            

            // Configure Identity to use the same JWT claims as OpenIddict instead
            // of the legacy WS-Federation claims it uses by default (ClaimTypes),
            // which saves you from doing the mapping in your authorization controller.
            services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserNameClaimType = Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = Claims.Role;
            });

            services.AddOpenIddict()

                // Register the OpenIddict core components.
                .AddCore(options =>
                {
                    // Configure OpenIddict to use the Entity Framework Core stores and models.
                    // Note: call ReplaceDefaultEntities() to replace the default OpenIddict entities.
                    options.UseEntityFrameworkCore()
                           .UseDbContext<DatabaseContext>();
                })

                // Register the OpenIddict server components.
                .AddServer(options =>
                {
                    // Enable the authorization, logout, userinfo, and introspection endpoints.
                    options.SetAuthorizationEndpointUris("/connect/authorize")
                           .SetTokenEndpointUris("/connect/token")
                           .SetEndSessionEndpointUris("/connect/logout")
                           .SetIntrospectionEndpointUris("/connect/introspect")
                           .SetUserInfoEndpointUris("/connect/userinfo");

                    // Mark the "email", "profile" and "roles" scopes as supported scopes.
                    options.RegisterScopes(Scopes.Email, Scopes.Profile, Scopes.Roles, Scopes.OfflineAccess);

                    // Note: the sample only uses the implicit flow but you can enable the other
                    // flows if you need to support code, password or client credentials.
                    //options.AllowImplicitFlow();

                    options.AllowAuthorizationCodeFlow()
                        .RequireProofKeyForCodeExchange()
                        .AllowClientCredentialsFlow()
                        .AllowRefreshTokenFlow();



                    //options.AllowRefreshTokenFlow();

                    options.SetAccessTokenLifetime(TimeSpan.FromHours(1));
                    //options.SetAccessTokenLifetime(TimeSpan.FromSeconds(30));

                    // Register the encryption credentials. This sample uses a symmetric
                    // encryption key that is shared between the server and the Api2 sample
                    // (that performs local token validation instead of using introspection).
                    //f
                    // Note: in a real world application, this encryption key should be
                    // stored in a safe place (e.g in Azure KeyVault, stored as a secret).
                    options.AddEncryptionKey(new SymmetricSecurityKey(
                        Convert.FromBase64String(symmetricSecurityKey)));

                    if (_currentEnvironment.IsDevelopment())
                    {
                        // Register the signing credentials.
                        options.AddDevelopmentSigningCertificate();
                    }
                    else
                    {
                        var certs = new X509Certificate2Collection();
                        var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
                        store.Open(OpenFlags.ReadOnly);
                        certs = store.Certificates.Find(X509FindType.FindByThumbprint, certificateThumbprint, false);
                        if (certs.Count() != 0)
                        {
                            options.AddSigningCertificate(certs[0]);
                        }
                        else
                        {
                            Console.WriteLine("Error: No certificate found containing thumbprint");
                        }
                    }

                    // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                    options.UseAspNetCore()
                           .EnableTokenEndpointPassthrough()
                           .EnableAuthorizationEndpointPassthrough()
                           .EnableEndSessionEndpointPassthrough()
                           .EnableUserInfoEndpointPassthrough()
                           .EnableStatusCodePagesIntegration();
                })

                // Register the OpenIddict validation components.
                .AddValidation(options =>
                {
                    // Import the configuration from the local OpenIddict server instance.
                    options.UseLocalServer();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });


            authBuilder(services.AddAuthentication());


            



            services.AddCors();
            services.AddControllersWithViews();

            //services.AddTransient<ISendGridService, SendGridService>();
            //services.AddTransient<ITwilioService, TwilioService>();

            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IUserManagementService, UserManagementService>();



            // Register the worker responsible of seeding the database with the sample clients.
            // Note: in a real world application, this step should be part of a setup script.
            services.AddHostedService<IDPHostedService>();



            services.AddTransient<ICorsPolicyProvider, CorsPolicyManager>();

            
            #region Experimental MultiFactor Authentication
            services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AdditionalUserClaimsPrincipalFactory>();
            services.AddAuthorization(options => options.AddPolicy("TwoFactorEnabled", x => x.RequireClaim("amr", "mfa")));

            #endregion

            #region Change expire time for tokens 

            if (_appsettings.DataProtectionTokenProviderOptions_TokenLifespanByDays != null)
            {
                services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromDays(_appsettings.DataProtectionTokenProviderOptions_TokenLifespanByDays.Value));
            }

            #endregion

            services.AddRazorPages();


            //ThirdPartyAuthService.AddThirdPartyAutentication(services);
        }

        public void RegisterConfigure(IApplicationBuilder app)
        {
            app.UseCors("default");

            app.UseStaticFiles();

            app.UseStatusCodePagesWithReExecute("/error");

            app.UseRouting();

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware(typeof(ErrorTrackingMiddleware));

            app.UseEndpoints(options =>
            {
                options.MapControllers();
                options.MapDefaultControllerRoute();
                options.MapRazorPages();
            });
        }
    }
}
