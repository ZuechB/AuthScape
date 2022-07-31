namespace AuthScape.Models.PaymentGateway
{
    public class PaymentRequest
    {
        public PaymentRequestType PaymentRequestType { get; set; }
        public decimal? Amount { get; set; } // Specify amount to charge an amount
        public string? PriceId { get; set; } // Specify PlanId to charge based on stripe PlanId (Includes subscriptions)
    }

    public enum PaymentRequestType
    {
        UserCard = 1,
        LocationCard = 2,
        CompanyCard = 3
    }
}