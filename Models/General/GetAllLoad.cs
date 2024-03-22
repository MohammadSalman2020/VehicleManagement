namespace VehicleManagement.Models.General
{
    public class GetAllLoad
    {
        public int loadID { get; set; }
        public int availID { get; set; }
        public int businessID { get; set; }

        public string vehicle { get; set; }
        public string chamberSeq { get; set; }
        public string loading { get; set; }
        public string decenting { get; set; }
        public bool isActive{ get; set; }
    }
}
