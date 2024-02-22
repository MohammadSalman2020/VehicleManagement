using Microsoft.Data.SqlClient.Server;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

public class InspectionApiService
{
    
    public  string _apiBaseUrl;

    public InspectionApiService(string apiBaseUrl)
    {
        _apiBaseUrl = apiBaseUrl;
    }
    
    public  string GetRequest(string apipath)
    {
        try
        {

            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(_apiBaseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //    StringContent httpConent = new StringContent(username, Encoding.UTF8);
                HttpResponseMessage response = client.GetAsync($"api/Inspection/" + apipath).Result;
                if (response.IsSuccessStatusCode)
                {
                    //Use to read data into string
                    var Resultcode = response.Content.ReadAsStringAsync();
                    //use to convert data in string or you can map it to model properties as i did at cardlevel

                    return Resultcode.Result;
                }
                else
                {
                    return "404";
                }
            }

        }
        catch (Exception ex)
        {
            string s = ex.Message;
            return s;
        }
    }




    public  string PostRequest(string apipath, string jsonData)
    {
        try
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_apiBaseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.PostAsync($"api/Inspection/{apipath}", new StringContent(jsonData, Encoding.UTF8, "application/json")).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadAsStringAsync().Result;
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
            string s = ex.Message;
            return s;
        }
    }

    public  string PutRequest(string apipath, string jsonData)
    {
        try
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_apiBaseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.PutAsync($"api/Inspection/{apipath}", new StringContent(jsonData, Encoding.UTF8, "application/json")).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadAsStringAsync().Result;
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
            string s = ex.Message;
            return s;
        }
    }




}
