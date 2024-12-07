using AuthScape.Marketplace.Models;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Store.Azure;
using Lucene.Net.Util;
using Microsoft.Extensions.Options;
using Services.Context;
using Services.Database;


namespace AuthScape.Marketplace.Services
{
    public interface IMarketplaceService
    {
        void IndexProducts(IEnumerable<MarketplaceProduct> products);
        List<MarketplaceProduct> SearchProducts(string[] colors, string[] categories, string[] sizes);
    }

    public class MarketplaceService : IMarketplaceService
    {
        readonly AppSettings appSettings;
        readonly DatabaseContext databaseContext;
        readonly LuceneVersion luceneVersion;
        public MarketplaceService(DatabaseContext databaseContext, IOptions<AppSettings> appSettings)
        {
            this.databaseContext = databaseContext;

            this.appSettings = appSettings.Value;
            luceneVersion = LuceneVersion.LUCENE_48;
        }

        public List<MarketplaceProduct> SearchProducts(string[] colors, string[] categories, string[] sizes)
        {
            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);
            using var reader = DirectoryReader.Open(azureDirectory);
            var searcher = new IndexSearcher(reader);

            var booleanQuery = new BooleanQuery();

            if (colors != null && colors.Any())
            {
                var colorQuery = new BooleanQuery();
                foreach (var color in colors)
                {
                    colorQuery.Add(new TermQuery(new Term("Color", color)), Occur.SHOULD);
                }
                booleanQuery.Add(colorQuery, Occur.MUST);
            }

            if (categories != null && categories.Any())
            {
                var categoryQuery = new BooleanQuery();
                foreach (var category in categories)
                {
                    categoryQuery.Add(new TermQuery(new Term("Category", category)), Occur.SHOULD);
                }
                booleanQuery.Add(categoryQuery, Occur.MUST);
            }

            if (sizes != null && sizes.Any())
            {
                var sizeQuery = new BooleanQuery();
                foreach (var size in sizes)
                {
                    sizeQuery.Add(new TermQuery(new Term("Size", size)), Occur.SHOULD);
                }
                booleanQuery.Add(sizeQuery, Occur.MUST);
            }

            var hits = searcher.Search(booleanQuery, 10).ScoreDocs;
            var results = hits.Select(hit => searcher.Doc(hit.Doc)).Select(doc => new MarketplaceProduct
            {
                Id = doc.Get("Id"),
                Color = doc.Get("Color"),
                Category = doc.Get("Category"),
                Size = doc.Get("Size")
            }).ToList();

            return results;
        }


        public void IndexProducts(IEnumerable<MarketplaceProduct> products)
        {
            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);

            //var directory = FSDirectory.Open("path_to_index");
            var analyzer = new StandardAnalyzer(luceneVersion);
            var config = new IndexWriterConfig(luceneVersion, analyzer);
            using var writer = new IndexWriter(azureDirectory, config);

            foreach (var product in products)
            {
                var doc = new Lucene.Net.Documents.Document
                {
                    new StringField("Id", product.Id, Field.Store.YES),
                    new StringField("Color", product.Color, Field.Store.YES),
                    new StringField("Category", product.Category, Field.Store.YES),
                    new StringField("Size", product.Size, Field.Store.YES)
                };
                writer.AddDocument(doc);
            }

            writer.Commit();
        }
    }
}
