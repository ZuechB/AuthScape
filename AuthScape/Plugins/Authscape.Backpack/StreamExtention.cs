using System.Net.Mail;

namespace AuthScape.Backpack
{
    public class StreamExtention
    {
        public static void CopyStream(Stream input, Stream output)
        {
            byte[] buffer = new byte[32768];
            int read;
            while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
            {
                output.Write(buffer, 0, read);
            }
        }

        //public static async Task GetStreamFromUri(Uri uri, Action<Stream> response)
        //{
        //    using (HttpClient client = new HttpClient())
        //    {
        //        using (Stream _stream = await client.GetStreamAsync(uri))
        //        {
        //            response(_stream);
        //        }
        //    }
        //}
    }
}