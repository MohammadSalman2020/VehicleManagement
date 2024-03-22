namespace VehicleManagement.Models.General
{
    public class AvailDraft
    {
        public int availID { get; set; }
        public string vehicleID { get; set; }
        public string chamberSEQ { get; set; }
        public string vehicleCap { get; set; }
        public string location { get; set; }
        public string driver1 { get; set; }
        public string driver2 { get; set; }
        public int business { get; set; }
        public string businessName { get; set; }
        public bool isActive { get; set; }

    }
}
