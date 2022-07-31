using AuthScape.IDP.ViewModels;
using AuthScape.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Context;
using System.Web;

namespace IDP.Controllers
{
    public class ForgotPasswordController : Controller
    {
        readonly UserManager<AppUser> _userManager;
        readonly DatabaseContext _applicationDbContext;
        readonly IHttpContextAccessor _httpContextAccessor;
        readonly IMailService mailService;

        public ForgotPasswordController(UserManager<AppUser> userManager, DatabaseContext _applicationDbContext, IHttpContextAccessor _httpContextAccessor, IMailService mailService)
        {
            _userManager = userManager;
            this._applicationDbContext = _applicationDbContext;
            this._httpContextAccessor = _httpContextAccessor;
            this.mailService = mailService;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmForgotPassword(ForgotPasswordViewModel forgotPassword)
        {
            if (!String.IsNullOrWhiteSpace(forgotPassword.Email))
            {
                var user = await _userManager.FindByNameAsync(forgotPassword.Email);
                if (user != null)
                {
                    var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                    if (passwordResetToken != null)
                    {
                        var resetToken = System.Net.WebUtility.UrlEncode(passwordResetToken);

                        string host = _httpContextAccessor.HttpContext.Request.Scheme + "://" +
                            _httpContextAccessor.HttpContext.Request.Host.Value;

                        // send the email
                        await mailService.ForgotPassword(
                            user,
                            host + "/account/ResetPassword?email=" + HttpUtility.UrlEncode(user.Email) + "&resetToken=" + resetToken
                        );

                        return View(new ForgotPasswordViewModel()
                        {
                            Email = user.Email
                        });
                    }
                }
            }

            return RedirectToAction("ForgotPassword");
        }
    }
}
