namespace Models.Invoice
{
    public class ChargeAmountWithExistingCardParam
    {
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
    }
}