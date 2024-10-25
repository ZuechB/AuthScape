using AuthScape.BackgroundServiceCore.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AuthScape.BackgroundServiceCore.Interfaces
{
    public interface IBackgroundActivityService
    {
        Task ExecuteAsync(ILogger<QueueProcessingService> logger, IServiceScopeFactory serviceScopeFactory);
    }
}