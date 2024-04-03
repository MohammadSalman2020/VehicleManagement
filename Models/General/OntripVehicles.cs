namespace VehicleManagement.Models.General
{
    public class OntripVehicles
    {
        public string? vehicleNumber { get; set; }
        public string? business { get; set; }
        public string? location { get; set; }
        public string? lat { get; set; }
        public string? longii { get; set; }
        public int businessID { get; set; }
        public DateTime? tripStart { get; set; }
        public DateTime? tripEnd { get; set; }
    }
}
