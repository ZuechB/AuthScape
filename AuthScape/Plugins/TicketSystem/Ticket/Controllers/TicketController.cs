using AuthScape.TicketSystem.Modals;
using AuthScape.TicketSystem.Models;
using AuthScape.TicketSystem.Services;
using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.TicketSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        readonly ITicketService ticketService;

        public TicketController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateTicket(CreateTicketParam param)
        {
            var ticketId = await ticketService.CreateTicket(param.TicketTypeId, param.TicketStatusId, param.Description, param.Message);
            return Ok(ticketId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicketPublic(CreatePublicTicketParam param)
        {
            var ticketId = await ticketService.CreateTicketPublic(param.Email, param.FirstName, param.LastName, param.TicketTypeId, param.TicketStatusId, param.Description);
            return Ok(ticketId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(CreateTicketMessageParam param)
        {
            await ticketService.CreateTicketMessage(param.TicketId, param.Name, param.Message, param.CreatedByUserId, param.IsNote);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetMessages(long ticketId, bool isNote, int pageNumber = 1, int pageSize = 20)
        {
            return Ok(await ticketService.GetTicketMessages(ticketId, isNote, pageNumber, pageSize));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetTickets(GetTicketRequestParam param)
        {
            var tickets = await ticketService.GetTickets(param.offset, param.length, param.ticketStatusId, param.ticketTypeId);
            return Ok(new ReactDataTable
            {
                draw = 0,
                recordsTotal = tickets.total,
                recordsFiltered = tickets.total,
                data = tickets.ToList()
            });
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetTicket(long ticketId)
        {
            return Ok(await ticketService.GetTicket(ticketId));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> FindUser(string query)
        {
            return Ok(await ticketService.FindUser(query));
        }

        [HttpDelete]
        public async Task<IActionResult> ArchiveTicket(long id)
        {
            await ticketService.ArchiveTicket(id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            return Ok(await ticketService.GetTicketStatuses());
        }

        [HttpGet]
        public async Task<IActionResult> GetTicketTypes()
        {
            return Ok(await ticketService.GetTicketTypes());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateParticipants(AddParticipantsViewModel addParticipantsViewModel)
        {
            await ticketService.UpdateParticipants(addParticipantsViewModel.TicketId, addParticipantsViewModel.Participants);
            return Ok();
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateStatus(UpdateTicketStatus ticketStatus)
        {
            await ticketService.UpdateStatus(ticketStatus.Id, ticketStatus.TicketStatusId);
            return Ok();
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateTicketType(UpdateTicketType ticketType)
        {
            await ticketService.UpdateTicketType(ticketType.Id, ticketType.TicketTypeId);
            return Ok();
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateTicketPriority(UpdateTicketPriority ticketPriority)
        {
            await ticketService.UpdateTicketPriority(ticketPriority.Id, ticketPriority.PriorityLevel);
            return Ok();
        }
    }

    public class UpdateTicketPriority
    {
        public long Id { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
    }

    public class UpdateTicketStatus
    {
        public long Id { get; set; }
        public int TicketStatusId { get; set; }
    }

    public class UpdateTicketType
    {
        public long Id { get; set; }
        public int TicketTypeId { get; set; }
    }

    public class CreateTicketParam
    {
        public int TicketTypeId { get; set; }
        public int TicketStatusId { get; set; }
        public string? Description { get; set; }
        public string Message { get; set; }
    }

    public class CreatePublicTicketParam
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int TicketTypeId { get; set; }
        public int TicketStatusId { get; set; }
        public string? Description { get; set; }
    }

    public class CreateTicketMessageParam
    {
        public long TicketId { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public long? CreatedByUserId { get; set; } = null;
        public bool IsNote { get; set; }
    }

    public class GetTicketRequestParam
    {
        public int offset { get; set; } = 0;
        public int length { get; set; } = 20;
        public int? ticketStatusId { get; set; } = null;
        public int? ticketTypeId { get; set; } = null;
    }
}