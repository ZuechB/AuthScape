import React from 'react';
import { destroyCookie } from 'nookies';

export const authService = () => {

    return {

        dec2hex: (dec) => {
            return ('0' + dec.toString(16)).substr(-2)
        },
        generateRandomString: () => {
            var array = new Uint32Array(56/2);
            window.crypto.getRandomValues(array);
            return Array.from(array, authService().dec2hex).join('');
        },
        sha256: (plain) => {
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest('SHA-256', data);
        },
        base64urlencode: (a) => {
            var str = "";
            var bytes = new Uint8Array(a);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
            }
            return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        },
        challenge_from_verifier: async (v) => {
            let hashed = await authService().sha256(v);
            let base64encoded = authService().base64urlencode(hashed);
            return base64encoded;
        },
        login: async (redirectUserUri = null, dnsRecord = null, deviceId = null) => {

            let state = "1234";
            if (redirectUserUri != null)
            {
                localStorage.setItem("redirectUri", redirectUserUri);
            }

            let verifier = authService().generateRandomString();
            var challenge = await authService().challenge_from_verifier(verifier);

            window.localStorage.setItem("verifier", verifier);

            let redirectUri = window.location.origin + "/signin-oidc";
            let loginUri = process.env.AUTHORITYURI + "/connect/authorize?response_type=code&state=" + state + "&client_id=" + process.env.client_id + "&scope=email%20openid%20offline_access%20profile%20api1&redirect_uri=" + redirectUri + "&code_challenge=" + challenge + "&code_challenge_method=S256";
            
            if (deviceId)
            {
                loginUri += "&deviceId=" + deviceId; // will be for chrome extention and mobile apps later
            }
            
            window.location.href = loginUri;
        },
        signUp: (redirectUrl = null) => {

            let AuthUri = process.env.AUTHORITYURI;

            let url = "";
            if (redirectUrl == null)
            {
                url = AuthUri + "/Account/Register?returnUrl=" + window.location.href;
                localStorage.setItem("redirectUri", window.location.href);
            }
            else
            {
                url = AuthUri + "/Account/Register?returnUrl=" + redirectUrl;
                localStorage.setItem("redirectUri", redirectUrl);
            }

            window.location.href = url;
        },
        logout: async () => {

            let AuthUri = process.env.AUTHORITYURI;
            let cookieDomain = process.env.cookieDomain;

            destroyCookie({}, "access_token", {
                maxAge: 2147483647,
                path: '/',
                domain: cookieDomain
            });

            destroyCookie({}, "refresh_token", {
                maxAge: 2147483647,
                path: '/',
                domain: cookieDomain
            });

            destroyCookie({}, "expires_in", {
                maxAge: 2147483647,
                path: '/',
                domain: cookieDomain
            });

            setTimeout(() => {
                window.location.href = AuthUri + "/connect/logout?redirect=" + window.location.href;
            }, 500);

        },
    }
}