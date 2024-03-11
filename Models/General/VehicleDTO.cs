namespace VehicleManagement.Models.General
{
    public class VehicleDTO
    {
        public string vehicleID { get; set; }
        public string qty { get; set; }
        public string chamberSeq { get; set; }
        public DateTime dipChartExpiryDate { get; set; } = DateTime.Now;
        public int chamber1Qty { get; set; }
        public int chamber1Dip { get; set; }
        public int chamber2Qty { get; set; }
        public int chamber2Dip { get; set; }
        public int chamber3Qty { get; set; }
        public int chamber3Dip { get; set; }
        public int chamber4Qty { get; set; }
        public int chamber4Dip { get; set; }
        public int chamber5Qty { get; set; }
        public int chamber5Dip { get; set; }
        public bool isActive { get; set; }
    }
}
