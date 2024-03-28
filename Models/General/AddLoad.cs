namespace VehicleManagement.Models.General
{
    public class AddLoad
    {
        public int availID { get; set; }
        public string loading { get; set; }
        public string decenting { get; set; }
        public string product { get; set; }
        public DateTime dated { get; set; }
        public int businessID { get; set; }
        public bool isActive { get; set; } = true;
    }
}
