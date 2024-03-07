using System.Text.Json;
using System.Text.Json.Serialization;

namespace VehicleManagement.Models.General
{
    public class TrackerData
    {
        public string vehicleId { get; set; }
        public string lat { get; set; }
        public string @long { get; set; } // Using @ to escape reserved keyword 'long'

        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime timestamp { get; set; }
        public string speed { get; set; }
        public string engineStatus { get; set; }
        public string locationname { get; set; }
        public string Vehicledirectionangle { get; set; }
        public string Fueldata { get; set; }
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
