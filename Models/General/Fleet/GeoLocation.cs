public class GeoLocation
{
    private const double EarthRadius = 6371000; // Earth's radius in meters

    public static List<(double Latitude, double Longitude)> GenerateDataset(double centerLatitude, double centerLongitude)
    {
        const double radius = 100; // Radius in meters

        var dataset = new List<(double Latitude, double Longitude)>();

        // Convert radius from meters to radians
        double radiusInRadians = radius / EarthRadius;

        // Convert center coordinates to radians
        double centerLatitudeRadians = DegreesToRadians(centerLatitude);
        double centerLongitudeRadians = DegreesToRadians(centerLongitude);

        // Generate points along a circle
        for (int i = 0; i < 360; i++)
        {
            double angle = DegreesToRadians(i);
            double lat = Math.Asin(Math.Sin(centerLatitudeRadians) * Math.Cos(radiusInRadians) +
                                    Math.Cos(centerLatitudeRadians) * Math.Sin(radiusInRadians) * Math.Cos(angle));
            double lon = centerLongitudeRadians + Math.Atan2(Math.Sin(angle) * Math.Sin(radiusInRadians) * Math.Cos(centerLatitudeRadians),
                                                               Math.Cos(radiusInRadians) - Math.Sin(centerLatitudeRadians) * Math.Sin(lat));
            lat = RadiansToDegrees(lat);
            lon = RadiansToDegrees(lon);
            dataset.Add((lat, lon));
        }

        return dataset;
    }

    private static double DegreesToRadians(double degrees)
    {
        return degrees * Math.PI / 180.0;
    }

    private static double RadiansToDegrees(double radians)
    {
        return radians * 180.0 / Math.PI;
    }
}