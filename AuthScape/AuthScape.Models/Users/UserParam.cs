namespace AuthScape.Models.Users
{
    public class UserParam
    {
        public int offset { get; set; } = 1;
        public int length { get; set; } = 10;
        public int userState { get; set; } = 0;
    }
}
