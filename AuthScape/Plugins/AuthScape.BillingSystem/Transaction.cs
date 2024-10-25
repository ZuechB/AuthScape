namespace AuthScape.BillingSystem
{
    public class Transaction
    {
        public long Id { get; set; }


        /// <summary>
        /// User who processed the transaction
        /// </summary>
        public long ProcessedUserId { get; set; }
    }

    public class TransactionShipTo
    {
        public long Id { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
    }

    public class TransactionLineItem
    {
        public long Id { get; set; }

    }
}
