//using AuthScape.Models.Core;
//using Microsoft.AspNetCore.Http;
//using Microsoft.Extensions.Options;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace AuthScape.AzureCloudService.Storage
//{
//    public interface IAzureBlobStorage
//    {
//        Task<string> UploadFile(IFormFile file, string containerName, string name);
//        Task<AppIcons> StoreAppIcons(IFormFile file, string containerName, string Id, string cacheControl = "max-age=31536000");
//    }

//    public class AzureBlobStorage : AzureBlobStorageBase, IAzureBlobStorage
//    {
//        readonly IBlobStorage blobStorage;
//        readonly IImageService imageService;
//        readonly AppSettings appSettings;

//        public AzureBlobStorage(IBlobStorage blobStorage, IImageService imageService, IOptions<AppSettings> appSettings) : base(blobStorage, imageService, appSettings)
//        {
//            this.blobStorage = blobStorage;
//            this.imageService = imageService;
//            this.appSettings = appSettings.Value;
//        }

//        public async Task<string> UploadFile(IFormFile file, string containerName, string name)
//        {
//            var ft = FileType.Other;
//            var fi = new FileInfo(file.FileName);
//            if (fi.Extension == ".jpeg" || fi.Extension == ".jpg" || fi.Extension == ".png")
//            {
//                ft = FileType.Image;
//            }

//            await UploadBlob(appSettings.Storage.AzureConnectionString, file, containerName, (name + fi.Extension), ft, true);

//            return (name + fi.Extension);
//        }

//        public async Task<AppIcons> StoreAppIcons(IFormFile file, string containerName, string Id, string cacheControl = "max-age=31536000")
//        {
//            var imageSeperator = Guid.NewGuid().ToString();


//            // default
//            await blobStorage.UploadBlob(appSettings.Storage.AzureConnectionString, containerName, (Id + "-" + imageSeperator + ".jpg"), file.OpenReadStream(), true, cacheControl, "image/*");


//            // 16x16
//            var stream16 = imageService.ConvertPhoto(file, ImageMagick.MagickFormat.Jpg, new CoreBackpack.Models.ImageSize()
//            {
//                width = 16,
//                height = 16
//            });
//            stream16.Seek(0, SeekOrigin.Begin);
//            await blobStorage.UploadBlob(appSettings.Storage.AzureConnectionString, containerName, (Id + "-" + imageSeperator + "-16x16.jpg"), stream16, true, cacheControl, "image/*");


//            // 32x32
//            var stream32 = imageService.ConvertPhoto(file, ImageMagick.MagickFormat.Jpg, new CoreBackpack.Models.ImageSize()
//            {
//                width = 32,
//                height = 32
//            });
//            stream32.Seek(0, SeekOrigin.Begin);
//            await blobStorage.UploadBlob(appSettings.Storage.AzureConnectionString, containerName, (Id + "-" + imageSeperator + "-32x32.jpg"), stream32, true, cacheControl, "image/*");


//            return new AppIcons()
//            {
//                AppIconDefault = appSettings.Storage.BaseUri + "/" + containerName + "/" + (Id + "-" + imageSeperator + ".jpg"),
//                AppIcon16x16Uri = appSettings.Storage.BaseUri + "/" + containerName + "/" + (Id + "-" + imageSeperator + "-16x16.jpg"),
//                AppIcon32x32Uri = appSettings.Storage.BaseUri + "/" + containerName + "/" + (Id + "-" + imageSeperator + "-32x32.jpg"),
//            };
//        }

//    }
//}
