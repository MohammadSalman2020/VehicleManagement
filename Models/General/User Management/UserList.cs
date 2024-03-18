namespace VehicleManagement.Models.General.User_Management
{
    public class UserList
    {
        public int userID { get; set; }
        public int roleID { get; set; }
        public string role { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string business { get; set; }
        public bool isActive { get; set; }
    }
}
