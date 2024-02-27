namespace VehicleManagement.Models.General.User_Management
{
    public class GetSecret
    {
        public int userID { get; set; }
        public int userSecretID { get; set; }
        public string role { get; set; }
        public string secretKey { get; set; }
        public DateTime validTill { get; set; }
        public string username { get; set; }

        public bool isActive { get; set; }
    }
}
