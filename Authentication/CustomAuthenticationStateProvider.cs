using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Http;
using RTools_NTS.Util;
using System.Security.Claims;

namespace VehicleManagement.Authentication
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {
        private readonly ProtectedSessionStorage _sessionStorage;
        private ClaimsPrincipal _anonymous = new ClaimsPrincipal(new ClaimsIdentity());
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISession _session;

        public CustomAuthenticationStateProvider(IHttpContextAccessor httpContextAccessor, ProtectedSessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage;
            _httpContextAccessor = httpContextAccessor;
            _session = _httpContextAccessor.HttpContext.Session;

        }

        public static UserSession Session = new UserSession();
        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            try
            {
                var token = _session.GetString("user");
                if (!string.IsNullOrWhiteSpace(token))
                {
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
                else
                {
                    return await Task.FromResult(new AuthenticationState(_anonymous));

                }
           

            }
            catch
            {
                return await Task.FromResult(new AuthenticationState(_anonymous));
            }
        }

        public async Task UpdateAuthenticationState(UserSession userSession)
        {
            try
            {
                ClaimsPrincipal claimsPrincipal;
                if (userSession != null)
                {
                    Session = userSession;
                    var session = _httpContextAccessor.HttpContext.Session;
                    session?.SetString("user", userSession.Username);
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
                    var session = _httpContextAccessor.HttpContext.Session;
                    session?.Remove("user");
                  
                    //await _sessionStorage.DeleteAsync("UserSession");
                    claimsPrincipal = _anonymous;
                }
                NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(claimsPrincipal)));
            }
            catch(Exception ex)
            {
                return ;
            }
          
        }
    }
}
