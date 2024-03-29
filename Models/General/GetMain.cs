namespace VehicleManagement.Models.General
{
    public class GetMain
    {
        public string vehicleNumber { get; set; }
        public DateTime onMainDate { get; set; }
        public string mainFrom { get; set; }
        public string business { get; set; }
        public string reason { get; set; }
        public string location { get; set; }
        public int busID { get; set; }
        public int loadid { get; set; }
        public int mainid { get; set; }
        public bool isActive { get; set; }
    }
}
