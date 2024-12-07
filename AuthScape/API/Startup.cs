using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AuthScape.Controllers;
using Services;
using AuthScape.SendGrid;
using Microsoft.Extensions.Hosting;
using Services.Context;
using Microsoft.EntityFrameworkCore;
using System;
using AuthScape.StripePayment.Services;
using AuthScape.TicketSystem.Services;
using AuthScape.ContentManagement.Services;
using Authscape.IdentityServer.Services;
using Authsome;
using AuthScape.DocumentProcessing.Services;
using CoreBackpack.Azure;
using CoreBackpack.Services;
using AuthScape.Services.Azure.Storage;
using AuthScape.Logging.Services;
using Authscape.Reporting.Services;
using AuthScape.Document.Mapping.Services;
using AuthScape.OpenAI;
using AuthScape.Services;
using AuthScape.Flows.Services;
using AuthScape.Spreadsheet;
using AuthScape.Spreadsheet.Models.Hubs;
using AuthScape.Analytics.Services;
using AuthScape.Kanban.Services;
using AuthScape.UserManageSystem.Services;
using AuthScape.Models.Users;
using Microsoft.AspNetCore.Identity;
using AuthScape.AzureCloudService;
using AuthScape.PrivateLabel.Services;
using AuthScape.ReadMail;
using AuthScape.Marketplace.Services;

namespace API
{
    public class Startup
    {
        readonly IWebHostEnvironment _currentEnvironment;
        private AuthenticationManager authenticationManager;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _currentEnvironment = env;
            authenticationManager = new AuthenticationManager();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            authenticationManager.RegisterConfigureServices(Configuration, _currentEnvironment, services, (builder) =>
            {
                services.AddIdentity<AppUser, Role>()
                    .AddEntityFrameworkStores<DatabaseContext>()
                    .AddDefaultTokenProviders();

                builder.AddValidation(options =>
                 {
                     // Note: the validation handler uses OpenID Connect discovery
                     // to retrieve the issuer signing keys used to validate tokens.
                     options.SetIssuer("https://localhost:44303/");
                     options.AddAudiences("resource_server_1");

                     // Configure the validation handler to use introspection and register the client
                     // credentials used when communicating with the remote introspection endpoint.
                     options.UseIntrospection()
                             .SetClientId("resource_server_1")
                             .SetClientSecret("846B62D0-DEF9-4215-A99D-86E6B8DAB342");

                     // Register the System.Net.Http integration.
                     options.UseSystemNetHttp();

                     // Register the ASP.NET Core host.
                     options.UseAspNetCore();
                 });
            }, (scope) =>
            {
                // provide additional scopes here...
                services.AddScoped<CoreBackpack.Services.ISlugService, CoreBackpack.Services.SlugService>();
                services.AddScoped<IMailService, MailService>();
                services.AddScoped<IStoreCreditService, StoreCreditService>();
                services.AddScoped<ICompaniesService, CompaniesService>();
                services.AddScoped<ISendGridService, SendGridService>();
                services.AddScoped<IUserService, UserService>();
                services.AddScoped<IStripePayService, StripePayService>();
                services.AddScoped<ITicketService, TicketService>();
                services.AddScoped<IPrivateLabelService, PrivateLabelService>();
                services.AddScoped<IAuthsomeService, AuthsomeService>();
                services.AddScoped<IIdentityServerService, IdentityServerService>();
                services.AddScoped<ILogService, LogService>();
                services.AddScoped<INotificationService, NotificationService>();

                services.AddScoped<IContentManagementService, ContentManagementService>();

                services.AddScoped<IOpenAIService, OpenAIService>();
                services.AddScoped<IDocumentService, DocumentService>();

                services.AddScoped<IBlobStorage, BlobStorage>();
                services.AddScoped<IImageService, ImageService>();
                services.AddScoped<IAzureBlobStorage, AzureBlobStorage>();


                services.AddScoped<IInvoiceService, InvoiceService>();
                services.AddScoped<IMappingService, MappingService>();
                services.AddScoped<IFileMappingService, FileMappingService>();
                

                services.AddScoped<IReportService, ReportService>();

                services.AddScoped<IRoleService, RoleService>();

                services.AddScoped<IFlowService, FlowService>();

                services.AddScoped<IUserManagementSystemService, UserManagementSystemService>();
                services.AddScoped<IStripeConnectService, StripeConnectService>();



                services.AddScoped<IAzureWebAppService, AzureWebAppService>();


                services.AddScoped<IInviteService, InviteService>();


                services.AddScoped<ISpreadsheetService, SpreadsheetService>();

                services.AddScoped<IAnalyticsService, AnalyticsService>();

                services.AddScoped<IKanbanService, KanbanService>();



                //services.AddScoped<IGoogleHome, GoogleHome>();

                services.AddScoped<IReadMailService, ReadMailService>();


                services.AddScoped<IAzureOpenAIService, AzureOpenAIService>();

                services.AddScoped<IMarketplaceService, MarketplaceService>();


                






                services.AddScoped<IAzureDocumentIntelligenceService, AzureDocumentIntelligenceService>(provider =>
                    ActivatorUtilities.CreateInstance<AzureDocumentIntelligenceService>(provider, "", "https://namehere.cognitiveservices.azure.com/")
                );



                services.AddSignalR((services) =>
                {
                    services.EnableDetailedErrors = true;
                });


                services.AddScoped<IFormRecognizerService, FormRecognizerService>(provider =>
                    ActivatorUtilities.CreateInstance<FormRecognizerService>(provider, "", "https://namehere.cognitiveservices.azure.com/")
                );



            }, (_appsettings, _currentEnvironment, services) =>
            {

                if (_currentEnvironment.IsDevelopment())
                {
                    services.AddDbContext<DatabaseContext>(options =>
                    {
                        options.UseSqlServer(_appsettings.DatabaseContext,
                        sqlServerOptionsAction: sqlOptions =>
                        {
                            // will attempt to reconnect the connection
                            sqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 10,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null);
                        });
                        options.EnableSensitiveDataLogging();

                        options.UseOpenIddict();

                    }, ServiceLifetime.Scoped);
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
                        options.UseSqlServer(_appsettings.DatabaseContext,
                        sqlServerOptionsAction: sqlOptions =>
                        {
                            // will attempt to reconnect the connection
                            sqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 10,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null);
                        });
                        options.EnableSensitiveDataLogging();

                        options.UseOpenIddict();

                    }, ServiceLifetime.Scoped);
                }

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            authenticationManager.Configure(app, env);


            // remove if not using wwwroot folder...
            app.UseStaticFiles();


            app.UseEndpoints((endpoints) =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<SpreadsheetHub>("/chat");
            });
        }
    }
}