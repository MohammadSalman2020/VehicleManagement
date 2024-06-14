namespace VehicleManagement.Authentication
{
    using Microsoft.AspNetCore.Components.Authorization;
    using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using VehicleManagement.Models.General.User_Management;

    public interface IUserClaimsService
    {
        Task<List<int>> GetBusinessIdsAsync();
        Task<UserSession> GetSession();
        Task<List<GetBusiness>> GetBusinessDetailsAsync();
    }

    public class UserClaimsService : IUserClaimsService
    {
        private readonly AuthenticationStateProvider _authenticationStateProvider;
        private readonly ProtectedSessionStorage _sessionStorage;
        public UserClaimsService(AuthenticationStateProvider authenticationStateProvider, ProtectedSessionStorage sessionStorage)
        {
            _authenticationStateProvider = authenticationStateProvider;
            _sessionStorage = sessionStorage;
        }
        public async Task<List<int>> GetBusinessIdsAsync()
        {
            var authState = await _authenticationStateProvider.GetAuthenticationStateAsync();
            var user = authState.User;
            List<int> businessIds = new List<int>();

            if (user != null)
            {

                var businessesClaim = user.Claims.FirstOrDefault(c => c.Type == "BusinessID");

                if (businessesClaim != null)
                {
                    var businessIdsString = businessesClaim.Value.Split(',');
                    foreach (var idString in businessIdsString)
                    {
                        if (int.TryParse(idString, out int id))
                        {
                            businessIds.Add(id);
                        }
                        else
                        {
                            // Handle parsing error if necessary
                        }
                    }
                }
            }

            return businessIds;
        }
        public async Task<List<GetBusiness>> GetBusinessDetailsAsync()
        {
            var authState = await _authenticationStateProvider.GetAuthenticationStateAsync();
            var user = authState.User;
            List<GetBusiness> businessIds = new List<GetBusiness>();

            if (user.Identity.IsAuthenticated)
            {

                var businessesClaim = user.Claims.FirstOrDefault(c => c.Type == "BusinessID");
                var businessesClaim2 = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

                if (businessesClaim != null)
                {
                    var businessIdsString = businessesClaim.Value.Split(',');
                    var businessNamesString = businessesClaim2.Value.Split(',');
                    for (int i = 0; i <= businessIdsString.Length - 1; i++)
                    {
                        if (int.TryParse(businessIdsString[i], out int id))
                        {
                            businessIds.Add(new GetBusiness
                            {
                                busID = id,
                                busDesc = businessNamesString[i]
                            });
                        }
                        else
                        {
                            // Handle parsing error if necessary
                        }
                    }
                }
            }

            return businessIds;
        }
        public async Task<UserSession> GetSession()
        {

            UserSession UserSessions = new UserSession();

            var rec = await _sessionStorage.GetAsync<UserSession>("UserSession");
            UserSessions = rec.Success ? rec.Value : null;
            return UserSessions;
        }
    }

}
