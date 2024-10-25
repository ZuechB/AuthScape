using System.Collections;

namespace AuthScape.LuceneSearch.Models
{
    public class LuceneDocument : IEnumerable<LuceneField>
    {
        private readonly IList<LuceneField> fields = new List<LuceneField>();

        public IEnumerator<LuceneField> GetEnumerator()
        {
            return fields.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerable<LuceneField> GetFields()
        {
            return fields;
        }

        public void Add(LuceneField field)
        {
            fields.Add(field);
        }
    }
}