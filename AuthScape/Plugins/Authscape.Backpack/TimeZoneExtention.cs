using TimeZoneConverter;

namespace AuthScape.Backpack
{
    public static class TimeZoneExtention
    {
        public static DateTime Convert(this DateTimeOffset datetime, string timeZoneId)
        {
            TimeZoneInfo tzi2 = TZConvert.GetTimeZoneInfo(timeZoneId);

            var dt = TimeZoneInfo.ConvertTime(datetime, tzi2);

            return dt.DateTime;
        }

        public static string ConvertIanaIdToWindowsTime(string IanaId)
        {
            try
            {
                return TZConvert.IanaToWindows(IanaId);
            }
            catch (Exception)
            {
                return "Eastern Standard Time";
            }
        }

        public static void GetTimeZones()
        {
            foreach (TimeZoneInfo z in TimeZoneInfo.GetSystemTimeZones())
                Console.WriteLine(z.Id);
        }
    }
}