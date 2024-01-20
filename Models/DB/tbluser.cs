using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tbluser
    {
        [Key, Column(Order = 0)]
        public int UserID { get; set; }
        public string username { get; set; }
     
        public int RoleID { get; set; }
        public string password { get; set; }
        public bool isactive { get; set; }


    }
}
