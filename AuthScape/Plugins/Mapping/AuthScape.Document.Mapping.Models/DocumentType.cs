using AuthScape.Document.Mapping.Models;

namespace AuthScape.Document.Mapping.Models
{
	public class DocumentType
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public string? TableName { get; set; }
		public string TypeName { get; set; }
		public string? AssemblyFullName { get; set; }
		public DocumentTypeEnum Type { get; set; }
        public ICollection<DocumentComponent> DocumentComponents { get; set; }
	}

	public enum DocumentTypeEnum
	{
		Database = 0, // driven by a model
		DynamicMapping = 1, // dynamic completely
		CustomModel = 2 // Any model
	}
}