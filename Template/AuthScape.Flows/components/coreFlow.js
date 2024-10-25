import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback, useRef, lazy } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import {apiService} from 'authscape';
import ButtonEdge from '../components/ButtonEdge';
import { useRouter } from 'next/router';
import ContextMenu from './contextMenu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Fab from '@mui/material/Fab';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const drawerWidth = 240;
const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CoreFlow = ({loadedUser, projectId}) => {

  const router = useRouter();

  const reactFlowWrapper = useRef(null);
  const [nodeTypes, setNodeTypes] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewport, setViewport] = useEdgesState(defaultViewport);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null)

  const flowKey = 'example-flow';

  const onChange = (event) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== '2') {
          return node;
        }

        const color = event.target.value;

        setBgColor(color);

        return {
          ...node,
          data: {
            ...node.data,
            color,
          },
        };
      })
    );
  };

  const createANode = async (type, position = null) => {

    var response = await apiService().post("/Flow/CreateNode", {
      projectId: projectId,
      nodeType: type,
      position: position
    });

    if (response != null && response.status == 200)
    {
      let newNode = {
        id: "node-" + response.data.id,
        type: type,
        data: { label: response.data.title, onChange: onChange, color: initBgColor },
        position: position
      };

      setNodes((nds) => nds.concat(newNode));
    }    
  }

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      flow.projectId = projectId; // will need to assign this later

      let response = await apiService().post("/Flow/SaveFlow", flow);
      if (response != null && response.status == 200)
      {
        alert("Flow Saved!");
      }

    }
  }, [reactFlowInstance]);

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };


  useEffect(() => {

    if (loadedUser)
    {
      const fetchData = async () => {

        let response = await apiService().get("/Flow/GetFlow?projectId=" + projectId);
        if (response != null && response.status == 200)
        {
          setNodes(response.data.nodes);
          setEdges(response.data.edges);
          setViewport(response.data.viewport);

          const startNode = require('../components/customNodes/startNode').default;
          const colorNode = require('../components/customNodes/colorNode').default;
          const textFieldNode = require('../components/customNodes/textFieldNode').default;
          const getString = require('./customNodes/variables/getString').default;
          const setString = require('./customNodes/variables/setString').default;
          const writeLogNode = require('./customNodes/writeLogNode').default;
          const webhookNode = require('./customNodes/webhookNode').default;
          const downloadStream = require('./customNodes/downloadStream').default;
          const readSQL = require('./customNodes/readSQL').default;

          setNodeTypes({
            startNode: startNode,
            colorNode: colorNode, 
            textFieldNode: textFieldNode,
            getString: getString,
            setString: setString,
            writeLogNode: writeLogNode,
            webhookNode: webhookNode,
            downloadStream: downloadStream,
            readSQL: readSQL
          });

        }
      }
      fetchData();
    }

  }, [loadedUser]);

  const onConnect = useCallback(
    (params) => {

      const fetchData = async () => {

        let response = await apiService().put("/Flow/CreateEdge", {
          type: "buttonedge",
          source: params.source.replace("node-",""),
          target: params.target.replace("node-",""),
          projectId: projectId
        });

        if (response != null && response.status == 200)
        {          
          setEdges((eds) => addEdge({ ...params, id: response.data, animated: true, type:"buttonedge", style: { stroke: '#fff' } }, eds)), []
        }
      }
      fetchData();

    }
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      createANode(type, position);
    },
    [reactFlowInstance]
  );


  const onNodeDragStop = async (event, node) => {
    // get the node id and position
    const { id, position } = node;
    // construct the API request body
    const data = { id, position };

    await apiService().put("/Flow/OnNodeDragged", {
      projectId: projectId,
      id: id.replace("node-",""),
      position: position
    });

  };

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
    <Box sx={{position:"absolute", top:0, left:0, right:0, bottom:0}} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>

      {nodeTypes != null &&
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}></div>
            <ReactFlow
              ref={ref}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              edgeTypes={edgeTypes}
              onConnect={onConnect}
              style={{ background: bgColor }}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              snapToGrid={true}
              snapGrid={snapGrid}
              defaultViewport={viewport}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onNodeDragStop={onNodeDragStop}
              onDragOver={onDragOver}
              onNodeContextMenu={onNodeContextMenu}
              fitView>
              <MiniMap
                  position={"top-right"}
                  nodeStrokeColor={(n) => {
                      if (n.type === 'input') return '#0041d0';
                      if (n.type === 'selectorNode') return bgColor;
                      if (n.type === 'output') return '#ff0072';
                  }}
                  nodeColor={(n) => {
                      if (n.type === 'selectorNode') return bgColor;
                      return '#fff';
                  }}
              />
              <Controls />
            </ReactFlow>
            {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        </ReactFlowProvider>
      }
    </Box>


    <Fab variant="extended" sx={{position:"absolute", top:10, left:"50%", zIndex:9999, paddingRight:3}}>
        <PlayArrowRoundedIcon sx={{ mr: 1 }} />
        Run
    </Fab>

    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left">

      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'startNode')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Start"} />
            </ListItemButton>
          </ListItem>
      </List>


      <List sx={{paddingTop:0}}>
          <ListItem key={1} disablePadding className="dndnode input" onDragStart={(event) => onDragStart(event, 'colorNode')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Color"} />
            </ListItemButton>
          </ListItem>
      </List>
      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'textFieldNode')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Text"} />
            </ListItemButton>
          </ListItem>
      </List>

      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'getString')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Get String"} />
            </ListItemButton>
          </ListItem>
      </List>

      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'setString')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Set String"} />
            </ListItemButton>
          </ListItem>
      </List>


      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'writeLogNode')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Write Log"} />
            </ListItemButton>
          </ListItem>
      </List>

      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'webhookNode')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Webhook"} />
            </ListItemButton>
          </ListItem>
      </List>


      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'downloadStream')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Download Stream"} />
            </ListItemButton>
          </ListItem>
      </List>

      <List sx={{paddingTop:0}}>
          <ListItem key={2} disablePadding className="dndnode" onDragStart={(event) => onDragStart(event, 'readSQL')} draggable>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Read SQL"} />
            </ListItemButton>
          </ListItem>
      </List>


      

    </Drawer>
    
    </>
  );
};

export default CoreFlow;