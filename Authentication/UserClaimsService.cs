namespace VehicleManagement.Authentication
{
    using Microsoft.AspNetCore.Components.Authorization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface IUserClaimsService
    {
        Task<List<int>> GetBusinessIdsAsync();
    }

    public class UserClaimsService : IUserClaimsService
    {
        private readonly AuthenticationStateProvider _authenticationStateProvider;

        public UserClaimsService(AuthenticationStateProvider authenticationStateProvider)
        {
            _authenticationStateProvider = authenticationStateProvider;
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
    }

}
