using AuthScape.Spreadsheet;
using AuthScape.Spreadsheet.Models.Images;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Products
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Qty { get; set; }




        public bool HasCompleted { get; set; }

        public ProductType productType { get; set; }
        public DateTime WhenToRelease { get; set; }
        public bool IsArchived { get; set; }
        [NotMapped]
        public SheetPhoto Photo { get; set; }
        [NotMapped]
        public List<SheetPhoto> Photos { get; set; }
    }
}
