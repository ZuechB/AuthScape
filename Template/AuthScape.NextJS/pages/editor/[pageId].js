import React, { useState, useRef, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Puck } from "@measured/puck";
import { Typography } from '@mui/material';
import { color, fontSize, paddingLeft } from '@xstyled/styled-components';


const WebsiteBuilder = ({loadedUser, showNavigationBar}) => {

  // const router = useRouter();

  // Create Puck component config
  const config = {
    components: {
      Header: {
        fields: {
          Header: {
            type: "select",
            options: [
              { label: "H1", value: "h1" },
              { label: "H2", value: "h2" },
              { label: "H3", value: "h3" },
              { label: "H4", value: "h4" },
              { label: "H5", value: "h5" },
              { label: "H6", value: "h6" },
            ],
          },
          Text: {
            type: "text",
          },
          Color: {
            type: "text"
          },
          TextAlign: {
            type: "radio",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ]
          }
        },
        render: ({ Text, TextAlign, Color, Header = "h1" }) => {
          return <Box sx={{
            textAlign: TextAlign
          }}>
            <Typography variant={Header} gutterBottom sx={{color: Color}}>
            {Text}
            </Typography>
          </Box>;
        },
      },
      Text: {
        fields: {
          Text: {
            type: "text",
          },
          FontSize: {
            type: "number"
          },
          Color: {
            type: "text"
          },
          TextAlign: {
            type: "radio",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ]
          }
        },
        render: ({ Text, FontSize, Color, TextAlign }) => {
          return <Box sx={{
            textAlign: TextAlign,
            fontSize: FontSize,
            color: Color
          }}>
            {Text}
          </Box>;
        },
      },
      


    },
  };
  
  // Describe the initial data
  const initialData = {};
  
  // Save the data to your database
  const save = (data) => {};

  return (
      <Puck className={"Puck"} config={config} data={initialData} onPublish={save} />
  );
}

export default WebsiteBuilder;