using AuthScape.Models.Storage;

namespace AuthScape.Document.Models
{
    public class DocumentFile : FileStorage
    {
        public Guid? ParentFolderId { get; set; }
        public ViewDocumentType ViewType { get; set; }
    }
}