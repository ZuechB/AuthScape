using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.PrivateLabel.Models
{
    public class ManifestFile
    {
        public string name { get; set; }
        public string short_name { get; set; }
        public List<Icons> icons { get; set; }
        public string theme_color { get; set; }
        public string background_color { get; set; }
        public string start_url { get; set; }
        public string display { get; set; }
        public string orientation { get; set; }
    }

    public class Icons
    {
        public string src { get; set; }
        public string sizes { get; set; }
        public string type { get; set; }
        public string purpose { get; set; }
    }
}
