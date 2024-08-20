using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace VehicleManagement.Models.General
{
    public class TrackerData
    {
        private string _vehicleName;
        public string vehicleId { get; set; }
        public string vehicleName
        {
            get => _vehicleName;
            set => _vehicleName = TrimVehicleName(value);
        }
        private string TrimVehicleName(string name)
        {
            if (string.IsNullOrEmpty(name))
                return name;

            // Regular expression to match the suffixes like 50KL, 60 KL, 75KL, etc.
            string pattern = @"\s*\d+\s*KL\b";
            return Regex.Replace(name, pattern, "").Trim();
        }
        public string lat { get; set; }
        public string @long { get; set; } // Using @ to escape reserved keyword 'long'
        public string lng { get; set; } // Using @ to escape reserved keyword 'long'

        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime timestamp { get; set; }
        public string speed { get; set; }
        public string engineStatus { get; set; }
        public string locationname { get; set; }
        public string location { get; set; }
        public string vehicledirectionangle { get; set; }
        public string fueldata { get; set; }
    }
    public class CustomDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string dateString = reader.GetString();
            return DateTime.ParseExact(dateString, "yyyy-MM-dd HH:mm:ss", null);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}
