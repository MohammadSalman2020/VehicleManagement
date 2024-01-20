using System.ComponentModel.DataAnnotations;

namespace VehicleManagement.Models.DB
{
    public class tblInvoice
    {
        [Key]
        public string InvoiceNo { get; set; }
        public string FillingDate { get; set; }
        public string VehicleNumber { get; set; }
        public string DecentingPoint { get; set; }
    }
}
