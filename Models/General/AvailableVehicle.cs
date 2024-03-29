﻿namespace VehicleManagement.Models.General
{
    public class AvailableVehicle
    {
        public string? vehicleNumber { get; set; }
        public string? driverID1 { get; set; }
        public string? driverID2 { get; set; }
        public string? vehicleLocation { get; set; }
        public string? currentLocation { get; set; }
        public string? lat { get; set; }
        public string? longi { get; set; }
        public DateTime availableDate { get; set; }
        public string? business { get; set; }
        public int businessID { get; set; }
    }
}
