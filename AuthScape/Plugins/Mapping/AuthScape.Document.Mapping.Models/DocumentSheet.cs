
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Document.Mapping.Models
{
    //public class Sheet
    //{
    //    public Guid Id { get; set; }
    //    public string Name { get; set; }
    //    public long CompanyId { get; set; }
    //}

    public class DocumentSheet
    {
        public Guid Id { get; set; }
        //public Guid SheetId { get; set; }
        public string Name { get; set; }
        public long CompanyId { get; set; }

        public ICollection<SheetAttribute> SheetAttributes { get; set; }
    }

    public class Attribute
    {
        public Guid Id { get; set; }
        public long? DocumentComponentId { get; set; }

        public string Name { get; set; }

        [NotMapped]
        public string? VisibleName { get; set; }
        [NotMapped]
        public bool IsMapped { get; set; }

        public bool IsRequired { get; set; }

        public AttributeFieldType Type { get; set; }
        public long CompanyId { get; set; }

        public ICollection<SheetAttribute> SheetAttributes { get; set; }
        public DocumentComponent? DocumentComponent { get; set; }
    }

    public class SheetAttribute
    {
        public Guid ProductId { get; set; }
        public Guid AttributeId { get; set; }
        public string Value { get; set; }

        public DocumentSheet Sheet { get; set; }
        public Attribute Attribute { get; set; }
    }
}