using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tblRole
    {
        [Key, Column(Order = 0)]
        public int RoleID { get; set; }
        public string RoleDesc { get; set; }
    }
}
