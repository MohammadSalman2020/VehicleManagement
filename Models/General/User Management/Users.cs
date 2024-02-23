namespace VehicleManagement.Models.General.User_Management
{
    public class Users
    {
        public int RoleID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}
