using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthScape.Plugins.Invoices.Models;
using OpenIddict.Validation.AspNetCore;
using Services;
using System;
using System.Linq;
using System.Threading.Tasks;

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
            var companies = await invoiceService.GetInvoices(param.offset, param.length, param.invoiceState);

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
            var invoiceId = await invoiceService.CreateInvoice(param.userId);
            return Ok(invoiceId);
        }

        [HttpPut]
        public async Task<IActionResult> AddLineItem(InvoiceLineItemParam itemParam)
        {
            await invoiceService.CreateLineItem(itemParam.invoiceId, itemParam.invoiceLineItemNameId, itemParam.price, itemParam.qty);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveLineItem(long Id)
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

        [HttpGet]
        public async Task<IActionResult> GetPaymentMethods()
        {
            var paymentMethods = await invoiceService.GetPaymentMethods();
            return Ok(paymentMethods);
        }

        [HttpPost]
        public async Task<IActionResult> PayInvoice(PayInvoiceRequest request)
        {
            await invoiceService.PayInvoice(request.InvoiceId, request.WalletId);
            return Ok();
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
    }

    public class CreateInvoiceParam
    {
        public long userId { get; set; }
    }
}
