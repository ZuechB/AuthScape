using System.Reflection;

namespace AuthScape.Document.Mapping.Models
{
	public class FileHeader
	{
		public string Name { get; set; }
		public PropertyInfo? ToValue { get; set; }
		public FileHeaderDataType FileHeaderDataType { get; set; }
		public int ColumnNumber { get; set; }
		public int RowNumber { get; set; }
		public bool IsRequired { get; set; }
	}

	public enum FileHeaderDataType
	{
		String = 1,
		Decimal = 2,
		Boolean = 3,
		DateTime = 4,
		Integer = 5,
		Guid = 6,
		DateTimeOffset = 7,
        Byte = 8
    }
}