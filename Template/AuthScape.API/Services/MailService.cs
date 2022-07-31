using AuthScape.Models.Users;

namespace Services
{
    public interface IMailService
    {
        Task ForgotPassword(AppUser user, string PasswordResetToken);
    }

    public class MailService : IMailService
    {
        public async Task ForgotPassword(AppUser user, string PasswordResetToken)
        {
            // send the email using sendgrid, however the user can change it to whatever they want...




        }
    }
}