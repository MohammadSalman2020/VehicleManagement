namespace VehicleManagement.Models.General
{
    public class Invoicing
    {
        public Invoicing()
        {
            Details= new GeneralDetails();
            ShippingDetail = new ShippingDetails();
            ReceivingDetail = new ReceivingDetail();
            ShortageCalculation = new ShortageCalculation();
            CalculationDifference = new CalculationDiff();

        }
        public GeneralDetails? Details { get; set; }
        public ShippingDetails? ShippingDetail { get; set; }
        public ReceivingDetail? ReceivingDetail { get; set; }
        public ShortageCalculation? ShortageCalculation { get; set; }
        public CalculationDiff? CalculationDifference { get; set; }

        public string InvoiceFilePath { get; set; }
        public string IsView { get; set; }
        public bool IsFromDisplay { get; set; } = false;
    }

    public class ReceivingDetail
    {
        public ReceivingDetail()
        {
            Chamber1 = new Recieve_Chamber();
            Chamber2 = new Recieve_Chamber();
            Chamber3 = new Recieve_Chamber();
            Chamber4 = new Recieve_Chamber();
            Chamber5 = new Recieve_Chamber();
        }
        public float TempF { get; set; } = 0;
        public float SG { get; set; } = 0;
        public Recieve_Chamber? Chamber1 { get; set; }
        public Recieve_Chamber? Chamber2 { get; set; }
        public Recieve_Chamber? Chamber3 { get; set; }
        public Recieve_Chamber? Chamber4 { get; set; }
        public Recieve_Chamber? Chamber5 { get; set; }

    }

    public class Recieve_Chamber
    {
        public int ChamberQuantity { get; set; } = 0;
        public int LorryDip { get; set; } = 0;
        public int Quantity { get; set; } = 0;
       
    }

    public class ShippingDetails
    {
        public ShippingDetails()
        {
            Chamber1 = new Ship_Chamber();
            Chamber2 = new Ship_Chamber();
            Chamber3 = new Ship_Chamber();
            Chamber4 = new Ship_Chamber();
            Chamber5 = new Ship_Chamber();
        }
        public float TempF { get; set; } = 0;
        public float SG { get; set; } = 0;
        public Ship_Chamber? Chamber1 { get; set; }
        public Ship_Chamber? Chamber2 { get; set; }
        public Ship_Chamber? Chamber3 { get; set; }
        public Ship_Chamber? Chamber4 { get; set; }
        public Ship_Chamber? Chamber5 { get; set; }

    }

    public class Ship_Chamber
    {
        public int ChamberQuantity { get; set; } = 0;
        public int LorryDip { get; set; } = 0;
        public int Quantity { get; set; } = 0;
    }
    public class ShortageCalculation
    {
        public ShortageCalculation()
        {
            Chamber1 = new ShortageChamber();
            Chamber2 = new ShortageChamber();
            Chamber3 = new ShortageChamber();
            Chamber4 = new ShortageChamber();
            Chamber5 = new ShortageChamber();
        }

        public ShortageChamber? Chamber1 { get; set; }
        public ShortageChamber? Chamber2 { get; set; }
        public ShortageChamber? Chamber3 { get; set; }
        public ShortageChamber? Chamber4 { get; set; }
        public ShortageChamber? Chamber5 { get; set; }

    }
    public class ShortageChamber
    {
        public int ShortageMM { get; set; } = 0;
        public int TotalShortageLtr { get; set; } = 0;
    }

    public class GeneralDetails
    {
        public string? TankLorryNO { get; set; }
        public string? STONo { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? SupplyPoint { get; set; }
        public string? Contractor { get; set; }
        public string? ReceivingLocation { get; set; }
        public string? Product { get; set; }
    }

    public class CalculationDiff
    {
        public float TempDiff { get; set; }
        public float Shortage1FTemp { get; set; }
        public float QtyShouldRecieved { get; set; }
        public float TotalShortageByDip { get; set; }
        public float ShortOnTemp { get; set; }
        public float ShortageCharge { get; set; }
     
    }


}
