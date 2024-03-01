using Newtonsoft.Json;

namespace VehicleManagement.Models.General.Inspection
{
    public class tblInspection
    {
        public int inspID { get; set; }
        
        public DateTime date_Time { get; set; }
        public string Origian { get; set; }
        public string destination { get; set; }
        public string company { get; set; }
        public string driver1_Code { get; set; }
        public string driver1_Name { get; set; }
        public string driver2_Code { get; set; }
        public string driver2_Name { get; set; }
        public bool celphoneKnowledge { get; set; }
        public string product { get; set; }
        public string vehicleID { get; set; }
        public string capacity { get; set; }
        public bool d1_Licance { get; set; }
        public bool d2_Licance { get; set; }
        public bool d1_D2_Mentaly_Alert { get; set; }
        public bool termCard { get; set; }
        public bool validDipChart { get; set; }
        public bool validExplosiveCert { get; set; }
        public bool fittnessCert { get; set; }
        public bool hydroTest { get; set; }
        public string tankNo { get; set; }
        public string trailerNo { get; set; }
    }
}
