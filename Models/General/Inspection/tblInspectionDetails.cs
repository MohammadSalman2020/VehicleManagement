namespace VehicleManagement.Models.General.Inspection
{
    public class tblInspectionDetails
    {
        public int insp_Detail_ID { get; set; }
        public int inspID { get; set; }
        public int template_Detail_ID { get; set; }
        public bool yes { get; set; }
        public bool no { get; set; }
        public bool na { get; set; }
        public string remarks { get; set; }
        public string attachment { get; set; }
    }
}
