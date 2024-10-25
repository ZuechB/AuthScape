using AuthScape.BackgroundServiceCore.Models;
using Cronos;
using Microsoft.Extensions.Hosting;
using Services.Context;

namespace AuthScape.BackgroundServiceCore.Services
{
    public class CronProcesingService : IHostedService
    {
        private List<ActiveCron> activeCrons { get; set; }
        private readonly IQueueService queueService;

        public CronProcesingService(IQueueService queueService)
        {
            this.queueService = queueService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            activeCrons = new List<ActiveCron>();
            queueService.ResetCrons();

            Task.Run(() => ProcessCrons(cancellationToken));

            return Task.CompletedTask;
        }

        private async Task ProcessCrons(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var crons = queueService.GetAllCrons();
                foreach (var cron in crons)
                {
                    var _con = new ActiveCron()
                    {
                        ActivityName = cron.ActivityName,
                        CronExpression = cron.CronExpression,
                        TimeZoneById = cron.TimeZoneById,
                        _timer = new System.Timers.Timer()
                    };
                    activeCrons.Add(ScheduleJob(_con));
                }

                await Task.Delay(1000, cancellationToken);
            }
        }

        

        private void ScheduleSingleJob(ActiveCron cron)
        {
            var next = cron.CronExpressionObject.GetNextOccurrence(DateTimeOffset.Now, cron.TimeZoneInfo);
            if (next.HasValue)
            {
                var delay = next.Value - DateTimeOffset.Now;
                if (delay.TotalMilliseconds <= 0)   // prevent non-positive values from being passed into Timer
                {
                    //await ScheduleJob(cancellationToken, crons);
                }
                cron._timer = new System.Timers.Timer(delay.TotalMilliseconds);
                cron._timer.Elapsed += async (sender, args) =>
                {
                    cron._timer.Dispose();  // reset and dispose timer
                    cron._timer = null;

                    await queueService.EnqueueAsync(cron.ActivityName);
                    ScheduleSingleJob(cron);    // reschedule next
                };
                cron._timer.Start();
            }
        }


        private ActiveCron ScheduleJob(ActiveCron cron)
        {
            ScheduleSingleJob(cron);
            return cron;
        }

        public virtual async Task StopAsync(CancellationToken cancellationToken)
        {
            foreach (ActiveCron cron in activeCrons)
            {
                cron._timer?.Stop();
            }
            await Task.CompletedTask;
        }
    }

    public class ActiveCron : RequestCronParam
    {
        public System.Timers.Timer _timer;
        public CronExpression CronExpressionObject
        {
            get
            {
                return Cronos.CronExpression.Parse(CronExpression);
            }
        }

        public TimeZoneInfo TimeZoneInfo
        {
            get
            {
                return TimeZoneInfo.FindSystemTimeZoneById(TimeZoneById);
            }
        }
    }
}
