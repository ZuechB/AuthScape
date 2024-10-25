using AuthScape.BackgroundServiceCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AuthScape.BackgroundServiceCore.Services
{
    public class QueueProcessingService : IHostedService
    {
        private readonly IQueueService _queueService;
        readonly IServiceScopeFactory serviceScopeFactory;
        readonly IHostableBackgroundService hostableBackgroundService;
        private readonly ILogger<QueueProcessingService> _logger;

        public QueueProcessingService(IQueueService queueService, IServiceScopeFactory serviceScopeFactory, ILogger<QueueProcessingService> logger, IHostableBackgroundService hostableBackgroundService)
        {
            _queueService = queueService ?? throw new ArgumentNullException(nameof(queueService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.hostableBackgroundService = hostableBackgroundService;
            this.serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Queue processing service is starting.");

            // Start processing the queue in a background thread
            Task.Run(() => ProcessQueue(cancellationToken));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Queue processing service is stopping.");
            // Add any cleanup logic here
            return Task.CompletedTask;
        }

        private async Task ProcessQueue(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                // Dequeue and process items from the queue
                var item = await _queueService.DequeueAsync(cancellationToken);
                if (item != null)
                {
                    var executeAssembly = BackgroundServiceStartup.GetActivities().Where(c => c.Name.ToLower() == item.ActivityName.ToLower()).FirstOrDefault();
                    if (executeAssembly != null)
                    {

                        // Process the item
                        //_logger.LogInformation($"Processing item: {item}");

                        dynamic instance = Activator.CreateInstance(executeAssembly.Type);
                        if (instance != null)
                        {
                            await instance.ExecuteAsync(_logger, serviceScopeFactory);

                            _logger.LogInformation("Executed " + executeAssembly.Name + " at: " + DateTime.Now.ToShortTimeString());

                            // Simulate some work
                            await Task.Delay(1000, cancellationToken); // Simulated delay, replace with actual processing

                            //_logger.LogInformation($"Item processed: {item}");
                        }
                    }
                    else
                    {
                        _logger.LogInformation($"Could not find: {item}");
                    }

                    // remove item from queue
                    _queueService.RemoveItemFromQueue(item.Id);
                }
                else
                {
                    // No items in the queue, wait before checking again
                    await Task.Delay(1000, cancellationToken);
                }
            }
        }
    }

}
