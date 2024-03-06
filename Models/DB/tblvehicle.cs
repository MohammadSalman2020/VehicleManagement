using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tblvehicle
    {
        [Key]
        public string vehicleID { get; set; }
        public int? busid { get; set; }
        public int? statusid { get; set; }
        public string? currentlocation { get; set; }
        public string? loadingpoint { get; set; }
        public string? decanting_point { get; set; }
        public string? WorkstartDate { get; set; }
        public string? WorkEndingDatetime { get; set; }
        public string? workDesc { get; set; }
        public string? lastUpdate { get; set; }
        public string? currentlongitude { get; set; }
        public string? currentlatitude { get; set; }
        public string? startLongitude { get; set; }
        public string? startLatitude { get; set; }
        public string? endLongitude { get; set; }
        public string? endLatitude { get; set; }
    }
}
