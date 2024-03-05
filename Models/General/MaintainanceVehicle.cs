namespace VehicleManagement.Models.General
{
    public class MaintainanceVehicle
    {
        public string vehicleNumber { get; set; }
        public string work { get; set; }
        public string workStartDate { get; set; }
        public string expEndDate { get; set; }
        public string location { get; set; }
        public string status { get; set; }
        public string? currentlongitude { get; set; }
        public string? currentlatitude { get; set; }
    }
}
