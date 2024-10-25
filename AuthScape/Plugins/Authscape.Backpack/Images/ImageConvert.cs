using ImageMagick;
using System.Net;

namespace AuthScape.Backpack.Images
{
    public class ImageConvert
    {
        public async Task<MemoryStream> ExecuteFromURL(string url, uint width, uint height)
        {
            var wc = new WebClient();
            var data = await wc.DownloadDataTaskAsync(url);

            var memStream = new MemoryStream(data);
            memStream.Seek(0, SeekOrigin.Begin);

            return Execute(memStream, width, height);
        }

        public MemoryStream Execute(Stream stream, uint width, uint height)
        {
            bool isCMYK = false;
            using (MagickImage image = new MagickImage(stream))
            {
                if (image.ColorSpace == ColorSpace.CMYK)
                {
                    isCMYK = true;
                }
            }

            if (isCMYK)
            {
                var cymkConverter = new CYMK2RGB();
                stream = cymkConverter.ConvertCYMKToRGB(stream);
            }

            stream.Seek(0, SeekOrigin.Begin);

            MemoryStream memStream = new MemoryStream();
            // convert to size
            using (MagickImage image = new MagickImage(stream))
            {
                if (image.Height > height || image.Width > width)
                {
                    image.Resize(width, height);
                }
                image.ColorAlpha(MagickColors.White);
                image.Write(memStream, MagickFormat.Jpg);
            }

            memStream.Seek(0, SeekOrigin.Begin);
            return memStream;
        }
    }
}
