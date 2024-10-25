using AuthScape.Flows.Models;
using AuthScape.NodeService.Models;
using AuthScape.Services;
using CoreBackpack;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Services.Context;

namespace AuthScape.Flows.Services
{
    public interface IFlowService
    {
        Task<PagedList<FlowProject>> GetFlows(int offset = 1, int length = 10);
        Task SaveFlow(FlowPayload payload);
        Task<FlowPayload> GetFlow(Guid projectId);
        Task<Guid> CreateFlow(NewFlowParam param);
        Task<FlowNode> CreateNode(NewNodeParam param);
        Task<Guid> CreateEdge(CreateEdgeParam param);
        Task RemoveEdge(Guid edgeId);
        Task OnNodeDragged(OnNodeDragParam param);
        Task RemoveNode(Guid nodeId);
        List<AvailableNode> GetAvailableNodes();
        Task SetNodeData(NodeData data);
    }

    public class FlowService : IFlowService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userManagementService;
        public FlowService(DatabaseContext databaseContext, IUserManagementService userManagementService)
        {
            this.databaseContext = databaseContext;
            this.userManagementService = userManagementService;
        }

        public async Task OnNodeDragged(OnNodeDragParam param)
        {
            var flowNode = await databaseContext.FlowNodes
                .Where(f => f.FlowProjectId == param.ProjectId && f.Id == param.Id)
                .FirstOrDefaultAsync();

            if (flowNode != null)
            {
                flowNode.PositionX = param.Position.x;
                flowNode.PositionY = param.Position.y;

                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<Guid> CreateEdge(CreateEdgeParam param)
        {
            var newFlowEdge = new FlowEdge()
            {
                FlowProjectId = param.ProjectId,
                FlowSource = param.Source,
                FlowTarget = param.Target,
                Type = param.Type
            };

            await databaseContext.FlowEdges.AddAsync(newFlowEdge);
            await databaseContext.SaveChangesAsync();

            return newFlowEdge.Id;
        }

        public FlowNode GetAllNodes(NewNodeParam param)
        {
            var newNode = new FlowNode();
            newNode.FlowProjectId = param.ProjectId;
            newNode.PositionX = param.Position.x;
            newNode.PositionY = param.Position.y;

            var type = (NodeType)Enum.Parse(typeof(NodeType), param.NodeType);

            switch(type)
            {
                case NodeType.startNode:
                    newNode.Type = "startNode";
                    newNode.Name = "Start";
                    break;
                case NodeType.webHookNode:
                    newNode.Type = "webHookNode";
                    newNode.Name = "Webhook";
                    break;
                case NodeType.colorNode:
                    newNode.Type = "colorNode";
                    newNode.Name = "Color";
                    break;
                case NodeType.writeLogNode:
                    newNode.Type = "writeLogNode";
                    newNode.Name = "Write Log";
                    break;
                case NodeType.textFieldNode:
                    newNode.Type = "textFieldNode";
                    newNode.Name = "Text";
                    break;
                case NodeType.getString:
                    newNode.Type = "getString";
                    newNode.Name = "Get String";
                    break;
                case NodeType.setString:
                    newNode.Type = "setString";
                    newNode.Name = "Set String";
                    break;
                case NodeType.downloadStream:
                    newNode.Type = "downloadStream";
                    newNode.Name = "Download Stream";
                    break;
                case NodeType.readSQL:
                    newNode.Type = "readSQL";
                    newNode.Name = "Read SQL";
                    break;



            }

            return newNode;
        }


        public async Task<FlowNode> CreateNode(NewNodeParam param)
        {
            //var signedInUser = await userManagementService.GetSignedInUser();

            var newNode = GetAllNodes(param);

            await databaseContext.FlowNodes.AddAsync(newNode);
            await databaseContext.SaveChangesAsync();

            return newNode;
        }

        public async Task RemoveNode(Guid nodeId)
        {
            var node = await databaseContext.FlowNodes
                .Where(f => f.Id == nodeId)
                .FirstOrDefaultAsync();

            if (node != null)
            {
                var edges = await databaseContext.FlowEdges.Where(f => f.FlowSource == nodeId || f.FlowTarget == nodeId).ToListAsync();
                databaseContext.FlowEdges.RemoveRange(edges);
                databaseContext.FlowNodes.Remove(node);
                
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<Guid> CreateFlow(NewFlowParam param)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var newFlowProject = new FlowProject()
            {
                Name = param.Name,
                Created = SystemTime.Now,
                Description = param.Description,
                OwnerId = signedInUser.Id
            };

            await databaseContext.FlowProjects.AddAsync(newFlowProject);
            await databaseContext.SaveChangesAsync();

            return newFlowProject.Id;
        }

        public async Task<PagedList<FlowProject>> GetFlows(int offset = 1, int length = 10)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var flows = databaseContext.FlowProjects
                .Where(i => i.OwnerId == signedInUser.Id);

            //if (companyId != null)
            //{
            //    flows = flows.Where(i => i.CompanyId == companyId.Value);
            //}

            //if (locationId != null)
            //{
            //    flows = flows.Where(i => i.LocationId == locationId.Value);
            //}

            return await flows.OrderByDescending(i => i.Created)
                .ToPagedResultAsync(offset - 1, length);
        }

        public async Task<FlowPayload> GetFlow(Guid projectId)
        {
            var flowPayload = new FlowPayload();

            flowPayload.projectId = projectId;

            flowPayload.nodes = new List<FlowPayloadNode>();
            flowPayload.edges = new List<FlowPayloadEdge>();
            flowPayload.viewport = new FlowPayloadViewport();


            var flowNodes = await databaseContext.FlowNodes
                .Where(f => f.FlowProjectId == projectId)
                .ToListAsync();

            foreach (var flowNode in flowNodes)
            {
                flowPayload.nodes.Add(new FlowPayloadNode()
                {
                    id = ("node-" + flowNode.Id),
                    data = new FlowPayloadData()
                    {
                        Id = flowNode.Id,
                        label = flowNode.Name,
                    },
                    type = !String.IsNullOrWhiteSpace(flowNode.Type) ? flowNode.Type : "selectorNode",
                    width = 200,
                    height = 200,
                    position = new FlowPayloadPosition()
                    {
                        x = flowNode.PositionX,
                        y = flowNode.PositionY
                    }
                });
            }

            var flowEdges = await databaseContext.FlowEdges
                .Where(f => f.FlowProjectId == projectId)
                .ToListAsync();

            foreach (var edge in flowEdges)
            {
                flowPayload.edges.Add(new FlowPayloadEdge()
                {
                    id = "edge-" + edge.Id,
                    animated = true,
                    type = edge.Type,
                    source = "node-" + edge.FlowSource,
                    target = "node-" + edge.FlowTarget,
                    projectId = projectId
                });
            }

            var viewport = await databaseContext.FlowViewports
                .Where(f => f.FlowProjectId == projectId)
                .FirstOrDefaultAsync();

            if (viewport != null)
            {
                flowPayload.viewport = new FlowPayloadViewport()
                {
                    x = viewport.x,
                    y = viewport.y,
                    zoom = viewport.zoom
                };
            }

            return flowPayload;
        }

        public async Task SaveFlow(FlowPayload payload)
        {
            // find the deleted notes

            foreach (var node in payload.nodes)
            {
                var nodeId = Guid.Parse(node.id.Replace("node-", ""));

                var flowNode = await databaseContext.FlowNodes
                    .Where(f => f.FlowProjectId == payload.projectId && f.Id == nodeId)
                    .FirstOrDefaultAsync();

                if (flowNode != null)
                {
                    flowNode.Name = node.data.label;
                    flowNode.PositionX = node.position.x;
                    flowNode.PositionY = node.position.y;
                }
                else
                {
                    await databaseContext.FlowNodes.AddAsync(new FlowNode()
                    {
                        Name = node.data.label,
                        FlowProjectId = payload.projectId,
                        PositionX = node.position.x,
                        PositionY = node.position.y
                    });
                }
            }

            // find the deleted edges

            foreach (var edge in payload.edges)
            {
                var edgeId = Guid.Parse(edge.id.Replace("edge-", ""));

                var flowEdge = await databaseContext.FlowEdges
                    .Where(f => f.FlowProjectId == payload.projectId && f.Id == edgeId)
                    .FirstOrDefaultAsync();

                if (flowEdge != null)
                {
                    flowEdge.FlowSource = Guid.Parse(edge.source.Replace("node-", ""));
                    flowEdge.FlowTarget = Guid.Parse(edge.target.Replace("node-", ""));
                    flowEdge.Type = edge.type;
                }
                else
                {
                    await databaseContext.FlowEdges.AddAsync(new FlowEdge()
                    {
                        FlowProjectId = payload.projectId,
                        FlowSource = Guid.Parse(edge.source.Replace("node-", "")),
                        FlowTarget = Guid.Parse(edge.target.Replace("node-", "")),
                        Type = edge.type
                    });
                }
            }

            var flowViewport = await databaseContext.FlowViewports
                .Where(f => f.FlowProjectId == payload.projectId)
                .FirstOrDefaultAsync();

            if (flowViewport != null)
            {
                flowViewport.x = payload.viewport.x;
                flowViewport.y = payload.viewport.y;
                flowViewport.zoom = payload.viewport.zoom;
            }
            else
            {
                await databaseContext.FlowViewports.AddAsync(new FlowViewport()
                {
                    FlowProjectId = payload.projectId,
                    x = payload.viewport.x,
                    y = payload.viewport.y,
                    zoom = payload.viewport.zoom
                });
            }

            await databaseContext.SaveChangesAsync();
        }

        public async Task RemoveEdge(Guid edgeId)
        {
            var flowEdge = await databaseContext.FlowEdges
                .Where(f => f.Id == edgeId)
                .FirstOrDefaultAsync();

            if (flowEdge != null)
            {
                databaseContext.FlowEdges.Remove(flowEdge);
                await databaseContext.SaveChangesAsync();
            }
        }

        public List<AvailableNode> GetAvailableNodes()
        {
            var availableNodes = new List<AvailableNode>();

            availableNodes.Add(new AvailableNode()
            {
                Name = "Color Picker",
                Description = "",
                Type = "colorNode",
            });


            return availableNodes;
        }

        public async Task SetNodeData(NodeData data)
        {
            var node = await databaseContext.FlowNodes
                .Where(d => d.Id == data.nodeId)
                .FirstOrDefaultAsync();

            if (node != null) 
            {
                node.Data = data.Data;
                await databaseContext.SaveChangesAsync();
            }
        }
    }
}
