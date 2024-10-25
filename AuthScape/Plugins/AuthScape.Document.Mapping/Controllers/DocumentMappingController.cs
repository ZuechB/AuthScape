using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using CoreBackpack.Pagination;
using AuthScape.Document.Mapping.Models;
using AuthScape.Document.Mapping.Services;
using CoreBackpack;
using Microsoft.AspNetCore.Http;
using AuthScape.Spreadsheet;
using AuthScape.Spreadsheet.Models.Elements;
using Newtonsoft.Json;

namespace AuthScape.Document.Mapping
{
    [Route("api/[controller]/[action]")]
	[ApiController]
	[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
	public class DocumentMappingController : ControllerBase
	{
		readonly ISpreadsheetService spreadsheetService;
        readonly IMappingService mappingService;
        public DocumentMappingController(IMappingService mappingService) 
		{
			this.mappingService = mappingService;
		}

		[HttpGet]
		public async Task<IActionResult> GetHeaderRow(long documentComponentId)
		{
			return Ok(await mappingService.GetHeaderRow(documentComponentId));
		}

		[HttpGet]
		public async Task<IActionResult> GetMappingFieldsForDocument(long documentId)
		{
            return Ok(await mappingService.GetMappingFieldsForDocument(documentId));
		}

        [HttpGet]
        public async Task<IActionResult> GetMappedDynamicFieldsForCompany(long companyId, long documentId)
        {
            return Ok(await mappingService.GetMappedDynamicFieldsForCompany(companyId, documentId));
        }


        [HttpPost]
		public async Task<IActionResult> UpdateHeaderRow(HeaderRowParam param)
		{
			await mappingService.UpdateHeaderRow(param.DocumentComponentId, param.HeaderRow);
            return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> GetMapping(MappingParam param)
		{
			var mapping = await mappingService.GetMapping(param.documentComponentId, param.companyId, param.locationId, param.userId);
			return Ok(mapping);
        }

		[HttpPut]
		public async Task<IActionResult> AssignMapping(AssignFieldMapping mapping)
		{
			await mappingService.AssignMapping(
				mapping.CompanyId,
				mapping.DocumentId,
				mapping.FileColumnName,
				mapping.MatchedColumn,
				mapping.OnlyAddRowIfColumnFound,
				mapping.RememberForNextTime
				);

			return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> GetDocumentTypes(DocumentComponentsParam? param)
		{
            var mapping = new PagedList<DocumentType>();

            if (param == null)
			{
				mapping = await mappingService.GetDocumentTypes(null, null);
            }
			else
			{
                mapping = await mappingService.GetDocumentTypes(param.offset, param.length);
            }

			return Ok(new ReactDataTable()
			{
				draw = 0,
				recordsTotal = mapping.total,
				recordsFiltered = mapping.total,
				data = mapping.ToList()
			});
		}

		[HttpPost]
		public async Task<IActionResult> TrainDocument([FromForm] TrainDocumentParam param)
		{
			await mappingService.TrainDocument(param.file, param.documentComponentId, rowsToTrain: param.rowsToTrain, companyId: param.companyId, locationId: param.locationId, azureModuleId: param.AzureModuleId, userId: param.userId);
            return Ok();
        }

		[HttpPost]
		public async Task<IActionResult> SyncDocument([FromForm] UploadDynamicDocument upload)
		{
            return Ok(await mappingService.SyncDocument(upload.file, upload.CompanyId, upload.DocumentTypeId));
		}

		[HttpPost]
		public async Task<IActionResult> SubmitMappedDocument(SubmittedDocument submitted)
		{
			await mappingService.SubmittedMappedDocument(submitted.CompanyId, submitted.DocumentComponentId);
			return Ok();
		}

		[HttpGet]
		public async Task<IActionResult> GetDynamicDocument(long companyId)
		{
			return Ok(await mappingService.GetDynamicDocument(companyId));
		}

		[HttpPut]
		public async Task <IActionResult> AssignNameValue(UpdateDocumentMappingParam param)
		{
			await mappingService.AssignNameValue(param.Id, param.Field, param.Value);
			return Ok();
		}

        [HttpPut]
        public async Task<IActionResult> AssignToName(UpdateDocumentMappingParam param)
        {
            await mappingService.AssignToName(param.Id, param.Field, param.Value);
            return Ok();
        }

        [HttpPost]
		public async Task<IActionResult> AddNewField(AddNewFieldParam param)
		{
			await mappingService.AssignFileColumnFromColumn(param.tableName, param.fieldName, param.fileColumn, param.companyId, param.locationId, param.userId);
			return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> AddNewDocument(NewDocument newDocument)
		{
			var Id = await mappingService.CreateDocument(newDocument.Name, newDocument.TypeOfDocumentId, newDocument.CompanyId, newDocument.LocationId, newDocument.UserId);
            return Ok(Id);
		}

		[HttpPost]
		public async Task<IActionResult> GetDocumentComponents(DocumentComponentsParam param)
		{
            var mapping = await mappingService.GetDocumentComponents(param.status, param.companyId, param.userId, param.locationId, param.offset, param.length);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = mapping.total,
                recordsFiltered = mapping.total,
                data = mapping.ToList()
            });
        }

		[HttpDelete]
		public async Task<IActionResult> RemoveColumnFromDocumentComponent(Guid documentMappingId, long documentComponentId)
		{
			await mappingService.RemoveColumnFromDocumentMapping(documentMappingId, documentComponentId);
            return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> GetDataSources(DocumentComponentsParam param)
		{
            var mapping = await mappingService.GetDocumentTypes(param.offset, param.length);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = mapping.total,
                recordsFiltered = mapping.total,
                data = mapping.ToList()
            });
        }

		[HttpPost]
		public async Task<IActionResult> AddDataSource(DocumentAddDataSource document)
		{
			return Ok(await mappingService.AddDataSource(document));
		}

		[HttpGet]
		public async Task<IActionResult> GetTablesFromDatabase()
		{
            return Ok(await mappingService.GetAllTablesFromDatabase());
		}

		[HttpDelete]
		public async Task<IActionResult> RemoveDocument(long documentId, long? companyId = null)
		{
			await mappingService.CancelUpload(documentId, companyId);
            return Ok();
		}


		[HttpDelete]
		public async Task<IActionResult> RemoveMatch(long companyId, long documentId, Guid documentMappingId)
		{
			await mappingService.RemoveMatch(companyId, documentId, documentMappingId);
			return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> AddNewColumnAndMapping(NewColumnWithMapping mapping)
		{
			await mappingService.AddNewColumnAndMapping(mapping);
            return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> Publish(PublishParam param)
		{
			await mappingService.Publish(param.CompanyId, param.DocumentId, param.PublishedRows);
            return Ok();
		}

		[HttpDelete]
		public async Task<IActionResult> Cancel(long companyId, long documentId)
		{
			await mappingService.CancelUpload(companyId, documentId);
			return Ok();
		}

		[HttpPut]
		public async Task<IActionResult> ChangeCell(string id, string rowId, string fieldName, string value)
		{


			return Ok();
		}

		[HttpPut]
		public async Task<IActionResult> ApplyFilterForViewer(DocumentFilterForPreview documentFilter)
		{
			await mappingService.AssignAdvancedRules(documentFilter);
            return Ok();
		}

		[HttpGet]
		public async Task<IActionResult> GetRules(long documentComponentId)
		{
			var rules = await mappingService.GetRules(documentComponentId);
			if (rules != null)
			{
                return Ok(JsonConvert.DeserializeObject<DocumentFilterForPreviewRule>(rules));
            }
			else
			{
                return Ok();
            }
		}
	}

	public class PublishParam
	{
		public long CompanyId { get; set; }
		public long DocumentId { get; set; }
		public List<PublishedRow>? PublishedRows { get; set; }
	}

	public class SubmittedDocument
	{
		public long CompanyId { get; set; }
		public long DocumentComponentId { get; set; }
    }

	public class UploadDynamicDocument
	{
        public IFormFile file { get; set; }
		public long CompanyId { get; set; }
		public long DocumentTypeId { get; set; }
    }

	public class TrainDocumentParam
	{
		public IFormFile file { get; set; }
		public int rowsToTrain { get; set; } = 50;
        public long documentComponentId { get; set; }
		public long? companyId { get; set; } = null;
		public long? locationId { get; set; } = null;
		public long? userId { get; set; } = null;
		public string? AzureModuleId { get; set; } = "prebuilt-invoice";
    }

	public class HeaderRowParam
	{
		public int HeaderRow { get; set; }
		public long DocumentComponentId { get; set; }
	}

	public class AssignFieldMapping
	{
		public long CompanyId { get; set; }
		public long DocumentId { get; set; }
		public string FileColumnName { get; set; }
		public string MatchedColumn { get; set; }
        public bool OnlyAddRowIfColumnFound { get; set; }
        public bool RememberForNextTime { get; set; }
    }
	

	public class AddNewFieldParam
	{
        public string tableName { get; set; }
		public string fieldName { get; set; }
        public string fileColumn { get; set; }
		public long? companyId { get; set; } = null;
		public long? locationId { get; set; } = null;
		public long? userId { get; set; } = null;
    }

	public class DocumentComponentsParam
	{
		public long? companyId { get; set; }
		public long? userId { get; set; }
		public long? locationId { get; set; }
        public int? offset { get; set; }
        public int? length { get; set; }
		public DocumentComponentStatus status { get; set; }
    }

	public class NewDocument
	{
		public string Name { get; set; }
		public long TypeOfDocumentId { get; set; }
		public long? CompanyId { get; set; }
		public long? LocationId { get; set; }
		public long? UserId { get; set; }
    }

	public class UpdateDocumentMappingParam
	{
		public Guid Id { get; set; }
		public string Field { get; set; }
		public string Value { get; set; }
	}
}
