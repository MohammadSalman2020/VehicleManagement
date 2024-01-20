namespace VehicleManagement.Models.General
{
    public class StockTransfer
    {
        public string STONumber { get; set; }
        public DateTime FillingDate { get; set; }
        public string ShippingLocation { get; set; }
        public string ReceivingLocation { get; set; }

        public string LocationCopy { get; set; }
        public string ShippingOfficer { get; set; }
        public string DepotManagerShipping { get; set; }
        public string ReceivingOfficer { get; set; }
        public string DepotManagerReceiving { get; set; }
        public string ShippingAddress { get; set; }
        public string VehicleNumber { get; set; }
        public string CarriageContractor { get; set; }
        public string DispatchDateTime { get; set; }
        public string TotalCapacity { get; set; }
        public string ProductName { get; set; }
        public string DriverNameContact { get; set; }
        public Description Chamber1 { get; set; }
        public Description Chamber2 { get; set; }
        public Description Chamber3 { get; set; }
        public Description Chamber4 { get; set; }
        public Description Chamber5 { get; set; }
        public ReceivingDetails R_Chamber1 { get; set; }
        public ReceivingDetails R_Chamber2 { get; set; }
        public ReceivingDetails R_Chamber3 { get; set; }
        public ReceivingDetails R_Chamber4 { get; set; }
        public ReceivingDetails R_Chamber5 { get; set; }
        public DisptachQty DisQty { get; set; }
        public RecievedQty R_Qty { get; set; }

        public ShortageLtrs ShortageLtrs { get; set; }


        public string SealNo { get; set; }
        public string TotalSeals { get; set; }
        public string ShortageMM { get; set; }
        public string ShortageExempt { get; set; }
        public string ShortageCharge { get; set; }
        public string OtherShortage { get; set; }
        public string TotalShortage { get; set; }



        public StockTransfer()
        {
            Chamber1 = new Description();
            Chamber2 = new Description();
            Chamber3 = new Description();
            Chamber4 = new Description();
            Chamber5 = new Description();
            R_Chamber1 = new ReceivingDetails();
            R_Chamber2 = new ReceivingDetails();
            R_Chamber3 = new ReceivingDetails();
            R_Chamber4 = new ReceivingDetails();
            R_Chamber5 = new ReceivingDetails();
            DisQty = new DisptachQty();
            R_Qty = new RecievedQty();
            ShortageLtrs = new ShortageLtrs();


        }
    }
    public class ShortageLtrs
    {
        public string Natural { get; set; }
        public string F85 { get; set; }

    }
    public class RecievedQty
    {
        public string Natural { get; set; }
        public string F85 { get; set; }

    }
    public class DisptachQty
    {
        public string Natural { get; set; }
        public string F85 { get; set; }

    }
    public class DispatchSummary
    {
        public string Product { get; set; }
        public string QuantityNat { get; set; }
        public string QuantityL85 { get; set; }
        public string Temp { get; set; }
        public string SG { get; set; }
    }
    public class ReceivingDispatchSummary
    {
        public string Product { get; set; }
        public string QuantityNat { get; set; }
        public string QuantityL85 { get; set; }
        public string Temp { get; set; }
        public string SG { get; set; }
    }
    public class Description
    {
        public string ProductVolume { get; set; }
        public string ProductDip { get; set; }
        public string RefDip { get; set; }
    }

    public class ReceivingDetails
    {
        public string ProductVolume { get; set; }
        public string ProductDip { get; set; }
        public string Product_Diff_MM { get; set; }
        public string Product_Diff_LTR { get; set; }
    }

}
