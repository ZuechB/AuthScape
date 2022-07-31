using Microsoft.AspNetCore.Http;
using AuthScape.Models.Exceptions;
using Newtonsoft.Json;
using System.Net;

namespace Services.Tracking
{
    public class ErrorTrackingMiddleware
    {
        private readonly RequestDelegate next;
        public ErrorTrackingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected

            if (ex is NotFoundException)
            {
                code = HttpStatusCode.NotFound;
            }
            else if (ex is UnauthorizedException)
            {
                code = HttpStatusCode.Unauthorized;
            }
            else if (ex is BadRequestException)
            {
                code = HttpStatusCode.BadRequest;
            }
            else
            {
                // add your favorite error tracking software here!


                //telemetryClient.TrackException(ex);
                //SentrySdk.CaptureException(ex);
            }

            var result = JsonConvert.SerializeObject(new 
            {
                error = ex.Message
            });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
