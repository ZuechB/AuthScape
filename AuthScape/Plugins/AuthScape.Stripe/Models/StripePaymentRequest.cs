using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.StripePayment.Models
{
    public class StripePaymentRequest
    {
        public string id { get; set; }
        public string _string { get; set; }
        public StripePaymentRequest_Billing_Details billing_details { get; set; }
        public StripePaymentRequest_Card card { get; set; }
        public int created { get; set; }
        public string customer { get; set; }
        public bool livemode { get; set; }
        public StripePaymentRequest_Metadata metadata { get; set; }
        public string type { get; set; }
    }

    public class StripePaymentRequest_Billing_Details
    {
        public StripePaymentRequest_Address address { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
    }

    public class StripePaymentRequest_Address
    {
        public string city { get; set; }
        public string country { get; set; }
        public string line1 { get; set; }
        public string line2 { get; set; }
        public string postal_code { get; set; }
        public string state { get; set; }
    }

    public class StripePaymentRequest_Card
    {
        public string brand { get; set; }
        public StripePaymentRequest_Checks checks { get; set; }
        public string country { get; set; }
        public int exp_month { get; set; }
        public int exp_year { get; set; }
        public string funding { get; set; }
        public string generated_from { get; set; }
        public string last4 { get; set; }
        public StripePaymentRequest_Three_D_Secure_Usage three_d_secure_usage { get; set; }
        public string wallet { get; set; }
    }

    public class StripePaymentRequest_Checks
    {
        public string address_line1_check { get; set; }
        public string address_postal_code_check { get; set; }
        public string cvc_check { get; set; }
    }

    public class StripePaymentRequest_Three_D_Secure_Usage
    {
        public bool supported { get; set; }
    }

    public class StripePaymentRequest_Metadata
    {
    }
}
