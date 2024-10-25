using AuthScape.Document.Mapping.Models;
using AuthScape.Document.Mapping.Services;
using AuthScape.Plugins.Invoices.Models;
using CoreBackpack.Time;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using Services.Context;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;
using AuthScape.Models.Storage;
using System.Linq;
using AuthScape.Models.Users;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using StrongGrid.Resources;
using Services;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InvoiceUploadController : ControllerBase
    {
        readonly DatabaseContext databaseContext;
        readonly IMappingService mappingService;
        readonly IInvoiceService invoiceService;
        public InvoiceUploadController(DatabaseContext databaseContext, IMappingService mappingService, IInvoiceService invoiceService)
        {
            this.databaseContext = databaseContext;
            this.mappingService = mappingService;
            this.invoiceService = invoiceService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Upload([FromForm] UploadCompanyInvoice orderFile)
        {
            long documentTypeId = 4;

            var documentOptions = new DocumentOptions();

            documentOptions.EnablePDFAndPhotoReading = true;
            documentOptions.HeaderOptions.AutoDetectHeadersWithAI = true;
            documentOptions.AzureModuleId = "CorporateConcepts";
            documentOptions.WriteToDatabaseAutomatically = false;

            var company = await databaseContext.Companies.Where(c => c.Id == orderFile.CompanyId).FirstOrDefaultAsync();

            var records = await mappingService.Execute(orderFile.file, documentTypeId, documentOptions); // assign the documentID based on the document we are using...

            foreach (InvoiceUpload invoiceUpload in records)
            {
                await CreateInvoice(invoiceUpload);
            }

            return Ok();
        }


        private async Task CreateInvoice(InvoiceUpload invoiceUpload)
        {
            // add the company and location
            var newCompany = new Company()
            {
                Title = invoiceUpload.businessName
            };
            await databaseContext.Companies.AddAsync(newCompany);
            await databaseContext.SaveChangesAsync();

            var newLocation = new Location()
            {
                Title = invoiceUpload.addressTo + " " + invoiceUpload.cityTo + ", " + invoiceUpload.stateTo + " " + invoiceUpload.zipcodeTo,
                Address = invoiceUpload.addressTo,
                City = invoiceUpload.cityTo,
                State = invoiceUpload.stateTo,
                ZipCode = invoiceUpload.zipcodeTo,
                CompanyId = newCompany.Id
            };
            await databaseContext.Locations.AddAsync(newLocation);
            await databaseContext.SaveChangesAsync();




            var newShipToCompany = new Company()
            {
                Title = invoiceUpload.shipToCompany
            };
            await databaseContext.Companies.AddAsync(newShipToCompany);
            await databaseContext.SaveChangesAsync();

            var newShipLocation = new Location()
            {
                Title = invoiceUpload.shipToAddress + " " + invoiceUpload.shipToCity + ", " + invoiceUpload.shipToState + " " + invoiceUpload.shipToZipCode,
                Address = invoiceUpload.shipToAddress,
                City = invoiceUpload.shipToCity,
                State = invoiceUpload.shipToState,
                ZipCode = invoiceUpload.shipToZipCode,
                CompanyId = newShipToCompany.Id
            };
            await databaseContext.Locations.AddAsync(newShipLocation);
            await databaseContext.SaveChangesAsync();



            var newInvoice = new AuthScape.Plugins.Invoices.Models.Invoice()
            {
                InvoiceState = InvoiceState.Active,
                Created = SystemTime.Now,
                CompanyName = invoiceUpload.businessName,
                AmountDue = 0,
                BalanceDue = 0,
                AmountPaid = 0,
                LocationId = newLocation.Id,
                //InvoiceToUserId = user != null ? user.Id : null,
                CompanyId = newCompany.Id,
                ShipToLocationId = newShipLocation.Id,
                Secret = Guid.NewGuid()
            };
            await databaseContext.Invoices.AddAsync(newInvoice);
            await databaseContext.SaveChangesAsync();



            if (!String.IsNullOrWhiteSpace(invoiceUpload.productInformation))
            {
                var productInformations = JsonConvert.DeserializeObject<List<InvoiceProductInformation>>(invoiceUpload.productInformation);

                Guid? currentLineItemId = null;
                foreach (var productInformation in productInformations)
                {
                    if (!String.IsNullOrWhiteSpace(productInformation.Qty) && !String.IsNullOrWhiteSpace(productInformation.Price))
                    {
                        // the qty and price could have exceptions here... this is just prototype code...
                        var cleanQty = productInformation.Qty.ToLower().Replace("each", "");
                        var decQty = Convert.ToDecimal(cleanQty);
                        var intQty = Convert.ToInt32(decQty);

                        var decPrice = Convert.ToDecimal(productInformation.Price);

                        var nameId = await invoiceService.CreateLineItem(productInformation.Description);
                        currentLineItemId = await invoiceService.CreateLineItem(newInvoice.Id, nameId, decPrice, intQty);
                    }
                    else
                    {
                        if (currentLineItemId != null)
                        {
                            // attach the data to the current line item on record

                            var invoiceLineItem = await databaseContext.InvoiceLineItems.Where(d => d.Id == currentLineItemId).FirstOrDefaultAsync();
                            if (invoiceLineItem != null)
                            {
                                if (invoiceLineItem.Description == null)
                                {
                                    invoiceLineItem.Description = "";
                                }

                                invoiceLineItem.Description += productInformation.Description;
                                await databaseContext.SaveChangesAsync();
                            }
                        }
                    }
                }
            }
        }
    }

    public class InvoiceProductInformation
    {
        public string Qty { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Subtotal { get; set; }
    }

    public class InvoiceUpload // this will be the format we use for all PDF documents
    {
        public string projectNumber { get; set; }
        public string poDate { get;set; }
        public string poNumber { get; set; }
        public string contact { get; set; }
        public string businessName { get; set; }
        public string addressTo { get; set; }
        public string cityTo { get; set; }
        public string stateTo { get; set; }
        public string zipcodeTo { get; set; }
        public string shipToCompany { get; set; }
        public string shipToAddress { get; set; }
        public string shipToCity { get; set; }
        public string shipToState { get; set; }
        public string shipToZipCode { get; set; }
        public string shipToPhone { get; set; }
        public string salesPerson { get; set; }
        public string productInformation { get; set; }
    }

    public class UploadCompanyInvoice : FileStorage
    {
        public long CompanyId { get; set; }
    }
}
