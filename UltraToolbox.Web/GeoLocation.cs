namespace Trafikverket.CDAS.SegmentAdministration.Web;

public class GeoLocation
{
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }

    public GeoLocation(decimal latitude, decimal longitude)
    {
        Latitude = latitude;
        Longitude = longitude;
    }
}