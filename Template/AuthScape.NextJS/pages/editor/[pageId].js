import React, { useState, useRef, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
// import GrapesJSEditor from '../../../components/GrapesJSEditor';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { render } from '@fullcalendar/core/preact.js';
import { Button } from '@mui/material';

const WebsiteBuilder = ({loadedUser, showNavigationBar}) => {

  const router = useRouter();

  const GrapesJSEditor = dynamic(() => import('../../components/GrapesJSEditor'), {
    ssr: false,
  });



  const MyButton = () => { 
  
    alert("found me!");
    
    return ( "This is a test" ) 
  
  };

  const myPlugin = (editor, opts = {}) => {
    const options = {
      blockLabel: 'Custom Block',
      ...opts,
    };
  
    // Add a custom block
    editor.BlockManager.add('my-block', {
      label: options.blockLabel,
      content: '<div class="my-block" id="react-block">weeee</div>',
      category: 'Basic',
      // render: ({ el }) => {
      //   const reactBlock = el.querySelector('#react-block');

      //   alert(reactBlock)
      //   if (reactBlock) {
      //     alert("another location")
      //     // Use createRoot instead of ReactDOM.render
      //     const root = createRoot(reactBlock);
      //     root.render(<MyButton />);
      //   }
      // },
    });


    // // Listen for the component:add event
    // editor.on('component:add', (model) => {

    //   alert("found this!")
    //   const el = model.view.el;
    //   const reactBlock = el.querySelector('#react-block');
    //   if (reactBlock) {
    //     // Use createRoot instead of ReactDOM.render
    //     const root = createRoot(reactBlock);
    //     root.render(<MyButton />);
    //   }
    // });

    
  };

  return (
    <Box>
        <GrapesJSEditor loadedUser={loadedUser} isReady={router.isReady} pageId={router.query.pageId} plugins={[myPlugin]} />
    </Box>
  );
}

export default WebsiteBuilder;