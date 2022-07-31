import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {authService, signInValidator} from 'authscape';

export default function SigninOidc() {

    const router = useRouter();
    useEffect(() => {
        if(!router.isReady) return;

        if (router.query.code != null)
        {
          signInValidator(router.query.code);
        }
        else if (router.query.signupPass != null)
        {
          authService().login();
        }

    }, [router.isReady]);

  return (
    <div>
      Redirecting...
    </div>
  )
};