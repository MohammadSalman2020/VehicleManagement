using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using System.Security.Claims;

namespace VehicleManagement.Authentication
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {
        private readonly ProtectedSessionStorage _sessionStorage;
        private ClaimsPrincipal _anonymous = new ClaimsPrincipal(new ClaimsIdentity());

        public CustomAuthenticationStateProvider(ProtectedSessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage;
        }

        public static UserSession Session = new UserSession();
        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            try
            {
                //var userSessionStorageResult = await _sessionStorage.GetAsync<UserSession>("UserSession");

                //var userSession = userSessionStorageResult.Success ? userSessionStorageResult.Value : null;
                if (Session.Username == null)
                {
                    return await Task.FromResult(new AuthenticationState(_anonymous));
                }
                var ClaimsPrinciple = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {

                    new Claim(ClaimTypes.Name,Session.Username),
                    new Claim(ClaimTypes.Role,Session.Role),
                    new Claim(ClaimTypes.NameIdentifier,Session.BusinessName),
                    new Claim("BusinessID",Session.BusinessID),
                                        new Claim("rolee",Session.Role)

                }, "CustomAuth"));
                return await Task.FromResult(new AuthenticationState(ClaimsPrinciple));

            }
            catch
            {
                return await Task.FromResult(new AuthenticationState(_anonymous));
            }
        }

        public async Task UpdateAuthenticationState(UserSession userSession)
        {
            ClaimsPrincipal claimsPrincipal;
            if (userSession != null)
            {
               Session = userSession;
                claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {

                new Claim(ClaimTypes.Name,userSession.Username),
                new Claim(ClaimTypes.Role,userSession.Role),
                    new Claim(ClaimTypes.NameIdentifier,userSession.BusinessName),
                    new Claim("BusinessID",userSession.BusinessID),
                    new Claim("rolee",userSession.Role),
            }));

            }
            else
            {
                Session = new UserSession();
                //await _sessionStorage.DeleteAsync("UserSession");
                claimsPrincipal = _anonymous;
            }
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(claimsPrincipal)));
        }
    }
}
