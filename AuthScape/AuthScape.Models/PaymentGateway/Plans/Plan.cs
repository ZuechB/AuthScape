namespace AuthScape.Models.PaymentGateway.Plans
{
    public class Plan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PriceId { get; set; } // optional if you want one off payments
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public bool IsMostPopular { get; set; } // makes bigger and shows as most popular
        public bool IsContactUs { get; set; } // requires user to contact us

        // interval
        public Interval Interval { get; set; }
        public byte IntervalCount { get; set; }
    }

    public class SimplePlan
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string subheader { get; set; }
        public decimal price { get; set; }
        public string priceId { get; set; }
        public string description { get; set; }
        public string buttonText { get; set; }
        public string buttonVariant { get; set; }
        public Interval interval { get; set; }
        public byte intervalCount { get; set; }
    }

    public enum Interval
    {
        Weekly = 1,
        Monthly = 2,
        Yearly = 3,
        SinglePurchase = 4 // not an inteval based purchase just a one time purchase
    }
}