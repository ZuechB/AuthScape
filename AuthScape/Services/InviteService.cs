using AuthScape.Models.Invite;
using AuthScape.Models.Users;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Models.Invite;
using Services.Context;

namespace Services
{
    public interface IInviteService
    {
        Task<List<AppUser>> OnInviteUser(DatabaseContext _applicationDbContext, List<InviteRequest> userRequests);
        Task OnInviteCompleted(AppUser appUser, InviteViewModel inviteViewModel);
        Task OnInvitePageLoading(InviteViewModel inviteViewModel, AppUser dbUser);
    }

    public class InviteService : IInviteService
    {
        readonly DatabaseContext databaseContext;
        public InviteService(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<List<AppUser>> OnInviteUser(DatabaseContext _applicationDbContext, List<InviteRequest> userRequests)
        {
            var newUserInvites = new List<AppUser>();
            foreach (var user in userRequests)
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

                // add new user to list to send an invite
                newUserInvites.Add(newUser);
            }

            return newUserInvites;
        }

        public async Task OnInviteCompleted(AppUser appUser, InviteViewModel inviteViewModel)
        {
            appUser.FirstName = inviteViewModel.FirstName;
            appUser.LastName = inviteViewModel.LastName;
            appUser.IsActive = true;
            appUser.WhenInviteSent = null;
            appUser.EmailConfirmed = true;

            if (appUser.CompanyId != null)
            {
                var company = await databaseContext.Companies.Where(c => c.Id == appUser.CompanyId).FirstOrDefaultAsync();
                if (company != null)
                {
                    company.Title = inviteViewModel.CompanyName;
                }
            }
        }

        public async Task OnInvitePageLoading(InviteViewModel inviteViewModel, AppUser dbUser)
        {
            
        }
    }
}
