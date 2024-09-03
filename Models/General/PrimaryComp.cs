namespace VehicleManagement.Models.General
{
    public class PrimaryComp
    {
        public string InvoiceNumber { get; set; }
        public double SystemCharge { get; set; }
        public double ClientCharge { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string TankLorryNo { get; set; }
        public string Product { get; set; }
        public string SupplyPoint { get; set; }
        public string ReceiptPoint { get; set; }
        public double ExDepotPrice { get; set; }
        public double ClientShortageCharge { get; set; }
        public double SystemShortageCharge { get; set; }
      
    }
}
