using ClosedXML.Excel;
using System.Text;

namespace AuthScape.Document.Mapping.Services
{
    public class ExcelHelper
    {
        public string ConvertXlsxToCsv(Stream xlsxFile, int? rowLimit = null)
        {
            int rowIndex = 0;
            var stringBuilder = new StringBuilder();
            using (var workbook = new XLWorkbook(xlsxFile))
            {
                var worksheet = workbook.Worksheets.First(); // Assuming you want the first worksheet

                var range = worksheet.RangeUsed();

                foreach (var row in range.RowsUsed())
                {
                    if (rowLimit != null && rowLimit == rowIndex)
                    {
                        break;
                    }

                    var csvLine = string.Join(",", row.Cells().Select(cell => cell.Value));
                    stringBuilder.AppendLine(csvLine);

                    rowIndex++;
                }
            }

            return stringBuilder.ToString();
        }
    }
}