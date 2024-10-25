using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Backpack
{
    public class URLExtention
    {
        public static string GetFileName(string url)
        {
            return Path.GetFileName(url);
        }
    }
}
