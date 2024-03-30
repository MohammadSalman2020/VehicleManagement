namespace VehicleManagement.Models.General
{
    public class OnLoadVehicle
    {
        public string vehicleID { get; set; }
        public string loadingPoint { get; set; }
        public string decantingPoint { get; set; }
        public DateTime loadAssignDate { get; set; }
        public int busID { get; set; }
        public string business { get; set; }
        public string location { get; set; }
        public string lat { get; set; }
        public string longii { get; set; }
    }
}
