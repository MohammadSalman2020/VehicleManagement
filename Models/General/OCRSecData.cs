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
        public int rec_dip { get; set; }
        public int RecDip
        {
            get => rec_dip;
            set
            {
                rec_dip = value;

                if (rec_dip == ChamberQty) // ChamberQuantity should replace with the master data quantity of that chamber
                {
                    RecLiters = 0;
                    ShortExcess = 0;
                }
                else
                {
                    // Ensure floating-point division by casting ChamberQuantity or ChamberDip to double
                    double dividentchamber = (double)ChamberQty / ChamberDip;
                    RecLiters = Math.Round(dividentchamber * rec_dip, 0);
                    ShortExcess = Math.Round((double)ChamberQty - RecLiters, 0);
                }
            }
        }

        // Calculated property for RecLiters
        public double RecLiters { get; set; }

        // Calculated property for ShortExcess
        private double shortExcess;
        public double ShortExcess
        {
            get => shortExcess;
            set
            {
                shortExcess = value;
                // Update Status based on ShortExcess value
                Status = shortExcess < 0 ? "Extra" : shortExcess > 0 ? "Short" : "-";
            }
        }

        public string Status { get; private set; } // Make the setter private to prevent external modification
    }

 
}
