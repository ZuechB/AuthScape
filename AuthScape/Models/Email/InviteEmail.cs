using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Email
{
    public class InviteEmail : BaseEmail
    {
        public string CompanyName { get; set; }
        public string AcceptInviteLink { get; set; }
    }
}
