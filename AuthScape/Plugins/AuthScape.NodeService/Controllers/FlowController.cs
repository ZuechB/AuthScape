using AuthScape.Flows.Models;
using AuthScape.Flows.Services;
using AuthScape.NodeService.Models;
using AuthScape.Plugins.Invoices.Models;
using CoreBackpack.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthScape.NodeService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class FlowController : ControllerBase
    {
        readonly IFlowService flowService;
        public FlowController(IFlowService flowService)
        {
            this.flowService = flowService;
        }

        [HttpPut]
        public async Task<IActionResult> OnNodeDragged(OnNodeDragParam param)
        {
            await flowService.OnNodeDragged(param);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> CreateEdge(CreateEdgeParam param)
        {
            var id = await flowService.CreateEdge(param);
            return Ok(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFlow(NewFlowParam param)
        {
            var flowId = await flowService.CreateFlow(param);
            return Ok(flowId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNode(NewNodeParam param)
        {
            var node = await flowService.CreateNode(param);
            return Ok(node);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNode(Guid id)
        {
            await flowService.RemoveNode(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> GetFlows(GetInvoiceParam param)
        {
            var flows = await flowService.GetFlows(param.offset, param.length);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = flows.total,
                recordsFiltered = flows.total,
                data = flows.ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> SaveFlow(FlowPayload flowPayload)
        {
            await flowService.SaveFlow(flowPayload);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetFlow(Guid projectId)
        {
            return Ok(await flowService.GetFlow(projectId));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveEdge(Guid edgeId)
        {
            await flowService.RemoveEdge(edgeId);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAvailableNodes()
        {
            return Ok(flowService.GetAvailableNodes());
        }

        [HttpPost]
        public async Task<IActionResult> SetNodeData(NodeData data)
        {
            await flowService.SetNodeData(data);
            return Ok();
        }
    }
}