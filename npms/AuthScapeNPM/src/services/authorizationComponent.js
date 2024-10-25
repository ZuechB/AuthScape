import React, { useEffect, useState, useRef } from 'react';
//import apiService from './apiService';

export function AuthorizationComponent({children, isEnabled, setCurrentUser, userLoaded, isLoading}) {

    const [loaded, setLoaded] = useState(false);
    const validateUserSignedIn = async () => {

      setLoaded(true);

      let signedInUser = null;
      if (isEnabled)
      {
        let usr = await apiService().GetCurrentUser();
        if (usr != null)
        {
          setCurrentUser(usr);
          signedInUser = usr;
        }
        else
        {
          setCurrentUser(null);
        }
      }
      else
      {
        setCurrentUser(null);
      }

      userLoaded(signedInUser);
    }

    useEffect(() => {

        if (!loaded)
        {
            validateUserSignedIn();
        }

    }, [loaded]);

    return (children)
}