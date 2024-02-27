namespace VehicleManagement.Models.General.User_Management
{
    public class Policies
    {
        public string PolicyName { get; set; }
        public int RoleID { get; set; }
        public Dictionary<int,string> Roles { get; set; }

    }
}
