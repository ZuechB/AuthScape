import React, { useEffect, useState, useRef } from 'react';
//import apiService from './apiService';

export function AuthorizationComponent({children, setCurrentUser, userLoaded, isLoading}) {

    const [loaded, setLoaded] = useState(false);
    const validateUserSignedIn = async () => {

      setLoaded(true);

      let usr = await apiService().GetCurrentUser();
      if (usr != null)
      {
        setCurrentUser(usr);
      }
      else
      {
        setCurrentUser(null);
      }

      userLoaded();
    }

    useEffect(() => {

        if (!loaded)
        {
            validateUserSignedIn();
        }

    }, [loaded]);

    return (children)
}