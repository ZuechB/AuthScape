using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AuthScape.IDP;
using AuthScape.SendGrid;

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
                services.AddScoped<ISendGridService, SendGridService>();

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
        }

        public void Configure(IApplicationBuilder app)
        {
            authenticationManager.RegisterConfigure(app);
        }
    }
}