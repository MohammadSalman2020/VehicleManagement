﻿namespace VehicleManagement.ApiService
{
    public interface IApiService
    {
         Task<string> GetRequest(string apipath);
         Task<string> PostRequest(string apipath, string jsonData);
         Task<string> PostRequest(string apipath);
         Task<string> PutRequest(string apipath);
         Task<string> PutRequest(string apipath, string jsondata);
    }
}
