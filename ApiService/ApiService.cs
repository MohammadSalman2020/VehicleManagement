﻿using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;

namespace VehicleManagement.ApiService
{
    public class ApiService : IApiService
    {
        private readonly string _apiBaseUrl;
        private readonly ProtectedSessionStorage _sessionStorage;
        private readonly IJSRuntime _jsRuntime;

        public ApiService(IConfiguration configuration, IJSRuntime jsRuntime)
        {
            _apiBaseUrl = configuration.GetValue<string>("API:Url");
           
            _jsRuntime = jsRuntime;
        }

        public async Task<string> GetRequest(string apipath)
        {
            try
            {
                string bearer = await _jsRuntime.InvokeAsync<string>("sessionStorage.getItem", "BearerToken");

                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_apiBaseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    if (bearer != null)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
                    }
                    HttpResponseMessage response = await client.GetAsync(apipath);
                    if (response.IsSuccessStatusCode)
                    {
                        // Use to read data into string
                        var Resultcode = await response.Content.ReadAsStringAsync();
                        // Use to convert data in string or you can map it to model properties as I did at cardlevel
                        return Resultcode;
                    }
                    else
                    {
                        return "";
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> PostRequest(string apipath, string jsonData)
        {
            try
            {
                string bearer = await _jsRuntime.InvokeAsync<string>("sessionStorage.getItem", "BearerToken");
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_apiBaseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    if (bearer != null)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
                    }
                    HttpResponseMessage response = await client.PostAsync(apipath, new StringContent(jsonData, Encoding.UTF8, "application/json"));
                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        return result;
                    }
                    else
                    {
                        return "";
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
