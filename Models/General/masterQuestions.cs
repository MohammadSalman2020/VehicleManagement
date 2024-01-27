using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VehicleManagement.Models.General
{
    public class masterQuestions
    {
        [Key, Column(Order =0)]
        public int QuestionID { get; set; }
        public string QuestionDescription { get; set; }
        public string scope { get; set; }
    }
}
