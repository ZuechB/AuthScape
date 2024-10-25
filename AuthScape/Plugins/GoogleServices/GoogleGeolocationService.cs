using AuthScape.GoogleServices.Models;
using GoogleMaps.LocationServices;

namespace AuthScape.GoogleServices
{
    public interface IGoogleGeolocationService
    {
        GeoLocationResponse GetGeolocation(string address, string city, string state, string postalCode);
    }

    public class GoogleGeolocationService : IGoogleGeolocationService
    {
        readonly string apiKey;
        public GoogleGeolocationService(string apiKey)
        {
            this.apiKey = apiKey;
        }

        public GeoLocationResponse GetGeolocation(string address, string city, string state, string postalCode)
        {
            try
            {
                var gls = new GoogleLocationService(apiKey);
                var mapPoint = gls.GetLatLongFromAddress(new AddressData()
                {
                    Address = address,
                    City = city,
                    State = state,
                    Zip = postalCode
                });

                return new GeoLocationResponse()
                {
                    Latitude = mapPoint.Latitude,
                    Longitude = mapPoint.Longitude
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
