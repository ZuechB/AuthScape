using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IMobileServices
    {

    }

    public class MobileServices : IMobileServices
    {
        public void SendTwoFactorCode()
        {
            // send the two factor code using Twilio
        }

        public void PushNotification()
        {

        }
    }
}
