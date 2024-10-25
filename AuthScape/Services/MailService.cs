using AuthScape.Models.Users;
using AuthScape.Models.Webhooks;
using AuthScape.SendGrid;
using Microsoft.EntityFrameworkCore;
using Models.Email;
using Models.Invite;
using Services.Context;

namespace Services
{
    public interface IMailService
    {
        Task InviteUser(AppUser user, string PasswordResetToken);
        Task ForgotPassword(AppUser user, string PasswordResetToken);
        Task InboundWebhook(SendGridWebhookContent sendGridWebhookContent);
    }

    public class MailService : IMailService
    {
        readonly ISendGridService sendGridService;
        readonly DatabaseContext databaseContext;
        public MailService(ISendGridService sendGridService, DatabaseContext databaseContext)
        {
            this.sendGridService = sendGridService;
            this.databaseContext = databaseContext;
        }

        public async Task InviteUser(AppUser user, string PasswordResetToken)
        {
            if (user.CompanyId != null)
            {
                var company = await databaseContext.Companies.Where(c => c.Id == user.CompanyId.Value).FirstOrDefaultAsync();
                if (company != null)
                {
                    //await sendGridService.Send(user, "d-2c11bc19c4534d89bcd5358dc63c8988", new InviteEmail()
                    //{
                    //    CompanyName = company.Title,
                    //    AcceptInviteLink = PasswordResetToken

                    //});
                }
            }
        }

        public async Task ForgotPassword(AppUser user, string PasswordResetToken)
        {
            // send the email using sendgrid, however the user can change it to whatever they want...

        }
    
        public async Task InboundWebhook(SendGridWebhookContent sendGridWebhookContent)
        {
            
        }
    }
}