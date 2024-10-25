using AuthScape.BackgroundServiceCore.Models;
using BackgroundServiceCore.DataModels;
using Cronos;

namespace AuthScape.BackgroundServiceCore.Services
{
    public interface IQueueService
    {
        // web api service
        void ResetCrons();
        List<QueuedActivity> GetInQueue();
        Task EnqueueAsync(string item);
        Task<QueuedActivity> DequeueAsync(CancellationToken cancellationToken);


        // cron service
        Task AddToCron(RequestCronParam param);
        List<RequestCronParam> GetAllCrons();
        void RemoveAllCrons();
        void RemoveItemFromQueue(Guid Id);
        List<QueuedActivity> GetCronInQueue();
        void RemoveCronById(Guid Id);
    }

    public class InMemoryQueueService : IQueueService
    {
        private readonly Queue<QueuedActivity> _queue = new Queue<QueuedActivity>();
        private List<RequestCronParam> _cronParam = new List<RequestCronParam>();

        public Task EnqueueAsync(string item)
        {
            _queue.Enqueue(new QueuedActivity()
            {
                ActivityName = item,
                Name = item,
                Id = Guid.NewGuid()
            });
            return Task.CompletedTask;
        }

        public void RemoveCronById(Guid Id)
        {

        }

        public List<QueuedActivity> GetInQueue()
        {
            return _queue.ToList();
        }

        public Task<QueuedActivity> DequeueAsync(CancellationToken cancellationToken)
        {
            if (_queue.TryDequeue(out var item))
            {
                return Task.FromResult(item);
            }

            return Task.FromResult<QueuedActivity>(null); // No item in the queue
        }

        public Task AddToCron(RequestCronParam param)
        {
            _cronParam.Add(param);
            return Task.CompletedTask;
        }

        public List<RequestCronParam> GetAllCrons()
        {
            return _cronParam;
        }

        public void RemoveAllCrons()
        {
            _cronParam.Clear();
        }

        public void RemoveItemFromQueue(Guid Id)
        {
            
        }
        public void ResetCrons()
        {

        }

        public List<QueuedActivity> GetCronInQueue()
        {
            return new List<QueuedActivity>();
        }
    }
}
