import React, {useCallback, useEffect, useRef, useState} from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

/// use in testing
// import {Action} from './Action';

const removeIcon = () => {
  return <DeleteRoundedIcon/>
}

export function Remove(props) {
  return (
    <Action
      icon={removeIcon}
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
    </Action>
  );
}