import React, {useEffect, useState} from 'react';
import '../styles/globals.css'
import { AuthScapeApp } from 'authscape';
import 'reactflow/dist/style.css';
import { Box } from '@mui/material';

function MyApp({ Component, pageProps }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);

  return (
    <Box sx={{height:"100vh"}}>
      <AuthScapeApp Component={Component} enforceLoggedIn={true} pageProps={pageProps} onAuthenticationLoaded={(currentUser) => {
        setCurrentUser(currentUser);
        setLoadedUser(true);
      }} />
    </Box>
  )
}

export default MyApp
