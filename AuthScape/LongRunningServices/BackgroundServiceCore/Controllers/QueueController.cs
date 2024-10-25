using AuthScape.BackgroundServiceCore.Models;
using AuthScape.BackgroundServiceCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthScape.BackgroundServiceCore.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class QueueController : ControllerBase
    {
        private readonly IQueueService _queueService;

        public QueueController(IQueueService queueService)
        {
            _queueService = queueService ?? throw new ArgumentNullException(nameof(queueService));
        }

        [HttpPost]
        public async Task<IActionResult> AddToQueue(EnqueueParam param)
        {
            await _queueService.EnqueueAsync(param.ActivityName);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddCron(RequestCronParam param)
        {
            await _queueService.AddToCron(param);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetInQueue()
        {
            return Ok(_queueService.GetInQueue());
        }

        [HttpGet]
        public IActionResult GetCronsInQueue()
        {
            return Ok(_queueService.GetCronInQueue());
        }

        [HttpDelete]
        public IActionResult RemoveCron(Guid Id)
        {
            _queueService.RemoveCronById(Id);
            return Ok();
        }
    }
}