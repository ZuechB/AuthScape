namespace AuthScape.IDP.Models
{
    public class TwoFactorAuthResponse
    {
        public string SharedKey { get; set; }
        public string AuthenticatorUri { get; set; }
    }
}
