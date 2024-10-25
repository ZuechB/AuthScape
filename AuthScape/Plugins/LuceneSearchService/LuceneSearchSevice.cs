using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Store.Azure;
using Lucene.Net.Util;
using AuthScape.LuceneSearch.Models;
using Services.Database;
using Microsoft.Extensions.Options;
using Lucene.Net.Search;
using Lucene.Net.QueryParsers.Classic;

namespace AuthScape.LuceneSearch
{
    public interface ILuceneSearchSevice
    {
        void CreateIndex(List<LuceneDocument> documents, string? storagePath = null);
        SearchResults Search(string input, string field, int totalResults = 10);
        SearchResults Search(string input, string[] field, int totalResults = 10);
    }

    public class LuceneSearchSevice : ILuceneSearchSevice
    {
        readonly AppSettings appSettings;
        readonly LuceneVersion luceneVersion;
        public LuceneSearchSevice(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
            luceneVersion = LuceneVersion.LUCENE_48;
        }

        public void CreateIndex(List<LuceneDocument> documents, string? storagePath = null)
        {
            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);

            //Create an analyzer to process the text 
            Analyzer standardAnalyzer = new StandardAnalyzer(luceneVersion);

            //Create an index writer
            IndexWriterConfig indexConfig = new IndexWriterConfig(luceneVersion, standardAnalyzer);
            indexConfig.OpenMode = OpenMode.CREATE;
            IndexWriter writer = new IndexWriter(azureDirectory, indexConfig);


            foreach (var document in documents)
            {
                Lucene.Net.Documents.Document doc = new Lucene.Net.Documents.Document();

                var fields = document.GetFields();
                foreach (var field in fields)
                {
                    switch(field.FieldType)
                    {
                        case Models.FieldType.DescriptionOrBody:
                            doc.Add(new TextField(field.Name, (string)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                        case Models.FieldType.StringField:
                            doc.Add(new StringField(field.Name, (string)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                        case Models.FieldType.NumericDocValuesField:
                            doc.Add(new NumericDocValuesField(field.Name, (long)field.Value));
                            break;
                        case Models.FieldType.DoubleField:
                            doc.Add(new DoubleField(field.Name, (double)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                        case Models.FieldType.BinaryDocValuesField:
                            doc.Add(new BinaryDocValuesField(field.Name, (BytesRef)field.Value));
                            break;
                        case Models.FieldType.SortedDocValuesField:
                            doc.Add(new SortedDocValuesField(field.Name, (BytesRef)field.Value));
                            break;
                        case Models.FieldType.SortedSetDocValuesField:
                            doc.Add(new SortedSetDocValuesField(field.Name, (BytesRef)field.Value));
                            break;
                        case Models.FieldType.Int32Field:
                            doc.Add(new Int32Field(field.Name, (int)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                        case Models.FieldType.Int64Field:
                            doc.Add(new Int64Field(field.Name, (long)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                        case Models.FieldType.SingleField:
                            doc.Add(new SingleField(field.Name, (float)field.Value, field.StoreField ? Field.Store.YES : Field.Store.NO));
                            break;
                    }
                }
                
                writer.AddDocument(doc);
            }

            //Flush and commit the index data to the directory
            writer.Flush(false, false);
            writer.Commit();
            writer.Dispose();
        }

        public SearchResults Search(string input, string field, int totalResults = 10)
        {
            var results = new SearchResults();

            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);
            IndexSearcher searcher = new IndexSearcher(DirectoryReader.Open(azureDirectory));

            QueryParser parser = new QueryParser(luceneVersion, field, new StandardAnalyzer(luceneVersion));

            Query query = parser.Parse(input);
            TopDocs topDocs = searcher.Search(query, n: totalResults);

            foreach (var doc in topDocs.ScoreDocs)
            {
                Lucene.Net.Documents.Document resultDoc = searcher.Doc(doc.Doc);
                results.Documents.Add(new SearchResultDocument(resultDoc, doc.Score, doc.ShardIndex));
            }

            results.TotalResults = topDocs.TotalHits;
            results.Searcher = searcher;

            

            return results;
        }

        public SearchResults Search(string input, string[] field, int totalResults = 10)
        {
            var results = new SearchResults();

            AzureDirectory azureDirectory = new AzureDirectory(appSettings.LuceneSearch.StorageConnectionString, appSettings.LuceneSearch.Container);
            IndexSearcher searcher = new IndexSearcher(DirectoryReader.Open(azureDirectory));

            MultiFieldQueryParser parser = new MultiFieldQueryParser(luceneVersion, field, new StandardAnalyzer(luceneVersion));

            Query query = parser.Parse(input);
            TopDocs topDocs = searcher.Search(query, n: totalResults);

            foreach (var doc in topDocs.ScoreDocs)
            {
                Lucene.Net.Documents.Document resultDoc = searcher.Doc(doc.Doc);
                results.Documents.Add(new SearchResultDocument(resultDoc, doc.Score, doc.ShardIndex));
            }

            results.TotalResults = topDocs.TotalHits;
            results.Searcher = searcher;

            return results;
        }
    }
}
