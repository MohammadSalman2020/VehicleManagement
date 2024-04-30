namespace VehicleManagement.Models.General
{
    public class AddAvailability
    {

        public List<string> VehicleID = new List<string>();
        public string? VehicleLocation { get; set; }
        public int Business { get; set; }
        public DateTime AvailDate { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
