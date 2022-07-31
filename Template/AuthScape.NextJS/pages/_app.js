import React from 'react';
import '../styles/globals.css'
import {AuthorizationComponent} from 'authscape';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadedUser, setLoadedUser] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  return (
    <>
      <AuthorizationComponent setCurrentUser={setCurrentUser} userLoaded={() => {
          setLoadedUser(true);
      }}>
        <Component {...pageProps} currentUser={currentUser} setIsLoading={setIsLoading} loadedUser={loadedUser} />
      </AuthorizationComponent>

      <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={isLoading}>
          <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default MyApp
