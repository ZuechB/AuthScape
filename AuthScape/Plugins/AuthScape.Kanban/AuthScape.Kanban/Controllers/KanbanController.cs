using AuthScape.Kanban.Services;
using AuthScape.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Kanban;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.Kanban.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class KanbanController : ControllerBase
    {
        readonly IKanbanService kanbanService;
        public KanbanController(IKanbanService kanbanService)
        {
            this.kanbanService = kanbanService;
        }

        [HttpGet]
        public async Task<IActionResult> GetKanban(long? identifier = null)
        {
            return Ok(await kanbanService.GetKanban(identifier));
        }

        [HttpPut]
        public async Task<IActionResult> SetColumnOrder(ColumnOrder column)
        {
            await kanbanService.AssignColumnOrder(column.ColumnsIds);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> AssignColumnForCard(AssignedCardToColumn assignedCardToColumn)
        {
            await kanbanService.AssignCardToColumn(assignedCardToColumn);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> AssignCardsBasedOnOrder(CardPosition position)
        {
            await kanbanService.AssignCardsBasedOnOrder(position.CardId, position.ColumnId, position.Cards);
            return Ok();
        }
    }

    public class CardPosition
    {
        public Guid CardId { get; set; }
        public Guid ColumnId { get; set; }
        public List<Guid> Cards { get; set; }
    }

    public class ColumnOrder
    {
        public List<Guid> ColumnsIds { get; set; }
    }
}