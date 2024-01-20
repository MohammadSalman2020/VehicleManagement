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
        public string? LastUpdate { get; set; }
        public string? Currentlongitude { get; set; }
        public string? Currentlatitude { get; set; }
        public string? StartLongitude { get; set; }
        public string? StartLatitude { get; set; }
        public string? EndLongitude { get; set; }
        public string? EndLatitude { get; set; }
    }
}
