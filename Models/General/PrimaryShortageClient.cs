namespace VehicleManagement.Models.General
{
    public class PrimaryShortageClient
    {
        public DateTime TransactionDate { get; set; }
        public string Month { get; set; }
        public string LorryNo { get; set; }
        public string VendorName { get; set; }
        public string ProductName { get; set; }
        public string StockTransferAdviceNumber { get; set; }
        public int StockTransferAdviceQuantity { get; set; }
        public string SupplyPoint { get; set; }
        public string ReceiptPoint { get; set; }
        public double PrimaryFreight { get; set; }
        public double PrimaryFreightValue { get; set; }
        public int PrimaryShortageLiters { get; set; }
        public double PShortageChargeToCarriage { get; set; }
        public int ExemptionLiters { get; set; }
        public double ExDepotPrice { get; set; }
        public double ValueOfPrimaryShortage { get; set; }
        public double ValueOfShortageExemptedOnTemperature { get; set; }
        public double ValueOfShortageChargedToCarriage { get; set; }
    }
}
