namespace VehicleManagement.Models.General.Driver
{
    public class DriverShortage
    {
        public int invoiceID { get; set; }
        public int busid { get; set; }
        public string? driverID { get; set; }
        public string? driverName { get; set; }
        public string? driver2ID { get; set; }
        public string? driver2Name { get; set; }
        public string? invoiceNumber { get; set; }
        public string? invoiceType { get; set; }
        public double ltr { get; set; }
        public string status { get; set; }
        public DateTime dated { get; set; }
        public DateTime? dateAdded { get; set; }
        public string vehicleID { get; set; }
        public string username { get; set; }
        public bool isChecked { get; set; }
        public List<DriverShortageSec> shortages { get; set; }
    }


    public class DriverShortageSec
    {
        public int invoiceID { get; set; }

        public string? vehicleID { get; set; }

        public string? driverID { get; set; }
        public string? driverName { get; set; }
        public string? driver2ID { get; set; }
        public string? driver2Name { get; set; }
        public string? invoiceNumber { get; set; }
        public string? invoiceType { get; set; }
        public double ltr { get; set; }
        public string? status { get; set; }
        public DateTime dated { get; set; }
        public string userName { get; set; }
        public DateTime dateAdded { get; set; }
    }
}
