namespace VehicleManagement.Models.General
{
    public class MaintainanceVehicle
    {
        public string VehicleNumber { get; set; }
        public string Work { get; set; }
        public string WorkStartDate { get; set; }
        public string ExpEndDate { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string? Currentlongitude { get; set; }
        public string? Currentlatitude { get; set; }
    }
}
