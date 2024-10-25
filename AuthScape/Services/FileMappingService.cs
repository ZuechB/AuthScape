using AuthScape.Document.Mapping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IFileMappingService
    {
        Task OnRowExecute(dynamic instance, DocumentComponent documentComponent);
        Task OnCompleted(List<dynamic> objects, DocumentComponent documentComponent);
    }

    public class FileMappingService : IFileMappingService
    {
        public async Task OnRowExecute(dynamic instance, DocumentComponent documentComponent)
        {

        }

        public async Task OnCompleted(List<dynamic> objects, DocumentComponent documentComponent)
        {

        }
    }
}
