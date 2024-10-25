using AuthScape.Document.Mapping.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.Document.Mapping.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class DocumentMappingPreviewController : ControllerBase
    {
        readonly IMappingService mappingService;
        public DocumentMappingPreviewController(IMappingService mappingService)
        {
            this.mappingService = mappingService;
        }

        [HttpPost]
        public async Task<IActionResult> PreviewMappedData(long companyId, long documentComponentId)
        {
            var previewSpreadsheetData = await mappingService.PreviewSpreadsheet(companyId, documentComponentId);
            return Ok(previewSpreadsheetData);
        }
    }

    public class SpeadSheetPreview
    {
        public List<string> Columns { get; set; }
        public List<List<SpreadSheetData>> Rows { get; set; }
    }

    public class SpreadSheetData
    {
        public SpreadSheetData(long? _value)
        {
            this.Value = _value != null ? _value.ToString() : "";
        }

        public SpreadSheetData(Guid? _value)
        {
            this.Value = _value != null ? _value.ToString() : "";
        }

        public SpreadSheetData(decimal? _value)
        {
            this.Value = _value != null ? _value.ToString() : "";
        }

        public SpreadSheetData(int? _value)
        {
            this.Value = _value != null ? _value.ToString() : "";
        }

        public SpreadSheetData(string? _value)
        {
            this.Value = _value != null ? _value : "";
        }

        public string Value { get; set; }
    }
}
