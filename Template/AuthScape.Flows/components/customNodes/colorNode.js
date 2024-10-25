import { Box } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Box sx={{padding:1, backgroundColor:"white"}}>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <div>
          Custom Color Picker Node: <strong>{data.color}</strong>
        </div>
        
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          style={{ top: 10, background: '#555' }}
          isConnectable={isConnectable}
        />
        <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} />

        {/* <Handle
          type="source"
          position={Position.Right}
          id="b"
          style={{ bottom: 10, top: 'auto', background: '#555' }}
          isConnectable={isConnectable}
        /> */}
        {/* <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} /> */}
      </Box>
    </>
  );
});
