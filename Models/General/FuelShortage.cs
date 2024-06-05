namespace VehicleManagement.Models.General
{
    public class FuelShortage
    {
        public int ShortMonth { get; set; }
        public int ShortYear { get; set; }
        public string DriverID { get; set; }
        public string Status { get; set; }
        public double Liters { get; set; }
        public double Difference { get; set; }
        public double Amount { get; set; }
        public string PrimaryReference { get; set; }
        public string VehicleID { get; set; }
        public DateTime? TripDate { get; set; }
        public bool IsActive { get; set; }
        public string User { get; set; }



    }
}
