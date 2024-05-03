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
        // public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        // {
        //     try
        //     {
        //         Attempt to retrieve user session from session storage
        //         var userSessionStorageResult = await _sessionStorage.GetAsync<UserSession>("UserSession");

        //         If session retrieval is successful, extract user session, otherwise set to null
        //         var userSession = userSessionStorageResult.Success ? userSessionStorageResult.Value : null;

        //         If user session is null, return anonymous authentication state
        //         if (userSession == null)
        //         {
        //             return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
        //         }

        //         Create claims for authenticated user

        //        var claims = new List<Claim>
        //{
        //     new Claim(ClaimTypes.Name, userSession.Username),
        //     new Claim(ClaimTypes.Role, userSession.Role)
        //      Add more claims as needed
        //};

        //         Create claims identity and principal
        //        var identity = new ClaimsIdentity(claims, "CustomAuth");
        //         var principal = new ClaimsPrincipal(identity);

        //         Return authenticated authentication state
        //         return new AuthenticationState(principal);
        //     }
        //     catch (Exception ex)
        //     {
        //         Log any exceptions that occur during authentication state retrieval
        //         Consider logging the exception for troubleshooting purposes

        //        Console.WriteLine($"Error retrieving authentication state: {ex.Message}");

        //         Return anonymous authentication state in case of errors
        //         return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
        //             }
        //     }

        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            try
            {
                var userSessionStorageResult = await _sessionStorage.GetAsync<UserSession>("UserSession");

                var userSession = userSessionStorageResult.Success ? userSessionStorageResult.Value : null;
                if (userSession == null)
                {
                    return await Task.FromResult(new AuthenticationState(_anonymous));
                }
                var ClaimsPrinciple = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {

                    new Claim(ClaimTypes.Name,userSession.Username),
                    new Claim(ClaimTypes.Role,userSession.Role),
                    new Claim(ClaimTypes.NameIdentifier,userSession.BusinessName),
                    new Claim("BusinessID",userSession.BusinessID),
                                        new Claim("rolee",userSession.Role)

                }, "CustomAuth"));
                return await Task.FromResult(new AuthenticationState(ClaimsPrinciple));

            }
            catch(Exception ex)
            {
                return await Task.FromResult(new AuthenticationState(_anonymous));
            }
        }

        public async Task UpdateAuthenticationState(UserSession userSession)
        {
            ClaimsPrincipal claimsPrincipal;
            if (userSession != null)
            {
                await _sessionStorage.SetAsync("UserSession", userSession);
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
                await _sessionStorage.DeleteAsync("UserSession");
                claimsPrincipal = _anonymous;
            }
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(claimsPrincipal)));
        }
    }
}