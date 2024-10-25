using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;
using AuthScape.Backpack.Models;

namespace AuthScape.Backpack.Images
{
    public class CYMK2RGB
    {
        public Stream ConvertCYMKToRGB(Stream currentImage)
        {
            var bitmap = new Bitmap(currentImage);
            var rgb = CMYKLayers(bitmap);

            var ms = new MemoryStream();
            rgb.Save(ms, ImageFormat.Jpeg);

            return ms;
        }

        public static RGB CMYKToRGB(CMYK cmyk)
        {
            byte r = (byte)(255 * (1 - cmyk.C) * (1 - cmyk.K));
            byte g = (byte)(255 * (1 - cmyk.M) * (1 - cmyk.K));
            byte b = (byte)(255 * (1 - cmyk.Y) * (1 - cmyk.K));

            return new RGB(r, g, b);
        }

        private Bitmap CMYKLayers(Bitmap OriginalImage)
        {
            Bitmap bitmapOutput = new System.Drawing.Bitmap(OriginalImage.Width, OriginalImage.Height);

            for (int x = 0; x < OriginalImage.Width; x++)
            {
                for (int y = 0; y < OriginalImage.Height; y++)
                {
                    Color pixel = OriginalImage.GetPixel(x, y);

                    Double[] cmyk = rgb2cmyk(pixel);

                    Double C = cmyk[0];
                    Double M = cmyk[1];
                    Double Y = cmyk[2];
                    Double K = cmyk[3];

                    var rgb = CMYKToRGB(new CMYK()
                    {
                        C = C,
                        M = M,
                        Y = Y,
                        K = K
                    });

                    bitmapOutput.SetPixel(x, y, Color.FromArgb(rgb.R, rgb.G, rgb.B));
                }
            }

            return bitmapOutput;
        }

        public Double[] rgb2cmyk(Color pixel)
        {
            Double nR = System.Convert.ToDouble(pixel.R) / 255;
            Double nG = System.Convert.ToDouble(pixel.G) / 255;
            Double nB = System.Convert.ToDouble(pixel.B) / 255;

            Double K = 1 - Math.Max(Math.Max(nR, nB), nG);
            Double C = (1 - nR - K) / (1 - K);
            Double M = (1 - nG - K) / (1 - K);
            Double Y = (1 - nB - K) / (1 - K);

            Double[] cmyk = new Double[4] { C, M, Y, K };

            return cmyk;
        }

        public Color cmyk2rgb(Double[] cmyk)
        {
            Color pixel = new Color();

            Double r = 255 * (1 - cmyk[0]) * (1 - cmyk[3]);
            Double g = 255 * (1 - cmyk[1]) * (1 - cmyk[3]);
            Double b = 255 * (1 - cmyk[2]) * (1 - cmyk[3]);

            int R = (int)(r);
            int G = (int)(g);
            int B = (int)(b);

            if (R > 255) R = 255;
            if (R < 0) R = 0;

            if (G > 255) G = 255;
            if (G < 0) G = 0;

            if (B > 255) B = 255;
            if (B < 0) B = 0;

            pixel = Color.FromArgb(255, R, G, B);

            return pixel;
        }
    }
}
