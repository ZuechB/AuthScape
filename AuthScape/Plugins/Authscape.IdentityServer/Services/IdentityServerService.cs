using Authscape.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using OpenIddict.EntityFrameworkCore.Models;
using Services.Context;
using static OpenIddict.Abstractions.OpenIddictConstants;
using CoreBackpack.Mail;

namespace Authscape.IdentityServer.Services
{
    public interface IIdentityServerService
    {
        Task<List<OpenIddictEntityFrameworkCoreApplication>> GetApplications();
        Task<string> CreateApplication(IdentityCreateApplication identityCreateApplication);
        Task SetupDevelopmentEnvironment();
        Task<OpenIddictEntityFrameworkCoreApplication> GetApplication(string applicationId);
    }

    public class IdentityServerService : IIdentityServerService
    {
        readonly DatabaseContext databaseContext;
        readonly IOpenIddictApplicationManager openIddictApplicationManager;
        readonly IOpenIddictScopeManager openIddictScopeManager;
        public IdentityServerService(DatabaseContext databaseContext, IOpenIddictApplicationManager openIddictApplicationManager, IOpenIddictScopeManager openIddictScopeManager)
        {
            this.databaseContext = databaseContext;
            this.openIddictApplicationManager = openIddictApplicationManager;
            this.openIddictScopeManager = openIddictScopeManager;
        }

        public async Task<List<OpenIddictEntityFrameworkCoreApplication>> GetApplications()
        {
            return await databaseContext.OpenIddictApplications.ToListAsync();
        }

        public async Task<OpenIddictEntityFrameworkCoreApplication> GetApplication(string applicationId)
        {
            return await databaseContext.OpenIddictApplications.Where(a => a.Id == applicationId).FirstOrDefaultAsync();
        }

        public async Task<string> CreateApplication(IdentityCreateApplication identityCreateApplication)
        {
            if (String.IsNullOrWhiteSpace(identityCreateApplication.ClientSecret))
            {
                var newClientSecret = PasswordGenerator.GenerateRandomPassword(new Microsoft.AspNetCore.Identity.PasswordOptions()
                {
                    RequiredLength = 32,
                    RequiredUniqueChars = 4,
                    RequireLowercase = true,
                    RequireUppercase = true,
                    RequireNonAlphanumeric = true,
                    RequireDigit = true
                });

                identityCreateApplication.ClientSecret = newClientSecret;
            }

            if (await openIddictApplicationManager.FindByClientIdAsync(identityCreateApplication.ClientID) is null)
            {
                await openIddictApplicationManager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = identityCreateApplication.ClientID,
                    ClientSecret = identityCreateApplication.ClientSecret,
                    DisplayName = identityCreateApplication.DisplayName,
                    RedirectUris = {
                            new Uri("http://localhost:3000/signin-oidc")
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("http://localhost:3000/signout-oidc")
                        },
                    Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            OpenIddictConstants.Permissions.Endpoints.EndSession,
                            Permissions.Endpoints.Token,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Prefixes.Scope + "api1"
                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange,
                        }
                });
            }

            // This is the last time you can get your secret
            return identityCreateApplication.ClientSecret;
        }
    
        public async Task SetupDevelopmentEnvironment()
        {
            await CreateDevelopmentApplicationsAsync();
            await CreateDevelopmentScopesAsync();
        }

        private async Task CreateDevelopmentApplicationsAsync()
        {
            if (await openIddictApplicationManager.FindByClientIdAsync("postman") is null)
            {
                await openIddictApplicationManager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "postman",
                    ClientSecret = "postman-secret",
                    DisplayName = "Postman",
                    RedirectUris = {
                            new Uri("http://localhost:3000/signin-oidc")
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("http://localhost:3000/signout-oidc")
                        },
                    Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            OpenIddictConstants.Permissions.Endpoints.EndSession,
                            Permissions.Endpoints.Token,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Prefixes.Scope + "api1",
                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        }
                });
            }


            if (await openIddictApplicationManager.FindByClientIdAsync("resource_server_1") == null)
            {
                var descriptor = new OpenIddictApplicationDescriptor
                {
                    ClientId = "resource_server_1",
                    ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342",
                    Permissions =
                        {
                            Permissions.Endpoints.Introspection
                        }
                };

                await openIddictApplicationManager.CreateAsync(descriptor);
            }
        }

        private async Task CreateDevelopmentScopesAsync()
        {
            if (await openIddictScopeManager.FindByNameAsync("api1") == null)
            {
                var descriptor = new OpenIddictScopeDescriptor
                {
                    Name = "api1",
                    Resources =
                        {
                            "resource_server_1"
                        }
                };

                await openIddictScopeManager.CreateAsync(descriptor);
            }
        }
    }
}