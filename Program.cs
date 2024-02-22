using Blazored.Toast;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using VehicleManagement.ApiService;
using VehicleManagement.Authentication;
using VehicleManagement.Authentication.Policy;
using VehicleManagement.Data;
using VehicleManagement.Models.DB;
using VehicleManagement.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Con")));

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddSingleton<WeatherForecastService>();
builder.Services.AddSingleton<UserAccountService>();
builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();
builder.Services.AddScoped<IApiService, ApiService>();
builder.Services.AddScoped<ProtectedSessionStorage>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddHttpContextAccessor();

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

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");
app.UseAuthorization();
app.UseAuthentication();



await app.RunAsync();
