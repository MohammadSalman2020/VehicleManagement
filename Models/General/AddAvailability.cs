namespace VehicleManagement.Models.General
{
    public class AddAvailability
    {
        public string Driver1ID { get; set; }
        public string Driver2ID { get; set; }
        public string? VehicleID { get; set; }
        public string? VehicleLocation { get; set; }
        public int Business { get; set; }
        public DateTime AvailDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
