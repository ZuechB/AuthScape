using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthScape.Plugins.Invoices.Models;
using OpenIddict.Validation.AspNetCore;
using Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using AuthScape.Models.Storage;
using AuthScape.Invoice.Models;
using AuthScape.Models.Companies;
using Stripe.Terminal;
using DocumentFormat.OpenXml.InkML;
using CsvHelper.Configuration.Attributes;

namespace AuthScape.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class InvoicesController : ControllerBase
    {
        readonly IInvoiceService invoiceService;
        public InvoicesController(IInvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }

        [HttpPost]
        public async Task<IActionResult> GetInvoices(GetInvoiceParam param)
        {
            var companies = await invoiceService.GetInvoices(param.offset, param.length, companyId: param.CompanyId, locationId: param.LocationId, invoiceState: param.invoiceState);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = companies.total,
                recordsFiltered = companies.total,
                data = companies.ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice(CreateInvoiceParam param)
        {
            var invoiceId = await invoiceService.CreateInvoice(param.LocationId);
            return Ok(invoiceId);
        }

        [HttpPut]
        public async Task<IActionResult> AddLineItem(InvoiceLineItemParam itemParam)
        {
            return Ok(await invoiceService.CreateLineItem(itemParam.invoiceId, itemParam.invoiceLineItemNameId, itemParam.price, itemParam.qty));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveLineItem(Guid Id)
        {
            await invoiceService.RemoveLineItem(Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetInvoiceDetail(long InvoiceId, Guid Secret)
        {
            var invoice = await invoiceService.GetInvoiceDetail(InvoiceId, Secret);
            return Ok(invoice);
        }

        [HttpPut]
        public async Task<IActionResult> AssignCompanyToInvoice(AssignCompanyToInvoiceData assignCompany)
        {
            await invoiceService.AssignCompanyToInvoice(assignCompany);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> AssignLocationToInvoice(AssignLocationToInvoiceData assignLocation)
        {
            await invoiceService.AssignLocationToInvoice(assignLocation);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateLineItemName(CreateLineItemParam createLineItemParam)
        {
            var id = await invoiceService.CreateLineItem(createLineItemParam.Name);
            return Ok(new
            {
                id = id,
                name = createLineItemParam.Name
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetLineItemNames()
        {
            return Ok(await invoiceService.GetListItemNames());
        }

        [HttpPost]
        public async Task<IActionResult> PayInvoice(PayInvoiceRequest request)
        {
            var result = await invoiceService.PayInvoice(request.InvoiceId, request.WalletPaymentMethodId);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> ArchiveInvoice(long invoiceId)
        {
            await invoiceService.ArchiveInvoice(invoiceId);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SendInvoice(long invoiceId)
        {
            await invoiceService.SendInvoice(invoiceId);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> SetStartDate(SetInvoiceDate date)
        {
            await invoiceService.SetStartDate(date.InvoiceId, date.DateSelection);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> SetEndDate(SetInvoiceDate date)
        {
            await invoiceService.SetEndDate(date.InvoiceId, date.DateSelection);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> SetDueDate(SetInvoiceDate date)
        {
            await invoiceService.SetDueDate(date.InvoiceId, date.DateSelection);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations(InvoiceSearchForLocation companyParam)
        {
            var locations = await invoiceService.GetLocations(companyParam.offset, companyParam.length, companyParam.LocationName, companyParam.CompanyId, companyParam.isActive);
            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = locations.total,
                recordsFiltered = locations.total,
                data = locations.ToList()
            });
        }

        [HttpGet]
        public async Task<IActionResult> SearchLocation(string name)
        {
            var users = await invoiceService.SearchLocation(1, 30, name);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> GetLineItems(LineItemParam lineItemParam)
        {
            var lineItemResponsse = await invoiceService.GetLineItems(lineItemParam.InvoiceId, lineItemParam.Offset, lineItemParam.PageSize);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = lineItemResponsse.total,
                recordsFiltered = lineItemResponsse.total,
                data = lineItemResponsse.ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> ChangeLineItemValue(LineItemParamChange lineItemParam)
        {
            await invoiceService.ChangeLineItemValue(lineItemParam);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> SetNotes(NotesParam param)
        {
            await invoiceService.SetNote(param.InvoiceId, param.Notes);
            return Ok();
        }
    }

    public class NotesParam
    {
        public long InvoiceId { get; set; }
        public string Notes { get; set; }
    }

    public class LineItemParam
    {
        public long InvoiceId { get; set; }
        public int Offset { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }

    public class CreateInvoiceParam
    {
        public long LocationId { get; set; }
    }

    public class SetInvoiceDate
    {
        public long InvoiceId { get; set; }
        public DateTime DateSelection { get; set; }
    }
}
