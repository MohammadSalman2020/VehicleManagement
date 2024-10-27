namespace VehicleManagement.Models.General
{
    public class OCRSecDTO
    {
        public int ExtractedID { get; set; }
        public string STONO { get; set; }
        public string VehicleNo { get; set; }
        public DateTime? FillingDate { get; set; }
        public string FileLocation { get; set; }
        public string ProductName { get; set; }
        public string RecievingLocation { get; set; }
        public string PrimaryInvoiceNumber { get; set; }
        public string ShippingLocation { get; set; }

        // List to hold related chamber details
        public List<ChamberDetailsDTO> ChamberDetails { get; set; }
    }
    public class ChamberDetailsDTO
    {
        public int ExtractedID { get; set; }
        public string STONO { get; set; }
        public int ChamberQuantity { get; set; }
        public int ChamberDip { get; set; }
        public int ChamberNo { get; set; }
        public int CumulativeChamberQuantity { get; set; }
        public int TotalVehicleChamberQuantity { get; set; }
        public int InvoiceChamberQuantity { get; set; }
        public int InvoiceLorryDip { get; set; }
    }

}
