import { Box } from '@mui/material';
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Popover from '@mui/material/Popover';
import { FlowDataType } from './enums/dataTypeEnum';

export default memo(({ data, isConnectable, isRightPosition = true, position = 1, dataType = 0 }) => {

    let newTop = position == 1 ? 10 : (position * 30);

    let color = "";
    let name = "";
    if (dataType == 0) // init
    {
      color = "green";
      name = "Execute Node";
    }
    else if (dataType == 1) // string
    {
      color = "orange";
      name = "String";
    }
    else if (dataType == 2) // datetime
    {
      color = "purple";
      name = "Date Time";
    }
    else if (dataType == 3) // Boolean
    {
      color = "red";
      name = "Boolean (yes or no)";
    }


  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Handle
        type="source"
        position={isRightPosition ? Position.Right : Position.Left}
        id={data.id}
        style={{ top: newTop, background: color }}
        isConnectable={isConnectable}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
          {/* <Box sx={{fontSize:5, fontWeight:"bold", position:"relative", left: -10, top:10, backgroundColor:"black", color:"white", width:30, borderRadius:2}}>
            Hello world
          </Box> */}
      </Handle>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={anchorEl != null ? true : false}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
          <Box sx={{padding:2}}>
            {name}
          </Box>
      </Popover>
    </>
  );
});
