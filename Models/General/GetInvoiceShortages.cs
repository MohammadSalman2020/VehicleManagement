namespace VehicleManagement.Models.General
{
    public class GetInvoiceShortages
    {
        public int busID { get; set; }
        public string invoiceID { get; set; }
        public DateTime dated { get; set; }
        public string vehicleID { get; set; }
        public string supplyPoint { get; set; }
        public string receiving { get; set; }
        public string type { get; set; }
        public string statusDesc { get; set; }
        public string statusColor { get; set; }
        public string business { get; set; }
        public string remarks { get; set; }
        public double primaryShortage { get; set; }
        public double secondaryShortage { get; set; }
        public double totalShortage { get; set; }
    }
}
