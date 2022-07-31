using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AuthScape.Controllers;
using Services;
using AuthScape.SendGrid;

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
                services.AddScoped<IUserManagementService, UserManagementService>();
                services.AddScoped<IMailService, MailService>();
                services.AddScoped<IStoreCreditService, StoreCreditService>();
                services.AddScoped<ICompaniesService, CompaniesService>();
                services.AddScoped<ISendGridService, SendGridService>();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            authenticationManager.Configure(app, env);
        }
    }
}