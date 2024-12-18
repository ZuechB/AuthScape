import React, {useEffect, useState} from 'react';
import '../styles/globals.css'
import "../components/blocky/BlocklyComponent.css";
import Layout from '../components/layout/portalLayout';
import { AuthScapeApp } from 'authscape';
// import { AuthScapeApp } from '../components/AuthScapeApp';
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'reactflow/dist/style.css';
import { Box } from '@mui/material';
import { baselightTheme } from "../components/theme";
import 'react-querybuilder/dist/query-builder.css';

// spreadsheet
import "../styles/reactGrid.scss";
import 'react-image-crop/dist/ReactCrop.css'


import "@measured/puck/puck.css";

function MyApp({ Component, pageProps }) {

  const layout = ({children, currentUser}) => {
    return (
      <Box sx={{height:"100vh"}}>
        <Layout currentUser={currentUser} loadedUser={true} pageProps={pageProps}>
          {children}
        </Layout>
      </Box>
    )
  }

  return (
    <AuthScapeApp Component={Component} layout={layout} muiTheme={baselightTheme} enforceLoggedIn={true} pageProps={pageProps} />
  )
}

export default MyApp