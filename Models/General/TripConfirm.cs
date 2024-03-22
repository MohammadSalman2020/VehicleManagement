namespace VehicleManagement.Models.General
{
    public class TripConfirm
    {
        public int loadID { get; set; }
        public string vehicleID { get; set; }
        public string business { get; set; }
        public int businessID { get; set; }

        public string loadingPoint { get; set; }
        public string decentingPoint { get; set; }
        public DateTime loadAssignDate { get; set; }
        public string driver1 { get; set; }
        public string driver2 { get; set; }
    }
}
