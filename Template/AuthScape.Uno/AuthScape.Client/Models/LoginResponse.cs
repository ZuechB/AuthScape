namespace AuthScape.Client.Models;
public class LoginResponse
{
    public LoginState state { get; set; }
    public string? access_token { get; set; }
    public string? refresh_token { get; set; }
    public string? expires_in { get; set; }
    public string? id_token { get; set; }
}
