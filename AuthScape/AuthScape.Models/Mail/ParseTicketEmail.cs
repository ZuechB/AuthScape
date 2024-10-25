using System;
using System.Collections.Generic;
using System.Linq;
namespace AuthScape.Models.Mail
{
    public class EmailParse
    {
        public static long? ParseEmailAddress(EMailAddress[] To, string emailSlug)
        {
            // find the email we are working with
            string email = null;
            foreach (var toEmail in To)
            {
                if (toEmail.Email.Contains("ticket-"))
                {
                    email = toEmail.Email;
                    break;
                }
            }

            if (email == null)
            {
                return null;
            }

            // parse the email we are working with
            var req = email.IndexOf(emailSlug + "-");
            if (req == -1)
            {
                return null;
            }

            email = email.Remove(req, 7);

            var atSign = email.IndexOf("@");
            if (atSign == -1)
            {
                return null;
            }

            email = email.Remove(atSign);

            if (!String.IsNullOrWhiteSpace(email))
            {
                return Convert.ToInt64(email);
            }
            else
            {
                return null;
            }
        }
    }
}
