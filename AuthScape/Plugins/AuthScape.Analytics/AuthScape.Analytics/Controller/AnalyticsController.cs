using AuthScape.Analytics.Models;
using AuthScape.Analytics.Services;
using Microsoft.AspNetCore.Mvc;
using Services.Context;

namespace AuthScape.Analytics.Controller
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {

        readonly IAnalyticsService analyticsService;
        public AnalyticsController(IAnalyticsService analyticsService)
        {
            this.analyticsService = analyticsService;
        }

        [HttpPost]
        public async Task<IActionResult> Event(AnalyticsEvent analyticsEvent)
        {
            await analyticsService.TrackEvent(analyticsEvent);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> PageView(AnalyticsPageView analyticsPageView)
        {
            await analyticsService.TrackPageView(analyticsPageView);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> StartSession(AnalyticsSession analyticsSession)
        {
            await analyticsService.StartSession(analyticsSession);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Conversion(AnalyticsConversion analyticsConversion)
        {
            await analyticsService.TrackConversion(analyticsConversion);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Purchase()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login()
        {

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Search()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Share()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> JoinGroup()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> OnboardingBegin()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> OnboardingCompleted()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> GenerateLead() // questions CTA
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AdImpression() // what is being viewed on the screen
        {
            return Ok();
        }
    }
}
