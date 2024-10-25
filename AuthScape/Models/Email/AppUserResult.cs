using System.Net;

namespace Models.Email
{
    public class AppUserResult
    {
        public string Email { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}
