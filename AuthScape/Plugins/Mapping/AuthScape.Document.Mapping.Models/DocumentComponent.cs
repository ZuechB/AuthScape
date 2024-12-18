using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Document.Mapping.Models
{
    public class DocumentComponent
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long DocumentTypeId { get; set; }

        public DocumentType DocumentType { get; set; }
        public ICollection<DocumentMapping> DocumentMappings { get; set; }

        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }
        public long? UserId { get; set; }

        public string? FileUri { get; set; }

        public DocumentComponentStatus Status { get; set; }


        public int HeaderRow { get; set; } = 1;

        [NotMapped]
        public string DocumentTypeName { get; set; }

        public string? Rules { get; set; }



        public DateTimeOffset? ArchivedDate { get; set; }
        public long? ArchivedBy { get; set; }




        public ICollection<Attribute>? Attributes { get; set; }
    }


    public enum DocumentComponentStatus
    {
        Open = 0,
        Archived = 1,
        Published = 2,
    }
}
