using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Backpack
{
    public class SlugExtention
    {
        public static long? GetIdFromSlug(string slug)
        {
            var index = slug.LastIndexOf("-") + 1;
            if (slug.Length > index)
            {
                slug = slug.Remove(0, index);
                return Convert.ToInt64(slug);
            }
            else
            {
                return null;
            }
        }

        public static string GenerateSlug(string val)
        {
            StringBuilder sb = new StringBuilder();
            bool wasHyphen = true;

            foreach (char c in val)
            {
                if (char.IsLetterOrDigit(c))
                {
                    sb.Append(char.ToLower(c));
                    wasHyphen = false;
                }
                else if (c != '\'' && !wasHyphen)
                {
                    sb.Append('-');
                    wasHyphen = true;
                }
            }

            // Avoid trailing hyphens
            if (wasHyphen && sb.Length > 0)
                sb.Length--;

            return sb.ToString();
        }
    }
}
