import React, {forwardRef} from 'react';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

/// use in testing
// import {Action} from './Action';

const dragIcon = () => {
  return <DragIndicatorRoundedIcon/>
}

export const Handle = forwardRef(
  (props, ref) => {
    return (
      <Action
        icon={dragIcon}
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
      </Action>
    );
  }
);