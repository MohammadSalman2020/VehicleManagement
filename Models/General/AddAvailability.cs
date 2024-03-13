namespace VehicleManagement.Models.General
{
    public class AddAvailability
    {
        public int Driver1ID { get; set; }
        public int Driver2ID { get; set; }
        public string? VehicleID { get; set; }
        public string? VehicleLocation { get; set; }
        public string? Business { get; set; }
        public DateTime AvailDate { get; set; }
        public bool IsActive { get; set; }
    }
}
