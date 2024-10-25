using Services.Context;
using Microsoft.AspNetCore.Http;
using System.Reflection;
using Services.Database;
using Microsoft.Extensions.Options;
using AuthScape.Models.Logging;

namespace AuthScape.Logging.Services
{
	public interface ILogService
    {
        Task Trace(string? message = null, Exception? exception = null);
        Task Debug(string? message = null, Exception? exception = null);
        Task Info(string? message = null, Exception? exception = null);
        Task Warn(string? message = null, Exception? exception = null);
        Task Error(string? message = null, Exception? exception = null);
        Task Fatal(string? message = null, Exception? exception = null);
    }

    public class LogService : ILogService
    {
        readonly DatabaseContext databaseContext;
        readonly IHttpContextAccessor httpContextAccessor;
        readonly AppSettings appSettings;
        public LogService(DatabaseContext databaseContext, IHttpContextAccessor httpContextAccessor, IOptions<AppSettings> appSettings) 
        {
            this.databaseContext = databaseContext;
            this.httpContextAccessor = httpContextAccessor;
            this.appSettings = appSettings.Value;
        }


        public async Task Trace(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Trace, message, exception);
        }

        public async Task Debug(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Debug, message, exception);
        }

        public async Task Info(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Info, message, exception);
        }

        public async Task Warn(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Warn, message, exception);
        }

        public async Task Error(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Error, message, exception);
        }

        public async Task Fatal(string? message = null, Exception? exception = null)
        {
            await TrackingLog(Level.Fatal, message, exception);
        }

        private async Task TrackingLog(Level level, string? message = null, Exception? exception = null)
        {
            var controller = httpContextAccessor.HttpContext.Request.RouteValues["controller"].ToString();
            var action = httpContextAccessor.HttpContext.Request.RouteValues["action"].ToString();

            Assembly assembly = Assembly.GetExecutingAssembly();
            Version version = assembly.GetName().Version;
            string versionString = version.ToString();

            await databaseContext.Loggings.AddAsync(new AuthScape.Models.Logging.Logging()
            {
                MachineName = Environment.MachineName,
                Created = DateTime.Now,
                Level = level,
                Browser = httpContextAccessor.HttpContext.Request.Headers.UserAgent.ToString(),
                Environment = appSettings.Stage,
                Uri = httpContextAccessor.HttpContext.Request.Headers.Referer.FirstOrDefault(),
                Version = versionString,
                RouteAction = action,
                RouteController = controller,
                Runtime = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,
                OS = System.Runtime.InteropServices.RuntimeInformation.OSDescription,
                Referer = httpContextAccessor.HttpContext.Request.Headers["Referer"].ToString(),
                Message = message,
                ExceptionMessage = exception != null ? exception.Message : null,
                InnerExceptionMessage = (exception != null && exception.InnerException != null) ? exception.InnerException.Message : null,
                ExceptionStackTrace = exception != null ? exception.StackTrace : null,
                InnerExceptionStackTrace = (exception != null && exception.InnerException != null) ? exception.StackTrace : null
            });
            await databaseContext.SaveChangesAsync();
        }
    }
}
