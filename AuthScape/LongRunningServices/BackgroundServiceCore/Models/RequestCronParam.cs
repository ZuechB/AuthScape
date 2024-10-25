namespace AuthScape.BackgroundServiceCore.Models
{
    public class RequestCronParam
    {
        public string CronExpression { get; set; } = @"0 2 * * *";
        public string TimeZoneById { get; set; } = "Eastern Standard Time";
        public string ActivityName { get; set; }
    }
}
