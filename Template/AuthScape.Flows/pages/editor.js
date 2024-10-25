import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'reactflow/dist/style.css';
import CoreFlow from '../components/coreFlow';
import { useRouter } from 'next/router';

const Editor = ({loadedUser}) => {

  const router = useRouter();

  return (
    <Box>
      {(loadedUser && router.isReady) &&
        <CoreFlow loadedUser={loadedUser} projectId={router.query.projectId} />
      }
    </Box>
  );
};

export default Editor;