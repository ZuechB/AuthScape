import React, { useState, useRef, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
// import GrapesJSEditor from '../../../components/GrapesJSEditor';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const WebsiteBuilder = ({loadedUser, showNavigationBar}) => {

  const router = useRouter();

  const GrapesJSEditor = dynamic(() => import('../../components/GrapesJSEditor'), {
    ssr: false,
  });

  return (
    <Box>
        <GrapesJSEditor loadedUser={loadedUser} isReady={router.isReady} pageId={router.query.pageId} />
    </Box>
  );
}

export default WebsiteBuilder;