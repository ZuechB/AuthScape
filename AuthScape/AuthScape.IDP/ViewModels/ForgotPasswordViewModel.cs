using System.ComponentModel.DataAnnotations;

namespace AuthScape.IDP.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}