import React from 'react';
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Fab from '@mui/material/Fab';

import {
  // BaseEdge,
  // EdgeLabelRenderer,
  // getStraightPath,
  useReactFlow,
} from 'reactflow';
import { apiService } from 'authscape';
// import './index.css';

const foreignObjectSize = 40;

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
  projectId
}) {

  const { setEdges } = useReactFlow();

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml">
        <Fab size="small" color="secondary" sx={{width:"34px", height:"34px"}} aria-label="add" onClick={async () => {

          let edgeId = id.replace("edge-","");
          let response = await apiService().delete("/Flow/RemoveEdge?edgeId=" + edgeId);
          if (response != null && response.status == 200)
          {
            setEdges((es) => es.filter((e) => e.id !== id));
          }
        }}>
          <CloseRoundedIcon sx={{fontSize:"18px"}} />
        </Fab>
      </foreignObject>
    </>
  );
}