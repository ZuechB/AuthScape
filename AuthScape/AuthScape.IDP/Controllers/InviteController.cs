using AuthScape.Models.Invite;
using AuthScape.Models.Users;
using CoreBackpack.Time;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Models.Invite;
using Services;
using Services.Context;
using Services.Database;
using System.Web;

namespace AuthScape.IDP.Controllers
{
    public class InviteController : Controller
    {
        readonly UserManager<AppUser> _userManager;
        readonly DatabaseContext _applicationDbContext;
        readonly IHttpContextAccessor _httpContextAccessor;
        readonly IMailService mailService;
        readonly AppSettings appSettings;

        public InviteController(UserManager<AppUser> userManager, DatabaseContext _applicationDbContext, IHttpContextAccessor _httpContextAccessor, IMailService mailService, IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            this._applicationDbContext = _applicationDbContext;
            this._httpContextAccessor = _httpContextAccessor;
            this.mailService = mailService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> InviteUsers([FromBody]List<InviteRequest> request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Request");
            }

            var errors = "";
            foreach (var user in request)
            {
                var newUser = new AppUser()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.Email,
                    NormalizedUserName = user.Email.ToUpper(),
                    Email = user.Email,
                    NormalizedEmail = user.Email.ToUpper(),
                    EmailConfirmed = false,
                    Roles = user.Role,
                    Created = SystemTime.Now,
                    locale = user.Locale,
                    IsActive = false,
                    CompanyId = user.CompanyId,
                    LocationId = user.LocationId,
                    PasswordHash = null,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    ConcurrencyStamp = null,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    PhoneNumber = user.PhoneNumber,
                    PhotoUri = null,
                    AccessFailedCount = 0
                };

                _applicationDbContext.Users.Add(newUser);
                await _applicationDbContext.SaveChangesAsync();

                var dbUser = await _applicationDbContext.Users.Where(u => u.Id == newUser.Id).FirstOrDefaultAsync();
                if (dbUser != null)
                {
                    try
                    {
                        var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(dbUser);
                        if (passwordResetToken != null)
                        {
                            var resetToken = System.Net.WebUtility.UrlEncode(passwordResetToken);
                            if (_httpContextAccessor.HttpContext != null)
                            {
                                string host = _httpContextAccessor.HttpContext.Request.Scheme + "://" +
                                    _httpContextAccessor.HttpContext.Request.Host.Value;

                                await mailService.InviteUser(
                                        user,
                                        dbUser,
                                        host + "/Invite/Signup?id=" + dbUser.Id + "&resetToken=" + resetToken
                                );
                            }
                        }
                    }
                    catch(Exception exp)
                    {
                        return BadRequest(exp.Message);
                    }
                }
            }

            return Json(new
            {
                errors = errors,
                success = String.IsNullOrWhiteSpace(errors) ? true : false
            });
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Signup(InviteViewModel inviteViewModel)
        {
            var dbUser = await _applicationDbContext.Users.Where(u => u.Id == inviteViewModel.Id).FirstOrDefaultAsync();
            if (dbUser != null)
            {
                inviteViewModel.FirstName = dbUser.FirstName;
                inviteViewModel.LastName = dbUser.LastName;
                inviteViewModel.Email = dbUser.UserName;

                var location = await _applicationDbContext.Locations.Where(l => l.Id == dbUser.LocationId).FirstOrDefaultAsync();
                if (location != null)
                {
                    inviteViewModel.LocationName = location.Name;
                }

                var company = await _applicationDbContext.Companies.Where(l => l.Id == dbUser.CompanyId).FirstOrDefaultAsync();
                if (company != null)
                {
                    inviteViewModel.CompanyName = company.Title;
                }

                return View(inviteViewModel);
            }

            return Redirect(appSettings.InviteSignupRedirectUrl);
        }

        [HttpPost]
        public async Task<IActionResult> AccountCreated(InviteViewModel inviteViewModel)
        {
            var dbUser = await _applicationDbContext.Users.Where(u => u.Id == inviteViewModel.Id).FirstOrDefaultAsync();
            if (dbUser != null)
            {
                if (String.IsNullOrWhiteSpace(inviteViewModel.FirstName) || 
                    String.IsNullOrWhiteSpace(inviteViewModel.LastName) || 
                    String.IsNullOrWhiteSpace(inviteViewModel.Password) || 
                    String.IsNullOrWhiteSpace(inviteViewModel.ConfirmPassword))
                {
                    return View("Signup", inviteViewModel);
                }

                var identityUser = await _userManager.ResetPasswordAsync(dbUser, inviteViewModel.ResetToken, inviteViewModel.Password);
                if (identityUser.Succeeded)
                {
                    dbUser.IsActive = true;
                    dbUser.WhenInviteSent = null;
                    dbUser.EmailConfirmed = true;

                    await _applicationDbContext.SaveChangesAsync();
                }
            }

            return Redirect(appSettings.InviteSignupRedirectUrl);
        }
    }
}