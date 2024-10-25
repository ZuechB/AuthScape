using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Analytics.Models
{
    public class AnalyticsPurchase
    {
        public Guid Id { get; set; }
        public string TransactionId { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal? Tax { get; set; }

    }
}
