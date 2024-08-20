namespace VehicleManagement.Models.General
{
    public class DriverShortageSummaries
    {
        public string stono { get; set; }
        public string VehicleNo { get; set; }
        public string Location { get; set; }
        public string Date { get; set; }
        public string primaryreference { get; set; }
        public string type { get; set; }
        public string DriverID1 { get; set; }
        public string DriverName1 { get; set; }
        public string DriverID2 { get; set; }
        public string DriverName2 { get; set; }
        public double Primary { get; set; }
        public double Secondary { get; set; }
        public double Total { get; set; }
        public int Exempted { get; set; }
        public double ShortageDeduction { get; set; }
    }
}
