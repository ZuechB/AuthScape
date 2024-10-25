import { Box, TextField } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Typography from '@mui/material/Typography';

export default memo(({ data, isConnectable }) => {

  return (
    <>
      <Box sx={{backgroundColor:"#fff", border: "1px solid white", borderRadius:1, width:200}}>

        <Typography variant="subtitle1" gutterBottom sx={{paddingLeft:1}}>
            Print String
        </Typography>

        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        
      </Box>
    </>
  );
});