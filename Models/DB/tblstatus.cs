using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tblstatus
    {
        [Key, Column(Order = 0)]
        public int statusid { get; set; }
        public string statusdesc { get; set; }
    }
}
