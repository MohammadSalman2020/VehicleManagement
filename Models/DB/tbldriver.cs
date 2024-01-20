using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tbldriver
    {
        [Key, Column(Order = 0)]
        public int driverID { get; set; }
        public string drivername { get; set; }
        public string contact { get; set; }
    }
}
