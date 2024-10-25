using AuthScape.BackgroundServiceCore.Interfaces;
using AuthScape.BackgroundServiceCore.Models;
using AuthScape.BackgroundServiceCore.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services.Context;
using System.Reflection;

namespace AuthScape.BackgroundServiceCore
{
    public class BackgroundServiceStartup
    {
        protected static List<Activity> activitiesList { get; set; }

        public static void Setup(WebApplicationBuilder builder, string projectName, bool isDatabaseDriven = true, bool enableSwagger = false)
        {
            // to be able to access the app settings for each stage
            var appSettings = builder.Configuration.GetSection("AppSettings");
            var configureService = builder.Services.Configure<AppSettings>(appSettings);
            var _appsettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpClient();

            builder.Services.AddSingleton<IHostableBackgroundService, HostableBackgroundService>();
            
            if (isDatabaseDriven)
            {
                builder.Services.AddSingleton<IQueueService, DatabaseQueueService>(provider =>
                    ActivatorUtilities.CreateInstance<DatabaseQueueService>(provider, _appsettings.DatabaseContext)
                );
            }
            else
            {
                builder.Services.AddSingleton<IQueueService, InMemoryQueueService>();
            }

            builder.Services.AddHostedService<QueueProcessingService>();
            builder.Services.AddHostedService<CronProcesingService>();

            builder.Services.AddMvcCore().AddApplicationPart(Assembly.Load(new AssemblyName("AuthScape.BackgroundServiceCore")));

            

            builder.Services.AddDbContext<DatabaseContext>(options =>
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

            }, ServiceLifetime.Scoped);


            // gets all the activities automatically

            activitiesList = new List<Activity>();
            var activities = GetReportTypesInNamespace(AppDomain.CurrentDomain.GetAssemblies().Where(a => a.FullName.Contains(projectName)), projectName);
            foreach (var activity in activities)
            {
                activitiesList.Add(new Activity()
                {
                    Name = activity.Name,
                    Type = activity
                });
            }

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment() || enableSwagger)
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        public static List<Activity> GetActivities()
        {
            return activitiesList;
        }

        private static Type[] GetReportTypesInNamespace(IEnumerable<Assembly> assemblies, string projectName)
        {
            var reports = assemblies.SelectMany(s => s.GetTypes())
                             .Where(c => typeof(IBackgroundActivityService).IsAssignableFrom(c) && c.IsClass && c.Namespace == projectName + ".Activities")
                             .ToArray();

            return reports;
        }

        public static void Execute()
        {

        }
    }
}
