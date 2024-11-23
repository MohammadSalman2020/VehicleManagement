namespace VehicleManagement.Models.General
{
    public class ChamberData
    {
        public int ChamberNumber { get; set; }
        public int Capacity { get; set; }
        public int DispatchDips { get; set; }
        public int ReceivingDips { get; set; }
        public double DiffInDipsMm => ReceivingDips - DispatchDips;
        public double ShortByDipLiters => Capacity - ReceivedQuantity;
        public double ReceivedQuantity
        {
            get
            {
                if (DispatchDips == 0)
                {
                    return 0;
                }

                // Step 1: Perform floating-point division
                double divisionResult = (double)Capacity / DispatchDips;

                // Step 2: Multiply the result by ReceivingDips
                double result = divisionResult * ReceivingDips;

                return result;
            }
        }
    }



    public class SummaryData
    {
        public string Status => CarriageShortage<0 ? "Short" : "Extra";

        public double DispatchTemperature { get; set; }
        public double DispatchSG { get; set; }
        public double ReceivingTemperature { get; set; }
        public double ReceivingSG { get; set; }
        public double TempDifference => ReceivingTemperature- DispatchTemperature;
        public double CompanyShareOnShortage { get; set; }
        public double Short1FTemp => CompanyShareOnShortage/TempDifference;
        public double DispatchAt85F { get; set; }
        public double ReceivedAt85F { get; set; }
        public double CarriageShortage => ReceivedAt85F-DispatchAt85F;
        public double Percentage { get; set; }
    }


    public class EuroCal
    {
        public string? VehicleNo { get; set; }
        public string? STONo { get; set; }
        public string? ShippingLoc { get; set; }
        public string? ReceivingLoc { get; set; }
        public string? Contractor { get; set; }
        public string? Product { get; set; }
        public string? User { get; set; }
        public string? FileLocation { get; set; }
        public string? InvoiceType { get; set; }
        public int BusinessID { get; set; }
        public int ExtractedID { get; set; }
        public DateTime InvoiceDate { get; set; }
        public double TotalCapacity => Chambers.Sum(c => c.Capacity);
        public double TotalDiffInDipsMm => Chambers.Sum(c => c.DiffInDipsMm);
        public double TotalShortByDipLiters => Chambers.Sum(c => c.ShortByDipLiters);
        public double TotalReceivedQty => Chambers.Sum(c => c.ReceivedQuantity);
        public List<ChamberData> Chambers { get; set; }
        public SummaryData SummaryDetails { get; set; }
    }
}
