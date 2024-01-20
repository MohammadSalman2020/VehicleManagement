using VehicleManagement.DBModals.DB;

namespace VehicleManagement.Service
{
    public class UserAccountService
    {
        private List<User> _Users;
        public UserAccountService()
        {
            _Users = new List<User>
            {
                new User{Username="Admin",Password="123",Role="Admin"},
                new User{Username="user",Password="123",Role="User"},
                
            };

        }
        public User? GetByUsername(string Username,string Password)
        {
            return _Users.FirstOrDefault(x=>x.Username==Username && x.Password==Password);
        }
    }
}
