using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IDP.Controllers
{
    public class HomeController : Controller
    {
        readonly AppSettings appSettings;
        public HomeController(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public IActionResult Index()
        {
            var returnUrl = appSettings.LoginRedirectUrl + "/login";
            return Redirect(returnUrl);
            //return View();
        }
        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
