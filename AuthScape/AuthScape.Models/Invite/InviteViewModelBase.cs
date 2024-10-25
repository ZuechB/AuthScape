using System.ComponentModel.DataAnnotations;

namespace AuthScape.Models.Invite
{
    public class InviteViewModelBase
    {
        public long Id { get; set; }
        public string ResetToken { get; set; }

        public string? WebsiteUrlRedirect { get; set; }
        
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? LocationName { get; set; }
        public string? CompanyName { get; set; }

        public string? ErrorMessage { get; set; }
        public string? TimeZone { get; set; }

        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [Display(Name = "Password")]
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }


        /// <summary>
        /// The user already exists within the database, the user will be automatically become approved when the link is clicked
        /// </summary>
        public bool AlreadyWithinSystem { get; set; }

        // required
        public string? MinifiedCSS { get; set; }
    }
}