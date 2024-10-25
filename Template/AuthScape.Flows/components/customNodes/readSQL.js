import { Box, TextField } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Typography from '@mui/material/Typography';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import DataTypesHandle from './dataTypesHandle';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Box sx={{color:"#000", backgroundColor:"#fff", border: "1px solid white", borderRadius:1}}>

        <DataTypesHandle data={data} isRightPosition={false} isConnectable={isConnectable} position={1} dataType={0} />

        {/* <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        /> */}


        <Typography variant="subtitle1" gutterBottom>
          {data.label}
        </Typography>


        <DataTypesHandle data={data} isConnectable={isConnectable} position={1} dataType={0} />


        <DataTypesHandle data={data} isConnectable={isConnectable} position={2} dataType={1} />


        
        <Box sx={{border: '1px solid #ddd', padding: '2px', position: 'relative' }}>
          <Editor height="200px" width={"400px"} className="nodrag" defaultLanguage="javascript" defaultValue="// some comment" />




          {/* <TextField className="nodrag" label="" variant="outlined" fullWidth={true} InputLabelProps={{ shrink: true }} /> */}
          {/* <Handle
            type="source"
            position={Position.Right}
            id="b2"
            style={{ top: 10, background: '#555' }}
            isConnectable={isConnectable}
          /> */}
        </Box>

        {/* <Box sx={{border: '1px solid #ddd', padding: '10px', position: 'relative' }}>
          <Handle
            type="source"
            position={Position.Right}
            id="c3"
            style={{ bottom: 10, top: 'auto', background: '#555' }}
            isConnectable={isConnectable}
          />
        </Box> */}
        
      </Box>
    </>
  );
});
