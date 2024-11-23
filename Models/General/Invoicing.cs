using Newtonsoft.Json;

namespace VehicleManagement.Models.General
{
    public class Invoicing
    {
        public Invoicing()
        {
            Details = new GeneralDetails();
            ShippingDetail = new ShippingDetails();
            ReceivingDetail = new ReceivingDetail();
            ShortageCalculation = new ShortageCalculation();
            CalculationDifference = new CalculationDiff();

        }
        [JsonProperty("details")]
        public GeneralDetails? Details { get; set; }
        [JsonProperty("shippingDetail")]
        public ShippingDetails? ShippingDetail { get; set; }
        [JsonProperty("receivingDetail")]
        public ReceivingDetail? ReceivingDetail { get; set; }
        [JsonProperty("shortageCalculation")]
        public ShortageCalculation? ShortageCalculation { get; set; }
        [JsonProperty("calculationDifference")]

        public CalculationDiff? CalculationDifference { get; set; }
        [JsonProperty("invoiceFilePath")]

        public string InvoiceFilePath { get; set; }
        [JsonProperty("isView")]

        public string IsView { get; set; }
        [JsonProperty("isFromDisplay")]

        public bool IsFromDisplay { get; set; } = false;
        [JsonProperty("user")]

        public string? User { get; set; }
        [JsonProperty("IsOCR")]

        public bool IsOCR { get; set; } = false;
        [JsonProperty("ExtarctedID")]

        public int ExtarctedID { get; set; } = 0;
        [JsonProperty("invoiceType")]

        public string invoiceType { get; set; } = string.Empty;
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
        [JsonProperty("tempF")]

        public float TempF { get; set; } = 0;
        [JsonProperty("sG")]
        public float SG { get; set; } = 0;
        [JsonProperty("chamber1")]
        public Recieve_Chamber? Chamber1 { get; set; }
        [JsonProperty("chamber2")]
        public Recieve_Chamber? Chamber2 { get; set; }
        [JsonProperty("chamber3")]
        public Recieve_Chamber? Chamber3 { get; set; }
        [JsonProperty("chamber4")]
        public Recieve_Chamber? Chamber4 { get; set; }
        [JsonProperty("chamber5")]
        public Recieve_Chamber? Chamber5 { get; set; }

    }

    public class Recieve_Chamber
    {
        [JsonProperty("chamberQuantity")]
        public int ChamberQuantity { get; set; } = 0;
        [JsonProperty("lorryDip")]
        public int LorryDip { get; set; } = 0;
        [JsonProperty("quantity")]
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

        [JsonProperty("tempF")]

        public float TempF { get; set; } = 0.0f;
        [JsonProperty("sG")]
        public float SG { get; set; } = 0.0f;
        [JsonProperty("chamber1")]
        public Ship_Chamber? Chamber1 { get; set; }
        [JsonProperty("chamber2")]
        public Ship_Chamber? Chamber2 { get; set; }
        [JsonProperty("chamber3")]
        public Ship_Chamber? Chamber3 { get; set; }
        [JsonProperty("chamber4")]
        public Ship_Chamber? Chamber4 { get; set; }
        [JsonProperty("chamber5")]
        public Ship_Chamber? Chamber5 { get; set; }

    }

    public class Ship_Chamber
    {
        [JsonProperty("chamberQuantity")]
        public int ChamberQuantity { get; set; } = 0;
        [JsonProperty("lorryDip")]
        public int LorryDip { get; set; } = 0;
        [JsonProperty("quantity")]
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
        [JsonProperty("chamber2")]
        public ShortageChamber? Chamber2 { get; set; }
        [JsonProperty("chamber3")]
        public ShortageChamber? Chamber3 { get; set; }
        [JsonProperty("chamber4")]
        public ShortageChamber? Chamber4 { get; set; }
        [JsonProperty("chamber5")]
        public ShortageChamber? Chamber5 { get; set; }

    }
    public class ShortageChamber
    {
        [JsonProperty("shortageMM")]
        public int ShortageMM { get; set; } = 0;
        [JsonProperty("totalShortageLtr")]
        public int TotalShortageLtr { get; set; } = 0;
    }

    public class GeneralDetails
    {
        [JsonProperty("tankLorryNO")]
        public string? TankLorryNO { get; set; }
        [JsonProperty("sTONo")]
        public string? STONo { get; set; }
        [JsonProperty("date")]
        public DateTime Date { get; set; } = DateTime.Now;
        [JsonProperty("supplyPoint")]
        public string? SupplyPoint { get; set; }
        [JsonProperty("contractor")]
        public string? Contractor { get; set; }
        [JsonProperty("receivingLocation")]
        public string? ReceivingLocation { get; set; }
        [JsonProperty("product")]
        public string? Product { get; set; }
    }

    public class CalculationDiff
    {
        [JsonProperty("tempDiff")]
        public float TempDiff { get; set; }
        [JsonProperty("shortage1FTemp")]
        public float Shortage1FTemp { get; set; }
        [JsonProperty("qtyShouldRecieved")]
        public float QtyShouldRecieved { get; set; }
        [JsonProperty("totalShortageByDip")]
        public float TotalShortageByDip { get; set; }
        [JsonProperty("shortOnTemp")]
        public float ShortOnTemp { get; set; }
        [JsonProperty("shortageCharge")]
        public float ShortageCharge { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }

    }


}
