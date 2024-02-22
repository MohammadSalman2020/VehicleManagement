using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;
using VehicleManagement.ApiService;
using VehicleManagement.Models.DB;
using VehicleManagement.Models.General.Login;

namespace VehicleManagement.Authentication.Policy
{
    public class CustomPolicyProvider
    {
        private readonly IApiService API;
        private readonly string _apiBaseUrl;
        public CustomPolicyProvider(IApiService aPI, IConfiguration configuration)
        {
            API = aPI;
            _apiBaseUrl = configuration.GetValue<string>("API:Url");

        }

        public async Task<IEnumerable<Policy>> GetPoliciesAsync()
        {
            List<Policy> obj = new List<Policy>();
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_apiBaseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync("Login/GetPolicies");
                    if (response.IsSuccessStatusCode)
                    {
                        // Use to read data into string
                        var Resultcode = await response.Content.ReadAsStringAsync();
                        // Use to convert data in string or you can map it to model properties as I did at cardlevel
                        var Policies = JsonSerializer.Deserialize<List<Policy>>(Resultcode);
                        if (Policies.Count > 0)
                        {
                            foreach (var item in Policies)
                            {
                                obj.Add(new Policy
                                {
                                    policyName = item.policyName,
                                    role = item.role
                                });
                            }
                        }


                    }

                }
            }
            catch (Exception ex)
            {
               
            }
            return obj;
        }
    }
    public class Policy
    {
        public string policyName { get; set; }
        public string role { get; set; }
    }
}
