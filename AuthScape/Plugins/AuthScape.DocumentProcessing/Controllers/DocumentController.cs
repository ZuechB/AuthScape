using AuthScape.Document.Models;
using AuthScape.DocumentProcessing.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.DocumentProcessing.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class DocumentController : ControllerBase
    {
        readonly IDocumentService documentService;
        public DocumentController(IDocumentService documentService)
        {
            this.documentService = documentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFolder(NewFolderParam param)
        {
            await documentService.CreateFolder(param.FolderName, param.ParentFolderId, param.ViewDocumentType, param.FieldId1, param.FieldId2, param.FieldId3);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] DocumentFile documentFile)
        {
            await documentService.Upload(documentFile);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> DownloadDocument(Guid documentId, ViewDocumentType ViewDocumentType = ViewDocumentType.User)
        {
            var document = await documentService.DownloadFile(documentId, ViewDocumentType);
            return File(document, "application/octet-stream");
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentsAndFiles(Guid? parentFolderId = null, ViewDocumentType ViewDocumentType = ViewDocumentType.User, long? fieldId1 = null, long? fieldId2 = null, long? fieldId3 = null)
        {
            return Ok(await documentService.GetDocumentsAndFolders(parentFolderId, ViewDocumentType, fieldId1, fieldId2, fieldId3));
        }

        [HttpGet]
        public async Task<IActionResult> GetDocument(long? documentFieldCategoryId = null)
        {
            return Ok(await documentService.GetDocuments(documentFieldCategoryId));
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentByFolderId(Guid folderId)
        {
            return Ok(await documentService.GetDocumentById(folderId));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFolder(Guid documentId)
        {
            await documentService.DeleteFolder(documentId);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFile(Guid documentId)
        {
            await documentService.DeleteFile(documentId);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> ShareFile(ShareFile shareFile)
        {
            await documentService.ShareFile(shareFile.FileId, shareFile.UserId);
            return Ok();
        }
    }

    public class ShareFile
    {
        public Guid FileId { get; set; }
        public long UserId { get; set; }

    }

    public class AnalysisDocumentParam
    {
        public Guid DocumentId {get; set;}
        public long DocumentFieldCategoryId { get; set; }
    }

    public class NewFolderParam {

        public string FolderName { get; set; }
        public Guid? ParentFolderId { get; set; }
        public ViewDocumentType ViewDocumentType { get; set; }
        public long? FieldId1 { get; set; }
        public long? FieldId2 { get; set; }
        public long? FieldId3 { get; set; }
    }
}