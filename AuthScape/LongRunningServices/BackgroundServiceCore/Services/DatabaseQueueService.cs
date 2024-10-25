using AuthScape.BackgroundServiceCore.Models;
using BackgroundServiceCore.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Context;

namespace AuthScape.BackgroundServiceCore.Services
{
    public class DatabaseQueueService : IQueueService
    {
        readonly string connectionString;
        public DatabaseQueueService(string connectionString)
        {
            this.connectionString = connectionString;
        }

        private string getOptions()
        {
            return connectionString;
        }

        public Task EnqueueAsync(string item)
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                databaseContext.QueuedActivity.Add(new QueuedActivity()
                {
                    ActivityName = item,
                    Name = item,
                });
                databaseContext.SaveChanges();
            }

            return Task.CompletedTask;
        }

        public List<QueuedActivity> GetInQueue()
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                return databaseContext.QueuedActivity.Where(d => d.CronExpression == null).ToList();
            }
        }

        public Task<QueuedActivity> DequeueAsync(CancellationToken cancellationToken)
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var queue = databaseContext.QueuedActivity
                .Where(d => d.CronExpression == null).FirstOrDefault();

                return Task.FromResult(queue);
            }
        }

        public Task AddToCron(RequestCronParam param)
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                databaseContext.QueuedActivity.Add(new QueuedActivity()
                {
                    Name = param.ActivityName,
                    ActivityName = param.ActivityName,
                    CronExpression = param.CronExpression,
                    TimeZoneById = param.TimeZoneById,
                    IsRunning = false
                });
                databaseContext.SaveChanges();
            }
            return Task.CompletedTask;
        }

        public void RemoveItemFromQueue(Guid Id)
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var queueActivity = databaseContext.QueuedActivity.Where(d => d.Id == Id).FirstOrDefault();
                if (queueActivity != null)
                {
                    databaseContext.QueuedActivity.Remove(queueActivity);
                    databaseContext.SaveChanges();
                }
            }
        }

        public List<RequestCronParam> GetAllCrons()
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var requestedCronParam = databaseContext.QueuedActivity.Where(d => d.CronExpression != null && !d.IsRunning).Select(s => new RequestCronParam()
                {
                    ActivityName = s.ActivityName,
                    CronExpression = s.CronExpression,
                    TimeZoneById = s.TimeZoneById,

                }).ToList();


                var queues = databaseContext.QueuedActivity.Where(d => d.CronExpression != null && !d.IsRunning).ToList();
                foreach (var queue in queues)
                {
                    queue.IsRunning = true;
                }
                databaseContext.SaveChanges();


                return requestedCronParam;
            }
        }

        public void ResetCrons()
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var queuedActivity = databaseContext.QueuedActivity.Where(d => d.CronExpression != null).ToList();
                foreach (var activity in queuedActivity)
                {
                    activity.IsRunning = false;
                }
                databaseContext.SaveChanges();
            }
        }

        public void RemoveAllCrons()
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var queuedActivity = databaseContext.QueuedActivity.Where(d => d.CronExpression != null).ToList();
                foreach (var activity in queuedActivity)
                {
                    activity.IsRunning = true;
                }
                databaseContext.SaveChanges();
            }

            //_cronParam.Clear();
        }

        public void RemoveCronById(Guid Id)
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                var queuedActivity = databaseContext.QueuedActivity.Where(d => d.Id == Id).FirstOrDefault();
                if (queuedActivity != null)
                {
                    databaseContext.QueuedActivity.Remove(queuedActivity);
                    databaseContext.SaveChanges();
                }
            }
        }

        public List<QueuedActivity> GetCronInQueue()
        {
            using (var databaseContext = new DatabaseContext(getOptions()))
            {
                return databaseContext.QueuedActivity.Where(d => d.CronExpression != null).ToList();
            }
        }
    }
}
