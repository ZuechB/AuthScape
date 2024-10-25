using AuthScape.SendGrid.Models;
namespace Models.Email
{
    public class InviteEmail : BaseEmail
    {
        public string CompanyName { get; set; }
        public string AcceptInviteLink { get; set; }
    }
}