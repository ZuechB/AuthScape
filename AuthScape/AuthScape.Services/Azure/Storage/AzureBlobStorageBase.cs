using Azure.Storage.Blobs.Models;
using CoreBackpack.Azure;
using CoreBackpack.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Services.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace AuthScape.Services.Azure.Storage
{
    public class AzureBlobStorageBase
    {
        readonly IBlobStorage blobStorage;
        readonly IImageService imageService;
        readonly AppSettings appSettings;

        public AzureBlobStorageBase(IBlobStorage blobStorage, IImageService imageService, IOptions<AppSettings> appSettings)
        {
            this.blobStorage = blobStorage;
            this.imageService = imageService;
            this.appSettings = appSettings.Value;
        }

        protected string GetStorageType(string container)
        {
            switch (appSettings.Stage)
            {
                case Models.Stage.Development:
                    container += "-development";
                    break;
                case Models.Stage.Staging:
                    container += "-staging";
                    break;
            }
            return container;
        }

        protected async Task RemoveBlob(string storageConnectionString, string containerName, string blobName)
        {
            var test = await blobStorage.DeleteBlob(storageConnectionString, containerName, blobName);
        }

        protected async Task<ReturnBlobInfo> UploadBlob(string storageConnectionString, IFormFile file, string containerName, string fileName, FileType fileType, bool overWrite = false, string cacheControl = "max-age=31536000")
        {
            var stream = file.OpenReadStream();

            string fileTypeVal = null;
            if (fileType == FileType.Image)
            {
                fileTypeVal = "image/*";
            }

            var blobContentInfo = await blobStorage.UploadBlob(storageConnectionString, containerName, fileName, stream, overWrite, cacheControl, fileTypeVal);

            return new ReturnBlobInfo()
            {
                BlobContentInfo = blobContentInfo,
                Size = file.Length
            };
        }

        protected async Task<ReturnBlobInfo> UploadBlobAsStream(string storageConnectionString, Stream stream, string containerName, string fileName, FileType fileType, bool overWrite = false, string cacheControl = "max-age=31536000")
        {
            string fileTypeVal = null;
            if (fileType == FileType.Image)
            {
                fileTypeVal = "image/*";
            }

            var blobContentInfo = await blobStorage.UploadBlob(storageConnectionString, containerName, fileName, stream, overWrite, cacheControl, fileTypeVal);

            return new ReturnBlobInfo()
            {
                BlobContentInfo = blobContentInfo,
                Size = stream.Length
            };
        }

        protected async Task<List<ReturnBlobInfo>> UploadBlobImageAsStream(string storageConnectionString, Stream file, string containerName, long Id, bool overWrite = false, string cacheControl = "max-age=31536000")
        {
            var imageSeperator = Guid.NewGuid().ToString();

            var imageSizeLarge = new CoreBackpack.Models.ImageSize();
            imageSizeLarge.width = 500;
            imageSizeLarge.height = 500;

            var streamLarge = imageService.ConvertPhoto(file, ImageMagick.MagickFormat.Jpg, imageSizeLarge);
            streamLarge.Seek(0, SeekOrigin.Begin);
            var blobContentInfoLarge = await blobStorage.UploadBlob(storageConnectionString, containerName, Id + "-" + imageSeperator + "-Large.jpg", streamLarge, overWrite, cacheControl, "image/*");


            var imageSizeMedium = new CoreBackpack.Models.ImageSize();
            imageSizeMedium.width = 200;
            imageSizeMedium.height = 200;

            var streamMedium = imageService.ConvertPhoto(file, ImageMagick.MagickFormat.Jpg, imageSizeMedium);
            streamMedium.Seek(0, SeekOrigin.Begin);
            var blobContentInfoMedium = await blobStorage.UploadBlob(storageConnectionString, containerName, Id + "-" + imageSeperator + "-Medium.jpg", streamMedium, overWrite, cacheControl, "image/*");


            var imageSizeSmall = new CoreBackpack.Models.ImageSize();
            imageSizeSmall.width = 120;
            imageSizeSmall.height = 120;

            var streamSmall = imageService.ConvertPhoto(file, ImageMagick.MagickFormat.Jpg, imageSizeSmall);
            streamSmall.Seek(0, SeekOrigin.Begin);
            var blobContentInfoSmall = await blobStorage.UploadBlob(storageConnectionString, containerName, Id + "-" + imageSeperator + "-Small.jpg", streamSmall, overWrite, cacheControl, "image/*");

            var blobs = new List<ReturnBlobInfo>();
            blobs.Add(new ReturnBlobInfo()
            {
                Uri = "https://blobstorage.com/" + containerName + "/" + Id + "-" + imageSeperator + "-Large.jpg",
                BlobContentInfo = blobContentInfoLarge,
                PhotoSize = PhotoSize.Large
            });

            blobs.Add(new ReturnBlobInfo()
            {
                Uri = "https://blobstorage.com/" + containerName + "/" + Id + "-" + imageSeperator + "-Medium.jpg",
                BlobContentInfo = blobContentInfoMedium,
                PhotoSize = PhotoSize.Medium
            });

            blobs.Add(new ReturnBlobInfo()
            {
                Uri = "https://blobstorage.com/" + containerName + "/" + Id + "-" + imageSeperator + "-Small.jpg",
                BlobContentInfo = blobContentInfoSmall,
                PhotoSize = PhotoSize.Small
            });

            return blobs;
        }
    }

    public class ReturnBlobInfo
    {
        public PhotoSize PhotoSize { get; set; }
        public string Uri { get; set; }
        public BlobContentInfo BlobContentInfo { get; set; }
        public long Size { get; set; }
    }

    public enum FileType
    {
        Image = 1,
        Other = 2
    }

    public enum PhotoSize
    {
        Large,
        Medium,
        Small,
        Any
    }
}