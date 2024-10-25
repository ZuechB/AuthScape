namespace AuthScape.Backpack
{
    public static class NullableParse
    {
        public static int? ToNullableInt(this string s)
        {
            int i;
            if (int.TryParse(s, out i)) return i;
            return null;
        }

        public static long? ToNullableLong(this string s)
        {
            long i;
            if (long.TryParse(s, out i)) return i;
            return null;
        }

        public static float? ToNullableSingle(this string s)
        {
            float i;
            if (float.TryParse(s, out i)) return i;
            return null;
        }

        public static decimal? ToNullableDecimal(this string s)
        {
            decimal i;
            if (Decimal.TryParse(s, out i)) return i;
            return null;
        }

        public static bool? ToNullableBool(this string s)
        {
            bool i;
            if (Boolean.TryParse(s, out i)) return i;
            return null;
        }
    }
}