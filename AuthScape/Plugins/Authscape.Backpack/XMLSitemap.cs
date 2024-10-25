using AuthScape.Backpack.Sitemap;
using HtmlAgilityPack;
using System.Xml;

namespace AuthScape.Backpack
{
    public class XMLSitemap
    {
        public async Task<List<WordpressNode>> ReadXML(string postSitemap, bool scanMeta = false)
        {
            XmlDocument urldoc = new XmlDocument();
            urldoc.Load(postSitemap);

            XmlNodeList xnList = urldoc.GetElementsByTagName("url");

            var nodes = new List<WordpressNode>();

            foreach (XmlNode node in xnList)
            {
                var nodeItem = new WordpressNode();

                nodeItem.Uri = node["loc"].InnerText;

                if (scanMeta)
                {
                    var metaData = await SearchMetaData(node["loc"].InnerText);
                    nodeItem.Title = metaData.Title;
                    nodeItem.Description = metaData.Description;
                }

                if (node["lastmod"] != null)
                {
                    nodeItem.LastModified = DateTime.Parse(node["lastmod"].InnerText);
                }

                if (node["image:image"] != null)
                {
                    var imgLoc = node["image:image"].InnerText;
                    var png = node["image:image"].InnerText.IndexOf(".png");
                    var jpg = node["image:image"].InnerText.IndexOf(".jpg");
                    var jpeg = node["image:image"].InnerText.IndexOf(".jpeg");

                    if (png != -1)
                    {
                        imgLoc = imgLoc.Remove(png + 4);
                    }
                    else if (jpg != -1)
                    {
                        imgLoc = imgLoc.Remove(jpg + 4);
                    }
                    else if (jpeg != -1)
                    {
                        imgLoc = imgLoc.Remove(jpeg + 5);
                    }

                    nodeItem.Photo = imgLoc;
                }

                nodes.Add(nodeItem);
            }

            return nodes;
        }

        private static async Task<PageInfo> SearchMetaData(string url)
        {
            var htmlWeb = new HtmlWeb();
            var newDoc = await htmlWeb.LoadFromWebAsync(url);
            return GetDomainInformation(newDoc);
        }

        public static PageInfo GetDomainInformation(HtmlDocument doc)
        {
            var pageInfo = new PageInfo();

            var titleNode = doc.DocumentNode.SelectSingleNode("//title");
            if (titleNode != null)
            {
                pageInfo.Title = titleNode.InnerText;
            }

            var metaTags = doc.DocumentNode.SelectNodes("//meta");
            if (metaTags != null)
            {
                foreach (var sitetag in metaTags)
                {
                    if (sitetag.Attributes["name"] != null && sitetag.Attributes["content"] != null)
                    {
                        if (sitetag.Attributes["name"].Value == "description")
                        {
                            pageInfo.Description = sitetag.Attributes["content"].Value;
                        }
                    }
                }
            }

            return pageInfo;
        }
    }
}
