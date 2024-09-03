namespace VehicleManagement.Models.General
{
    public class SecStockTransferDTO
    {
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string Transporter { get; set; }
        public string TankLorryNo { get; set; }
        public string Product { get; set; }
        public string InvoiceNumber { get; set; }
        public string Month { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int InvoicedQuantity { get; set; }
        public string SupplyPoint { get; set; }
        public double TripFreight { get; set; }
        public double SecShort { get; set; }
        public double SecShortageAmount { get; set; }
        public double ShortageChargesToCarriageLiters { get; set; }
        public double IndentPrice { get; set; }
        public double ShortageAmountChargesToContractor { get; set; }
        public string TransactionType { get; set; }
    }
}
