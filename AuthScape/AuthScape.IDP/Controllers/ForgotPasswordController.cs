using AuthScape.IDP.ViewModels;
using AuthScape.IDP.ViewModels.ForgotPasword;
using AuthScape.Models.Users;
using IDP.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services;
using Services.Context;
using Services.Database;
using System.Collections.Specialized;
using System.Web;

namespace IDP.Controllers
{
    public class ForgotPasswordController : Controller
    {
        readonly UserManager<AppUser> _userManager;
        readonly DatabaseContext _applicationDbContext;
        readonly IHttpContextAccessor _httpContextAccessor;
        readonly IMailService mailService;
        readonly AppSettings appSettings;

        public ForgotPasswordController(UserManager<AppUser> userManager, DatabaseContext _applicationDbContext, IHttpContextAccessor _httpContextAccessor, IMailService mailService, IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            this._applicationDbContext = _applicationDbContext;
            this._httpContextAccessor = _httpContextAccessor;
            this.mailService = mailService;
            this.appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index(string returnUrl = null)
        {
            string baseUrl = "";

            if (!String.IsNullOrWhiteSpace(returnUrl))
            {
                string queryString = returnUrl.Substring(returnUrl.IndexOf('?') + 1);
                NameValueCollection queryParameters = HttpUtility.ParseQueryString(queryString);

                var hasKey = queryParameters.AllKeys.Where(d => d == "redirect_uri").Any();

                if (hasKey)
                {
                    var redirectUri = queryParameters["redirect_uri"];
                    Uri uri = new Uri(redirectUri);

                    if (uri.Port == 443 || uri.Port == 80)
                    {
                        baseUrl = $"{uri.Scheme}://{uri.Host}";

                    }
                    else
                    {
                        baseUrl = $"{uri.Scheme}://{uri.Host}:{uri.Port}";
                    }

                    // pull the private label minified code
                    var dnsRecord = await _applicationDbContext.DnsRecords.AsNoTracking().Where(d => d.Domain.ToLower() == baseUrl).FirstOrDefaultAsync();
                    if (dnsRecord != null)
                    {
                        var company = await _applicationDbContext.Companies.Where(c => c.Id == dnsRecord.CompanyId).AsNoTracking().FirstOrDefaultAsync();

                        ViewData["MinifiedCSS"] = dnsRecord.MinifiedCSSFile;
                        ViewData["CompanyName"] = company.Title;
                    }
                    else
                    {
                        ViewData["MinifiedCSS"] = null;
                        ViewData["CompanyName"] = null;
                    }
                }
            }

            ViewData["loginUrl"] = appSettings.LoginRedirectUrl;
            return View();
        }

        [AllowAnonymous]
        public IActionResult PasswordRequestSent()
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
                            host + "/ForgotPassword/ResetPassword?email=" + HttpUtility.UrlEncode(user.Email) + "&resetToken=" + resetToken
                        );

                        return Redirect("/ForgotPassword/PasswordRequestSent");
                    }
                }
            }

            return Redirect("/forgotpassword");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string email, string resetToken, string[] errors = null)
        {
            return View(new ResetPasswordViewModel()
            {
                Email = email,
                ResetToken = resetToken,
                errors = errors
            });
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasswordConfirm(string email, string resetToken, string newPassword)
        {
            var user = await _userManager.FindByNameAsync(email);
            if (user != null)
            {
                var resetPassword = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
                if (resetPassword.Errors.Any())
                {
                    return RedirectToAction("ResetPassword", "ForgotPassword", new
                    {
                        email = email,
                        resetToken = resetToken,
                        errors = resetPassword.Errors.Select(e => e.Description).ToArray()
                    });
                }
                else
                {
                    return Redirect(appSettings.WebsiteRedirectUrl);
                }
            }
            else
            {
                var errors = new List<string>();
                errors.Add("Email is invalid");

                return RedirectToAction("ResetPassword", "ForgotPassword", new
                {
                    email = email,
                    resetToken = resetToken,
                    errors = errors.ToArray()
                });
            }
        }
    }
}
