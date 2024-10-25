using System.Collections.Generic;

namespace AuthScape.Models.PaymentGateway.Coupons
{
    public class Coupon
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CouponType CouponType { get; set; }


        //public ICollection<ProductCoupon> ProductCoupons { get; set; }
    }
}