namespace AuthScape.IDP.ViewModels.ForgotPasword
{
    public class ResetPasswordViewModel
    {
        public string Email { get; set; }
        public string ResetToken { get; set; }

        public string NewPassword { get; set; }

        public string[] errors { get; set; }
    }
}