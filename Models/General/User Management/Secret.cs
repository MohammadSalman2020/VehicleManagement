namespace VehicleManagement.Models.General.User_Management
{
    public class Secret
    {
        public int UserID { get; set; }
    
        public string SecretKey{ get; set; }
        public DateTime ValidTill { get; set; } = DateTime.Now;
        public bool IsActive{ get; set; }


    }
}
