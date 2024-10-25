using AuthScape.BackgroundServiceCore.Interfaces;
using AuthScape.BackgroundServiceCore.Services;

namespace BackgroundServiceApp.Activities
{
    public class DownloadProductPhotosActivity : IBackgroundActivityService
    {
        public async Task ExecuteAsync(ILogger<QueueProcessingService> logger, IServiceScopeFactory serviceScopeFactory)
        {
            using (IServiceScope scope = serviceScopeFactory.CreateScope())
            {
                //IScopedProcessingService scopedProcessingService =
                //    scope.ServiceProvider.GetRequiredService<IScopedProcessingService>();

                //await scopedProcessingService.DoWorkAsync(stoppingToken);
            }


            logger.LogInformation("The system found me automatically and processed me!");
        }
    }
}