namespace AuthScape.Analytics.Models
{
    public class AnalyticsLogin
    {
        public string Method { get; set; } // local, Indeal, google, microsoft, apple
        public long UserId { get; set; }
        public DateTimeOffset? Created { get; set; }
        public bool Signup { get; set; }

    }
}