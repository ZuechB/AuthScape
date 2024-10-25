namespace AuthScape.Backpack
{
    public static class SystemTime
    {
        public static DateTimeOffset Now
        {
            get
            {
                return DateTimeOffset.UtcNow;
            }
        }
    }
}
