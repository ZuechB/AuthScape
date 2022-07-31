import React, { useEffect, useState } from 'react';
import axios from 'axios';
import querystring from "query-string";
import { setCookie } from 'nookies';

export const signInValidator = async (queryCode) => {
 
  let codeVerifier = window.localStorage.getItem("verifier");
      if (queryCode != null && codeVerifier != null)
      {
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'}

        let queryString = querystring.stringify({
          code: queryCode,
          grant_type: "authorization_code",
          redirect_uri: window.location.origin + "/signin-oidc",
          client_id: process.env.client_id,
          client_secret: process.env.client_secret,
          code_verifier: codeVerifier
        });

        let response = await axios.post(process.env.AUTHORITYURI + '/connect/token', queryString, {
          headers: headers
        });

        window.localStorage.removeItem("verifier");

        let domain = process.env.cookieDomain;

        await setCookie(null, "access_token", response.data.access_token,
        {
            maxAge: 2147483647,
            path: '/',
            domain: domain,
            secure: true
        });
    
        await setCookie(null, "expires_in", response.data.expires_in,
        {
            maxAge: 2147483647,
            path: '/',
            domain: domain,
            secure: true
        });
    
        await setCookie(null, "refresh_token", response.data.refresh_token,
        {
            maxAge: 2147483647,
            path: '/',
            domain: domain,
            secure: true
        });


        let redirectUri = localStorage.getItem("redirectUri")
        localStorage.clear();
        if (redirectUri != null)
        {
          window.location.href = redirectUri;
        }
        else
        {
          window.location.href = "/";
        }
    }
}