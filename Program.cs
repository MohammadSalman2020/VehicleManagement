using Blazored.Toast;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using Syncfusion.Blazor;
using VehicleManagement.ApiService;
using VehicleManagement.Authentication;
using VehicleManagement.Authentication.Policy;
using VehicleManagement.Data;
using VehicleManagement.Models.DB;
using VehicleManagement.Service;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); // Adjust as needed
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true; // Ensure session cookie is always sent
});
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<WeatherForecastService>();
builder.Services.AddSingleton<UserAccountService>();
builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();
builder.Services.AddScoped<IUserClaimsService, UserClaimsService>();
builder.Services.AddScoped<IApiService, ApiService>();
builder.Services.AddScoped<ProtectedSessionStorage>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);


builder.Services.AddScoped<CustomPolicyProvider>();
builder.Services.AddAuthorization(async options =>
{
    var serviceProvider = builder.Services.BuildServiceProvider();
    var policyService = serviceProvider.GetRequiredService<CustomPolicyProvider>();
    var policies = await policyService.GetPoliciesAsync();

    foreach (var policy in policies)
    {
        var trimmedPolicyName = policy.policyName.Trim();
        var roles = policy.role.Split(',').Select(r => r.Trim()).ToArray();

        options.AddPolicy(trimmedPolicyName, policy =>
            policy.RequireRole(roles)
        );
    }
});

builder.Services.AddBlazoredToast();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseRouting();
app.UseSession();
//app.Use(async delegate (HttpContext Context, Func<Task> Next)
//{
//    //this throwaway session variable will "prime" the SetString() method
//    //to allow it to be called after the response has started
//    var TempKey = Guid.NewGuid().ToString(); //create a random key
//    Context.Session.Set(TempKey, Array.Empty<byte>()); //set the throwaway session variable
//    Context.Session.Remove(TempKey); //remove the throwaway session variable
//    await Next(); //continue on with the request
//});
app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapBlazorHub();


app.UseAuthorization();
app.UseAuthentication();

app.MapFallbackToPage("/_Host");

await app.RunAsync();
