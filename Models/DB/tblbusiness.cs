using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tblbusiness
    {
        [Key, Column(Order = 0)]
        public int busid { get; set; }
        public string busdesc { get; set; }
        public bool isactive { get; set; }
    }
}
