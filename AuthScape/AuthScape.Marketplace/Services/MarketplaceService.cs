using AuthScape.Marketplace.Models;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Store.Azure;
using Lucene.Net.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Services;
using Services.Context;
using Services.Database;
using StrongGrid;
using System.Linq;
using static AuthScape.Marketplace.Services.MarketplaceService;

namespace AuthScape.Marketplace.Services
{
    public interface IMarketplaceService
    {
        Task IndexProducts();
        Task<SearchResult2> SearchProducts(int pageNumber = 1, int pageSize = 20);
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

        public async Task<SearchResult2> SearchProducts(int pageNumber = 1, int pageSize = 20)
        {
            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);
            using var reader = DirectoryReader.Open(azureDirectory);
            var searcher = new IndexSearcher(reader);

            var booleanQuery = new BooleanQuery();
            var hasFilters = false;

            //if (colors != null && colors.Any())
            //{
            //    var colorQuery = new BooleanQuery();
            //    foreach (var color in colors)
            //    {
            //        colorQuery.Add(new TermQuery(new Term("Color", color)), Occur.SHOULD);
            //    }
            //    booleanQuery.Add(colorQuery, Occur.MUST);
            //    hasFilters = true;
            //}

            //if (categories != null && categories.Any())
            //{
            //    var categoryQuery = new BooleanQuery();
            //    foreach (var category in categories)
            //    {
            //        categoryQuery.Add(new TermQuery(new Term("Category", category)), Occur.SHOULD);
            //    }
            //    booleanQuery.Add(categoryQuery, Occur.MUST);
            //    hasFilters = true;
            //}

            //if (sizes != null && sizes.Any())
            //{
            //    var sizeQuery = new BooleanQuery();
            //    foreach (var size in sizes)
            //    {
            //        sizeQuery.Add(new TermQuery(new Term("Size", size)), Occur.SHOULD);
            //    }
            //    booleanQuery.Add(sizeQuery, Occur.MUST);
            //    hasFilters = true;
            //}

            var query = hasFilters ? (Query)booleanQuery : new MatchAllDocsQuery();

            var start = (pageNumber - 1) * pageSize;
            var hits = searcher.Search(query, start + pageSize).ScoreDocs.Skip(start).Take(pageSize).ToArray();
            var results = hits.Select(hit => searcher.Doc(hit.Doc)).Select(doc => new Product
            {
                Id = Guid.Parse(doc.Get("Id")),
                Name = doc.Get("Name"),
            }).ToList();

            var filters = GetAvailableFilters(searcher, hits, booleanQuery);


            var categories = await databaseContext
                .ProductCategories
                .Include(s => s.ProductFields)
                .Select(s => new CategoryResponse()
                {
                    name = s.Name,
                    expanded = true,
                    filters = s.ProductFields.Select(p => new CategoryResponseFilter()
                    {
                        name = p.Name,
                        available = 100
                    })
                })
                .ToListAsync();



            return new SearchResult2
            {
                Products = results,
                Filters = filters,
                Categories = categories
            };
        }

        public class SearchResult2
        {
            public List<CategoryResponse> Categories { get; set; }
            public List<Product> Products { get; set; }
            public AvailableFilters Filters { get; set; }
        }

        public class AvailableFilters
        {
            public List<string> Colors { get; set; }
            public List<string> Categories { get; set; }
            public List<string> Sizes { get; set; }
        }

        public AvailableFilters GetAvailableFilters(IndexSearcher searcher, ScoreDoc[] hits, BooleanQuery booleanQuery)
        {
            var colorSet = new HashSet<string>();
            var categorySet = new HashSet<string>();
            var sizeSet = new HashSet<string>();

            foreach (var hit in hits)
            {
                var doc = searcher.Doc(hit.Doc);

                foreach (var item in doc)
                {
                    var name = item.Name;
                }

                var color = doc.Get("Color");
                var category = doc.Get("Category");
                var size = doc.Get("Size");

                if (color != null) colorSet.Add(color);
                if (category != null) categorySet.Add(category);
                if (size != null) sizeSet.Add(size);
            }

            return new AvailableFilters
            {
                Colors = colorSet.ToList(),
                Categories = categorySet.ToList(),
                Sizes = sizeSet.ToList()
            };
        }









        public async Task IndexProducts()
        {
            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);

            //var directory = FSDirectory.Open("path_to_index");
            var analyzer = new StandardAnalyzer(luceneVersion);
            var config = new IndexWriterConfig(luceneVersion, analyzer);
            using var writer = new IndexWriter(azureDirectory, config);

            var products = await databaseContext.Products
                .Include(s => s.ProductCategoryFields)
                .ThenInclude(z => z.ProductField)
                .ThenInclude(q => q.ProductCategory)
                .ToListAsync();


            foreach (var product in products)
            {
                var doc = new Lucene.Net.Documents.Document
                {
                    new StringField("Id", product.Id.ToString(), Field.Store.YES),
                    new StringField("Name", product.Name, Field.Store.YES),
                    //new StringField("Price", product.Price.ToString(), Field.Store.YES),
                    //new TextField("Description", product.Description, Field.Store.YES)
                };

                foreach (var field in product.ProductCategoryFields)
                {
                    doc.Fields.Add(new StringField(field.ProductField.ProductCategory.Name, field.ProductField.Name, Field.Store.YES));
                }

                writer.AddDocument(doc);
            }

            writer.Commit();
        }

    }
}
