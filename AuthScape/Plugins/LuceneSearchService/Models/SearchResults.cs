
using Lucene.Net.Search;

namespace AuthScape.LuceneSearch.Models
{
    public class SearchResults
    {
        public SearchResults()
        {
            Documents = new List<SearchResultDocument>();
        }

        public List<SearchResultDocument> Documents { get; set; }
        public int TotalResults { get; set; }
        public IndexSearcher Searcher { get; set; }
    }

    public class SearchResultDocument
    {
        readonly Lucene.Net.Documents.Document document;
        public SearchResultDocument(Lucene.Net.Documents.Document document, float score, int sharedIndex)
        {
            this.document = document;
            this.Score = score;
            this.SharedIndex = sharedIndex;
        }

        public Lucene.Net.Documents.Document Document { get { return document; } }
        public float Score { get; set; }
        public int SharedIndex { get; set; }
    }
}