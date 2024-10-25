using System.IO.Compression;

namespace AuthScape.Backpack
{
    public static class ZipArchiveExtension
    {
        public static ZipArchiveDirectory CreateDirectory(this ZipArchive @this, string directoryPath)
        {
            return new ZipArchiveDirectory(@this, directoryPath);
        }
    }

    public class ZipArchiveDirectory
    {
        private readonly string _directory;
        private ZipArchive _archive;

        internal ZipArchiveDirectory(ZipArchive archive, string directory)
        {
            _archive = archive;
            _directory = directory;
        }

        public ZipArchive Archive { get { return _archive; } }

        public async Task CreateEntry(string entry, Stream data)
        {
            var entryData = _archive.CreateEntry(_directory + "/" + entry);
            using (Stream zipEntryStream = entryData.Open())
            {
                await data.CopyToAsync(zipEntryStream);
            }
        }

        public ZipArchiveEntry CreateEntry(string entry, CompressionLevel compressionLevel)
        {
            return _archive.CreateEntry(_directory + "/" + entry, compressionLevel);
        }
    }
}
