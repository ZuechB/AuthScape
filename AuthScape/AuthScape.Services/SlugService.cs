using System;
using System.Text;

namespace Services
{
    public interface ISlugService
    {
        string GenerateSlug(string val);
        long? GetIdFromSlug(string slug);
    }

    public class SlugService : ISlugService
    {
        public long? GetIdFromSlug(string slug)
        {
            try
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
            catch (Exception)
            {
                return null;
            }
        }

        public string GenerateSlug(string val)
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
