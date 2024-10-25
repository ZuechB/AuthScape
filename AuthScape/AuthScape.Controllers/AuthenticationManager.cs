using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;
using Services;
using Services.Context;
using System;
using Services.Database;
using Microsoft.AspNetCore.Builder;
using Services.Tracking;
using AuthScape.Services;
using Services.Cores;
using Microsoft.AspNetCore.Routing;

namespace AuthScape.Controllers
{
    public class AuthenticationManager
    {
        public void RegisterConfigureServices(IConfiguration Configuration, IWebHostEnvironment _currentEnvironment, IServiceCollection services, 
            Action<OpenIddictBuilder> Builder, Action<IServiceCollection> scope, Action<AppSettings, IWebHostEnvironment, IServiceCollection> dbContextSetup)
        {
            // to be able to access the app settings for each stage
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);
            var _appsettings = Configuration.GetSection("AppSettings").Get<AppSettings>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });
            // Register the OpenIddict validation components.
            var builder = services.AddOpenIddict()
                .AddCore(options =>
                {
                    options.UseEntityFrameworkCore()
                            .UseDbContext<DatabaseContext>();
                });

            Builder(builder);


            dbContextSetup(_appsettings, _currentEnvironment, services);

            

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddScoped<ISlugService, SlugService>();
            services.AddScoped<IUserManagementService, UserManagementService>();

            scope(services);


            // clean the payload from null values
            services.AddMvcCore().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            })
            .AddAuthorization();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddCors();
            services.AddTransient<ICorsPolicyProvider, CorsPolicyManager>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Action<IEndpointRouteBuilder>? useEndpoints = null)
        {
            ApplyMigration(app);

            app.UseCors("default");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            if (!env.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware(typeof(ErrorTrackingMiddleware));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                if (useEndpoints != null)
                {
                    useEndpoints(endpoints);
                }
            });
        }

        private void ApplyMigration(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
            scope.ServiceProvider.GetRequiredService<DatabaseContext>().Database.Migrate();
        }
    }
}