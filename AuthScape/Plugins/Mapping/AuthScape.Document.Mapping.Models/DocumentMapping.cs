using AuthScape.Document.Mapping.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthScape.Document.Mapping.Models
{
	public class DocumentMapping
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; }

		public long DocumentComponentId { get; set; }

		public string Name { get; set; } // PropertyName In Database
		public string? Description { get; set; }
		public string ToName { get; set; } // could also be this property name

		public string? UploadedSheetUri { get; set; }

		public bool IsSearchableKey { get; set; }

		public bool OnlyAddRowIfColumnFound { get; set; }
		public bool RememberForNextTime { get; set; }

		public bool IsNewColumn { get; set; }
		public AttributeFieldType AttributeFieldType { get; set; }

		public bool IsColumnRequired { get; set; }

        public long? CompanyId { get; set; }
		public long? UserId { get; set; }
		public long? LocationId { get; set; }

		public DocumentComponent DocumentComponents { get; set; }
	}

	public class DocumentMappingQuery
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public DocumentTypeEnum DocumentType { get; set; }

		public List<DocumentMapping> DocumentMappings { get; set; }
    }
}