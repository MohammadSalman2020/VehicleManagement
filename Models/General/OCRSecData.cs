namespace VehicleManagement.Models.General
{
    public class OCRSecData
    {
        public int ExtractedID { get; set; }
        public string StoNo { get; set; }
        public string VehicleNo{ get; set; }
        public string FileLocation{ get; set; }
        public string RecievingLocation { get; set; }
        public string ShippingLocation { get; set; }
        public string Product { get; set; }
        public DateTime FillingDate{ get; set; }

        public int ChamberQty { get; set; }
        public int ChamberDip { get; set; }
        public int ChamberNo { get; set; }
        public string User{ get; set; }
        public bool isView{ get; set; }
        public List<ChambersDetailsSec> Chambers { get; set; }  = new List<ChambersDetailsSec>();
    }

    public class ChambersDetailsSec
    {
        public int ChamberQty { get; set; }
        public int ChamberDip { get; set; }
        public int ChamberNo { get; set; }
    }

 
}
