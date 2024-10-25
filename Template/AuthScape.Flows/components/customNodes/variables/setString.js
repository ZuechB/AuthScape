import { Box, TextField } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Typography from '@mui/material/Typography';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Box sx={{backgroundColor:"#fff", border: "1px solid white", borderRadius:1}}>

        <Typography variant="subtitle1" gutterBottom sx={{paddingLeft:1}}>
            variable name
        </Typography>

        <Box sx={{border: '1px solid #ddd', padding: 1, position: 'relative' }}>
          <TextField className="nodrag" label="" variant="outlined" fullWidth={true} InputLabelProps={{ shrink: true }} />
          <Handle
            type="source"
            position={Position.Right}
            id="b2"
            style={{ top: 30, background: '#555' }}
            isConnectable={isConnectable}
          />
        </Box>
        
      </Box>
    </>
  );
});
