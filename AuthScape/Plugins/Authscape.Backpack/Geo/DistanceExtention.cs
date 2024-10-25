namespace AuthScape.Backpack.Geo
{
    public enum UnitMeasurement
    {
        Meters = 1,
        Miles = 2
    }

    public class DistanceExtention
    {
        public static double GetDistance(double longitude, double latitude, double otherLongitude, double otherLatitude, UnitMeasurement unit = UnitMeasurement.Meters)
        {
            var d1 = latitude * (Math.PI / 180.0);
            var num1 = longitude * (Math.PI / 180.0);
            var d2 = otherLatitude * (Math.PI / 180.0);
            var num2 = otherLongitude * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            var distanceInMeters = 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));

            if (unit == UnitMeasurement.Miles)
            {
                return distanceInMeters * 0.000621371; // Convert meters to miles
            }
            else
            {
                return distanceInMeters; // Return distance in meters
            }
        }
    }
}