import React, { useState, useRef, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

const WebsiteBuilder = ({loadedUser, showNavigationBar}) => {

  // const router = useRouter();

  // Create Puck component config
  const config = {
    components: {
      HeadingBlock: {
        fields: {
          children: {
            type: "text",
          },
        },
        render: ({ children }) => {
          return <h1>{children}</h1>;
        },
      },
    },
  };
  
  // Describe the initial data
  const initialData = {};
  
  // Save the data to your database
  const save = (data) => {};

  return (
    <Box>
        <Puck config={config} data={initialData} onPublish={save} />;
    </Box>
  );
}

export default WebsiteBuilder;