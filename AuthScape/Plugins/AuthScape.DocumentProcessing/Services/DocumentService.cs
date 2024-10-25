using AuthScape.Document.Models;
using AuthScape.Models.Exceptions;
using AuthScape.Services;
using AuthScape.Services.Azure.Storage;
using CoreBackpack.Azure;
using CoreBackpack.Services;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;
using System.IO;
using System.Reflection.Metadata;

namespace AuthScape.DocumentProcessing.Services
{
    public interface IDocumentService
    {
        Task Upload(DocumentFile file);
        Task<List<DocumentItem>> GetDocuments(long? documentFieldCategoryId = null);
        Task<DocumentSegmentOptions> GetDocumentsAndFolders(Guid? parentId = null, ViewDocumentType ViewDocumentType = ViewDocumentType.User, long? fieldId1 = null, long? fieldId2 = null, long? fieldId3 = null);
        Task CreateFolder(string folderName, Guid? parentFolderId = null, ViewDocumentType ViewDocumentType = ViewDocumentType.User, long? fieldId1 = null, long? fieldId2 = null, long? fieldId3 = null);
        Task<byte[]> DownloadFile(Guid documentId, ViewDocumentType ViewDocumentType = ViewDocumentType.User);


        Task DeleteFile(Guid documentId);
        Task DeleteFolder(Guid folderId);

        Task<DocumentFolder> GetDocumentById(Guid folderId);

        Task ShareFile(Guid FileId, long UserId);
    }

    public class DocumentService : AzureBlobStorageBase, IDocumentService
	{
        readonly AppSettings appSettings;
        readonly DatabaseContext databaseContext;
        readonly IBlobStorage blobStorage;
        readonly IUserManagementService userManagementService;

        public DocumentService(IBlobStorage blobStorage, IImageService imageService, IOptions<AppSettings> appSettings, DatabaseContext databaseContext, IUserManagementService userManagementService) : base(blobStorage, imageService, appSettings)
        {
            this.appSettings = appSettings.Value;
            this.databaseContext = databaseContext;
            this.blobStorage = blobStorage;
            this.userManagementService = userManagementService;
        }

        public async Task DeleteFolder(Guid folderId)
        {
            // delete all documents and folders under the document
            await DeleteAllFilesAndFolders(folderId);
            await databaseContext.SaveChangesAsync();
        }

        private async Task DeleteAllFilesAndFolders(Guid folderId)
        {
            var folder = await databaseContext.DocumentFolders
                .Where(d => d.Id == folderId)
                .FirstOrDefaultAsync();

            databaseContext.DocumentFolders.Remove(folder);

            var files = await databaseContext.Documents
                .Where(d => d.DocumentFolderId == folder.Id)
                .ToListAsync();


            // remove all the files from blob
            foreach ( var document in files) 
            {
                await blobStorage.DeleteBlob(appSettings.Storage.AzureConnectionString, appSettings.DocumentProcessing.StorageContainer, document.Id + document.Extention);
            }
            databaseContext.Documents.RemoveRange(files);

            var folders = await databaseContext.DocumentFolders
                .Where(d => d.ParentId == folderId)
                .ToListAsync();


            foreach (var subFolder in folders)
            {
                await DeleteAllFilesAndFolders(subFolder.Id);
            }
        }

        public async Task<DocumentFolder> GetDocumentById(Guid folderId)
        {
            return await databaseContext.DocumentFolders
                .Where(d => d.Id == folderId)
                .FirstOrDefaultAsync();
        }

        public async Task Upload(DocumentFile file)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var extention = Path.GetExtension(file.file.FileName);

            // upload it
            var steam = file.file.OpenReadStream();
            steam.Seek(0, SeekOrigin.Begin);

            var newDocument = new DocumentItem()
            {
                FileName = file.file.FileName,
                Extention = extention,
                URI = "",
                Size = file.file.Length,
                Status = Status.InQueue,
                DocumentFolderId = file.ParentFolderId,
                LastUpdated = SystemTime.Now,
                Created = SystemTime.Now,
            };


            if (file.ViewType == ViewDocumentType.Company)
            {
                newDocument.CompanyId = signedInUser.CompanyId;
            }
            else if (file.ViewType == ViewDocumentType.User)
            {
                newDocument.UserId = signedInUser.Id;
            }
            else if (file.ViewType == ViewDocumentType.Identifier)
            {
                newDocument.Identifier = signedInUser.Identifier;
            }
            else
            {
                newDocument.UserId = signedInUser.Id;
            }

            await databaseContext.Documents.AddAsync(newDocument);
            await databaseContext.SaveChangesAsync();

            if (file.ParentFolderId != null)
            {
                var docFolder = await databaseContext.DocumentFolders.Where(d => d.Id == file.ParentFolderId).FirstOrDefaultAsync();
                if (docFolder != null)
                {
                    docFolder.LastUpdated = SystemTime.Now;
                }
            }

            // document upload

            if (extention.Contains("jpg") || extention.Contains("jpeg") || extention.Contains("png"))
            {
                await UploadBlobAsStream(appSettings.Storage.AzureConnectionString, steam, appSettings.DocumentProcessing.StorageContainer, newDocument.Id + extention, FileType.Image);
            }
            else
            {
                await UploadBlobAsStream(appSettings.Storage.AzureConnectionString, steam, appSettings.DocumentProcessing.StorageContainer, newDocument.Id + extention, FileType.Other);
            }

            newDocument.URI = (appSettings.DocumentProcessing.BaseURL + "/" + appSettings.DocumentProcessing.StorageContainer + "/" + newDocument.Id + newDocument.Extention);
            await databaseContext.SaveChangesAsync();

            //await azureDocumentReaderService.RunAnalysis(newDocument.Id);
        }

        public async Task DeleteFile(Guid documentId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var document = await databaseContext.Documents
                .Where(d => d.Id == documentId)
                .FirstOrDefaultAsync();

            if (document != null)
            {
                var successful = await blobStorage.DeleteBlob(appSettings.Storage.AzureConnectionString, appSettings.DocumentProcessing.StorageContainer, document.Id + document.Extention);
                if (successful)
                {
                    databaseContext.Documents.Remove(document);
                    await databaseContext.SaveChangesAsync();
                }
            }
        }

        public async Task<byte[]> DownloadFile(Guid documentId, ViewDocumentType ViewDocumentType = ViewDocumentType.User)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var documentItem = databaseContext.Documents
                .Where(d => d.Id == documentId);


            DocumentItem document = null;
            if (ViewDocumentType == ViewDocumentType.User)
            {
                document = await documentItem.Where(d => d.UserId == signedInUser.Id).FirstOrDefaultAsync();
            }
            else if (ViewDocumentType == ViewDocumentType.Company)
            {
                document = await documentItem.Where(d => d.CompanyId == signedInUser.CompanyId).FirstOrDefaultAsync();
            }
            else if (ViewDocumentType == ViewDocumentType.Identifier)
            {
                document = await documentItem.Where(d => d.Identifier == signedInUser.Identifier).FirstOrDefaultAsync();
            }


            var memoryStream = new MemoryStream();
            await blobStorage.DownloadPrivateBlob(appSettings.Storage.AzureConnectionString, appSettings.DocumentProcessing.StorageContainer, document.Id + document.Extention, memoryStream);

			return memoryStream.ToArray();
		}

        public async Task<List<DocumentItem>> GetDocuments(long? documentFieldCategoryId = null)
        {
            return await databaseContext.Documents.Where(d => d.DocumentFieldCategoryId == documentFieldCategoryId).ToListAsync();
        }

        public async Task<DocumentSegmentOptions> GetDocumentsAndFolders(Guid? parentId = null, ViewDocumentType ViewDocumentType = ViewDocumentType.User, long? fieldId1 = null, long? fieldId2 = null, long? fieldId3 = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var documentFolders = databaseContext.DocumentFolders
                .AsNoTracking()
                .Where(d => d.ParentId == parentId);

            #region Filtering 
            if (ViewDocumentType == ViewDocumentType.Company)
            {
                documentFolders = documentFolders.Where(c => c.CompanyId == signedInUser.CompanyId);
            }
            else if (ViewDocumentType == ViewDocumentType.User)
            {
                documentFolders = documentFolders.Where(c => c.UploadedByUserId == signedInUser.Id);
            }
            else if (ViewDocumentType == ViewDocumentType.Identifier)
            {
                documentFolders = documentFolders.Where(c => c.Identifier == signedInUser.Identifier);
            }

            if (fieldId1 != null)
            {
                documentFolders = documentFolders.Where(c => c.FieldId1 == fieldId1);
            }

            if (fieldId2 != null)
            {
                documentFolders = documentFolders.Where(c => c.FieldId2 == fieldId2);
            }

            if (fieldId3 != null)
            {
                documentFolders = documentFolders.Where(c => c.FieldId3 == fieldId3);
            }
            #endregion

            var documents = await documentFolders.Select(d => new DocumentAndFile()
             {
                 Id = d.Id,
                 Name = d.Name,
                 Type = "folder",
                 LastUpdated = d.LastUpdated.Convert(signedInUser.locale).ToLongDateString(),
                 IsLocked = d.IsLocked,
                 SegmentId = d.SegmentId,

             }).ToListAsync();

            foreach (var item in documents)
            {
                item.Count = await databaseContext.Documents.AsNoTracking()
                    .Where(d => d.DocumentFolderId == item.Id).CountAsync();
            }

            var documentFile = databaseContext.Documents
                .Where(d => d.DocumentFolderId == parentId)
                .AsNoTracking();

            #region Filter For Files
            if (ViewDocumentType == ViewDocumentType.Company)
            {
                documentFile = documentFile.Where(d => d.CompanyId ==  signedInUser.CompanyId);
            }
            else if (ViewDocumentType == ViewDocumentType.User)
            {
                documentFile = documentFile.Where(d => d.UserId == signedInUser.Id);
            }
            else if (ViewDocumentType == ViewDocumentType.Identifier)
            {
                documentFile = documentFile.Where(d => d.Identifier == signedInUser.Identifier);
            }
            #endregion

            var files = await documentFile.Select(d => new DocumentAndFile()
                 {
                     Id = d.Id,
                     Name = d.FileName,
                     Type = "file",
                     Uri = d.URI,
                     SegmentId = d.SegmentId,
                     DocumentFileExtentionType =
                        ((d.Extention.ToLower() == ".jpg" || d.Extention.ToLower() == ".jepg" || d.Extention.ToLower() == ".png") ?
                        DocumentFileExtentionType.Photo : DocumentFileExtentionType.None),
                     LastUpdated = d.LastUpdated.Convert(signedInUser.locale).ToLongDateString()
                 }).ToListAsync();

            documents.AddRange(files);

            var documentSegments = await databaseContext.DocumentSegments.ToListAsync();

            return new DocumentSegmentOptions()
            {
                DocumentAndFiles = documents,
                DocumentSegments = documentSegments
            };
        }
    
        public async Task CreateFolder(string folderName, Guid? parentFolderId = null, ViewDocumentType ViewDocumentType = ViewDocumentType.User, long? fieldId1 = null, long? fieldId2 = null, long? fieldId3 = null)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var newDocumentFolder = new DocumentFolder()
            {
                Name = folderName,
                ParentId = parentFolderId,
                LastUpdated = SystemTime.Now,
                Created = SystemTime.Now,
                FieldId1 = fieldId1,
                FieldId2 = fieldId2,
                FieldId3 = fieldId3
            };

            if (ViewDocumentType == ViewDocumentType.User)
            {
                newDocumentFolder.UploadedByUserId = signedInUser.Id;
            }
            else if (ViewDocumentType == ViewDocumentType.Company)
            {
                newDocumentFolder.CompanyId = signedInUser.CompanyId;
            }
            else if (ViewDocumentType == ViewDocumentType.Identifier)
            {
                newDocumentFolder.Identifier = signedInUser.Identifier;
            }
            else
            {
                newDocumentFolder.UploadedByUserId = signedInUser.Id;
            }

            await databaseContext.DocumentFolders.AddAsync(newDocumentFolder);
            await databaseContext.SaveChangesAsync();
        }

        public async Task ShareFile(Guid FileId, long UserId)
        {
            var shareFile = await databaseContext.SharedDocuments.Where(f => f.DocumentId == FileId && UserId == UserId).FirstOrDefaultAsync();
            if (shareFile != null)
            {
                //databaseContext.SharedDocuments.Remove
            }
            else
            {
                await databaseContext.SharedDocuments.AddAsync(new SharedDocument()
                {
                    DocumentId = FileId,
                    UserId = UserId,
                    Created = SystemTime.Now
                });
            }

            await databaseContext.SaveChangesAsync();
        }
    }
}
