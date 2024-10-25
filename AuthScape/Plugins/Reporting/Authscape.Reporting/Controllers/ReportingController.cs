using Authscape.Reporting.Models;
using Authscape.Reporting.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;

namespace Authscape.Reporting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportingController : Controller
    {
        readonly IReportService reportService;
        readonly AppSettings appSettings;
        readonly DatabaseContext databaseContext;

        public ReportingController(IReportService reportService, IOptions<AppSettings> appSettings, DatabaseContext databaseContext)
        {
            this.reportService = reportService;
            this.appSettings = appSettings.Value;
            this.databaseContext = databaseContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post(ReportRequest request) // runs a report
        {
            var response = await reportService.RunReport(AppDomain.CurrentDomain, request.id, request.payLoad, new[] { databaseContext });

            return Ok(new ReportData()
            {
                Columns = response.Columns,
                Content = response.Data,
                ReportType = response.ReportType
            });
        }
    }

    public class ReportRequest
    {
        public Guid id { get; set; }
        public string payLoad { get; set; }
    }
}
