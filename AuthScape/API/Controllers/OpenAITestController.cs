using AuthScape.AzureCloudService;
using AuthScape.AzureOpenAI.Models;
using CsvHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using OpenAI;
using OpenAI.Chat;
using Org.BouncyCastle.Asn1.Crmf;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAITestController : ControllerBase
    {
        readonly IAzureOpenAIService azureOpenAIService;
        public OpenAITestController(IAzureOpenAIService azureOpenAIService)
        {
            this.azureOpenAIService = azureOpenAIService;
        }

        //[HttpGet]
        //public async Task<IActionResult> Get(string message)
        //{
        //    var messages = new System.Collections.Generic.List<AuthScape.AzureOpenAI.Models.Message>();
        //    messages.Add(new AuthScape.AzureOpenAI.Models.Message()
        //    {
        //        Content = "Hello",
        //        Type = AuthScape.AzureOpenAI.Models.ChatMessageType.UserMessage
        //    });

        //    var response = await azureOpenAIService.Generate("", "", messages);

        //    return Ok(response.First().Text);
        //}


        [HttpGet("stream")]
        public async Task StreamChat([FromQuery] string request)
        {
            Response.ContentType = "text/event-stream";

            var newMessages = new List<Message>();
            newMessages.Add(new Message()
            {
                Type = ChatMessageType.SystemMessage,
                Content = "You are a helpful assistant that can help with order information. You will respond professional and reply respectfully about specifics on the user's order."
            });


            newMessages.Add(new Message()
            {
                Type = ChatMessageType.SystemMessage,
                Content = "here are the order details:"
            });





            newMessages.Add(new Message()
            {
                Type = ChatMessageType.SystemMessage,
                Content = "Id\tCreated\tProjectId\tKanbanCardId\tdealer_email\tdealer_website\tinstallTo_address\tdealer_city\tdealer_state\tdealer_postalCode\tdealer_name\tshipTo_address\tproject_salesPerson\tsalesTax\tshipTo_name\tshipTo_email\tinstallTo_phoneNumber\tsubtotal\tshipTo_phoneNumber\tmanufacturer_address\tmanufacturer_city\tmanufacturer_postalCode\tmanufacturer_phoneNumber\tmanufacturer_name\tmanufacturer_email\tmanufacturer_locationName\tpo_issuedDate\tmanufacturer_state\tinstallTo_state\tinstallTo_name\tinvoice_type\tinstallTo_city\tinstallTo_postalCode\tdealer_phoneNumber\tshipTo_city\tinvoice_amountDue\tshipTo_postalCode\tproject_number\tshipTo_state\tinvoice_customerPO\ttotal\tinvoice_tin\tinvoice_salesPerson\tinvoice_termsOfSale\tinvoice_date\tinstallTo_email\tManufacturerCompanyId\tpo_total\tUploadedFileName\tArchived\tDealerCompanyId\tCreatedOnKanbanColumnId\tCreatedByUserId\tpo_number\tpo_shippingMethod\tInvoiceFileName\tAcknowledgementFileName\tbillTo_address\tbillTo_city\tbillTo_company\tbillTo_contact\tbillTo_email\tbillTo_phoneNumber\tbillTo_postalCode\tbillTo_state\tdealer_address\r\nDBF0522C-5016-4C64-2FB5-08DC9A9B15EF\t2024-07-02 13:30:05.8201805 +00:00\t1\tDFF64E31-7738-EF11-86D4-000D3A134151\tNULL\twww.commercialofficeinteriors.com\tNULL\tLondonderry,\tNH\t03053\tCommercial Office Interiors, LLC\t55 Meadowbrook Dr\tJosh Flibotte\tNULL\tBarbour Milford Factory Shop\tNULL\tNULL\tNULL\tNULL\t25 Tucker Drive\tLeominster,\t01453\tNULL\tAIS Inc\tNULL\tNULL\t5/7/2024\tMA\tNULL\tNULL\tNULL\tNULL\tNULL\t(603) 704-0414\tMilford,\tNULL\t03055\t615\tNH\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\t2471\tNULL\tdbf0522c-5016-4c64-2fb5-08dc9a9b15ef.pdf\tNULL\t2470\t4C1602D3-AFF5-EE11-BFC3-5CF370813254\t6\tJF615-02\tBest Way\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\tNULL\t75 Gilcreast Rd., STE 210-171"
            });



            //var records = new List<dynamic>();
            //var reader = new StreamReader("D:\\xfer\\ReadThis.csv");

            //string line = null;
            //while((line = await reader.ReadLineAsync()) != null)
            //{
            //    newMessages.Add(new Message()
            //    {
            //        Type = ChatMessageType.SystemMessage,
            //        Content = line
            //    });
            //}
            //reader.Close();


            newMessages.Add(new Message()
            {
                Type = ChatMessageType.UserMessage,
                Content = request
            });

            var updates = azureOpenAIService.Generate("https://visionname.openai.azure.com", "gpt-35-turbo", newMessages);

            await foreach (var update in updates)
            {
                foreach (var contentUpdate in update.ContentUpdate)
                {
                    await Response.WriteAsync($"data: {contentUpdate.Text}\n\n");
                    await Response.Body.FlushAsync();
                }
            }
        }

    }
}
