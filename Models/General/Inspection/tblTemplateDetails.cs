namespace VehicleManagement.Models.General.Inspection
{
    public class tblTemplateDetails
    {
        public int tdid { get; set; }
        public int tempID { get; set; }
        public int obsID { get; set; }
        public int scopeID { get; set; }
        public string obsDesc { get; set; }
        public string scopeDesc { get; set; }
        public string remarks { get; set; }
        public bool yes { get; set; }
        public bool no { get; set; }
        public bool na { get; set; }

    }
}
