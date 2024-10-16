namespace VehicleManagement.Models.General
{
    public class OCRData
    {
        public int OCRID { get; set; }
        public int BusinessID { get; set; }
        public string? InvoiceType { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string? ReceivingLocation { get; set; }
        public string? ShippingLocation { get; set; }
        public string? STO { get; set; }
        public string? Vehicle { get; set; }
        public string? BusinessName { get; set; }
        public string? Product { get; set; }
        public string? FileLocation { get; set; }
        public bool isInvoiceGenerated { get; set; }
    }
}
