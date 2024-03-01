namespace VehicleManagement.Models.General.Inspection
{
    public class CheckList
    {
        public int InspectionID { get; set; }
        public int TemplateDetailID { get; set; }
        public string Scope { get; set; }
        public string Description { get; set; }
        public bool Yes { get; set; }
        public bool No { get; set; }
        public bool NA { get; set; }
        public byte[]? image { get; set; }
        public string? Remarks { get; set; }
    }
}
