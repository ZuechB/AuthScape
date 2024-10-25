import React, {useState, useRef, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import Head from "next/head";
import { useSearchParams, usePathname } from 'next/navigation';
import axios from 'axios';
import querystring from "query-string";
// import Cookies from 'js-cookie';
import Router from 'next/router';
import GA4React from 'ga-4-react';
import { create } from 'zustand'
import { clarity } from 'react-microsoft-clarity';

// comment this out
// import { authService, apiService, setupOEMProps, OEMStyleSheet } from 'authscape';

export function AuthScapeApp ({Component, layout, loadingLayout, pageProps, muiTheme = {}, store={}, enforceLoggedIn = false, enableAuth = true}) {

    const [frontEndLoadedState, setFrontEndLoadedState] = useState(false);

    const [isLoadingShow, setIsLoadingShow] = useState(false);

    const [signedInUserState, setSignedInUserState] = useState(null);

    const loadingAuth = useRef(false);
    const frontEndLoaded = useRef(false);
    const signedInUser = useRef(null);
    const queryCodeUsed = useRef(null);

    const ga4React = useRef(null);

    const searchParams = useSearchParams();
    const queryRef = searchParams.get('ref');
    const queryCode = searchParams.get('code');

    const pathname = usePathname();

    const signInValidator = async (queryCode) => {
 
        if (queryCodeUsed.current != queryCode)
        {
            queryCodeUsed.current = queryCode;
        }
        else
        {
            return;
        }

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
      
              try
              {
                let response = await axios.post(process.env.authorityUri + '/connect/token', queryString, {
                    headers: headers
                });
        
                let domainHost = window.location.hostname.split('.').slice(-2).join('.');
                window.localStorage.removeItem("verifier");
        
                await setCookie('access_token', response.data.access_token, {
                    maxAge: 60 * 60 * 24 * 365, // 1 year,
                    path: '/',
                    domain: domainHost,
                    secure: true
                });

                await setCookie('expires_in', response.data.expires_in, {
                    maxAge: 60 * 60 * 24 * 365, // 1 year,
                    path: '/',
                    domain: domainHost,
                    secure: true
                });

                await setCookie('refresh_token', response.data.refresh_token, {
                    maxAge: 60 * 60 * 24 * 365, // 1 year,
                    path: '/',
                    domain: domainHost,
                    secure: true
                });

                // await setCookie(null, "access_token", response.data.access_token,
                // {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost,
                //     secure: true
                // });
            
                // await setCookie(null, "expires_in", response.data.expires_in,
                // {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost,
                //     secure: true
                // });
            
                // await setCookie(null, "refresh_token", response.data.refresh_token,
                // {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost,
                //     secure: true
                // });
        
        
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
            catch(exp)
            {
                //alert(exp)
            }
        }
    }

    async function initGA(G) {
        if (!GA4React.isInitialized() && G && process.browser) {
          ga4React.current = new GA4React(G, { debug_mode: !process.env.production });
      
          try {

            await ga4React.current.initialize();

        } catch (error) {
            console.error(error);
          }
        }
    }

    const logEvent = (category, action, label) => {
  
        if (ga4React != null && ga4React.current != null && ga4React != "")
        {
            ga4React.current.event(action, label, category);
        }

        if (process.env.enableDatabaseAnalytics == "true")
        {
            let userId = null;
            let locationId = null;
            let companyId = null;

            var host = window.location.protocol + "//" + window.location.host;

            if (signedInUser.current != null)
            {
                userId = signedInUser.current.id;
                locationId = signedInUser.current.locationId;
                companyId = signedInUser.current.companyId;
            }

            apiService().post("/Analytics/Event", {
                userId: userId,
                locationId: locationId,
                companyId: companyId,
                uri: window.location.pathname,
                category: category,
                action: action,
                label: label,
                host: host
            });
        }
    }

    const databaseDrivenPageView = (pathName) => {

        if (process.env.enableDatabaseAnalytics == "true")
        {
            let userId = null;
            let locationId = null;
            let companyId = null;

            var host = window.location.protocol + "//" + window.location.host;

            if (signedInUser.current != null)
            {
                userId = signedInUser.current.id;
                locationId = signedInUser.current.locationId;
                companyId = signedInUser.current.companyId;
            }

            if (pathName == "/signin-oidc")
            {
                return;
            }

            apiService().post("/Analytics/PageView", {
                userId: userId,
                locationId: locationId,
                companyId: companyId,
                uri: pathName,
                host: host
            });

        }
    }

    useEffect(() => {

        if (frontEndLoadedState)
        {
            if (process.env.googleAnalytics4 != "")
            {
                initGA(process.env.googleAnalytics4);
            }

            if (process.env.microsoftClarityTrackingCode != "")
            {
                clarity.init(process.env.microsoftClarityTrackingCode);

                if (signedInUser.current != null && clarity.hasStarted())
                {
                    clarity.identify('USER_ID', { userProperty: signedInUser.current.id.toString() });
                }
            }

            databaseDrivenPageView(window.location.pathname);
            Router.events.on('routeChangeComplete', () => {

                if (ga4React != null && ga4React != "")
                {
                    try
                    {
                        ga4React.current.pageview(window.location.pathname);
                    }
                    catch(exp) {}
                }

                databaseDrivenPageView(window.location.pathname);
            });
        }

    }, [frontEndLoadedState]);

    const validateUserSignedIn = async () => {

        loadingAuth.current = true;

        if (enableAuth)
        {
          let usr = await apiService().GetCurrentUser();
          if (usr != null)
          {
            signedInUser.current = usr;
          }
        }

        setFrontEndLoadedState(true);
        frontEndLoaded.current = true;
        setSignedInUserState(signedInUser.current);
    }

    if (queryCode != null)
    {
        signInValidator(queryCode);
    }
    else
    {
        if (!loadingAuth.current)
        {
            validateUserSignedIn();
        }
    }

    useEffect(() => {

        if (signedInUserState == null && enforceLoggedIn && pathname != "/signin-oidc" && frontEndLoadedState == true)
        {
            authService().login();
        }

    }, [signedInUserState, enforceLoggedIn, frontEndLoadedState]);


    const setIsLoading = (isLoading) => {
        setIsLoadingShow(isLoading);
    }

    const logPurchase = (transactionId, amount, tax, items) => {
        
        if (ga4React != null && ga4React != "")
        {
            ga4React.current.gtag("event", "purchase", {
                transaction_id: transactionId,
                value: amount,
                tax: tax,
                currency: "USD",
                items: items
            });
        }
    }

    const setToastMessage = (message, options = null) => {
         
        if (options != null)
        {
            toast(message, options);
        }
        else
        {
            toast(message);
        }
    }

    const setInfoToastMessage = (message, options = null) => {
        if (options != null)
        {
            toast.info(message, options);
        }
        else
        {
            toast.info(message);
        }
    }

    const setSuccessToastMessage = (message, options = null) => {
        if (options != null)
        {
            toast.success(message, options);
        }
        else
        {
            toast.success(message);
        }
    }

    const setWarnToastMessage = (message, options = null) => {
        if (options != null)
        {
            toast.warn(message, options);
        }
        else
        {
            toast.warn(message);
        }
    }

    const setErrorToastMessage = (message, options = null) => {
        if (options != null)
        {
            toast.error(message, options);
        }
        else
        {
            toast.error(message);
        }
    }
    

    const GetSignedInUser = () => {

        if (signedInUser != null)
        {
            let _signedInUser = signedInUser.current;

            if (_signedInUser != null)
            {
                _signedInUser.hasRole = function(name) {

                    if (_signedInUser.roles != null)
                    {
                        if (_signedInUser.roles.find(r => r.name === name) != null)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                };

                _signedInUser.hasRoleId = function(id) {

                    if (_signedInUser.roles != null)
                    {
                        if (_signedInUser.roles.find(r => r.id === id) != null)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                };

                _signedInUser.hasPermission = function(name) {

                    if (_signedInUser.permissions != null)
                    {
                        if (_signedInUser.permissions.find(r => r === name) != null)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                };
            }

            return _signedInUser;
        }
        else
        {
            return null;
        }
    }


    const useStore = create((set) => (store));

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"></meta>

                {(pageProps != null && pageProps.oemCompanyId != null) ?
                    <>
                        <link
                            href={process.env.apiUri + "/api/PrivateLabel/GetDataFromRecord?oemCompanyId=" + pageProps.oemCompanyId}
                            rel="stylesheet"
                        />
                        <link rel="icon" href="/favicon.ico" />
                    </>
                :
                <>
                    <link rel="icon" href="/favicon.ico" />
                </>
                }

            </Head>

            <ThemeProvider theme={muiTheme}>
                {frontEndLoadedState != null && frontEndLoadedState && pathname != "/signin-oidc" &&
                <>
                    {layout != null && layout({
                        children: <Component {...pageProps} currentUser={GetSignedInUser()} loadedUser={frontEndLoadedState} setIsLoading={setIsLoading} logEvent={logEvent} logPurchase={logPurchase} store={useStore} setToastMessage={setToastMessage} setInfoToastMessage={setInfoToastMessage} setSuccessToastMessage={setSuccessToastMessage} setWarnToastMessage={setWarnToastMessage} setErrorToastMessage={setErrorToastMessage} />,
                        currentUser: GetSignedInUser(),
                        logEvent: logEvent,
                        setIsLoading: setIsLoading,
                        toast: toast,
                        store: useStore,
                        setToastMessage: setToastMessage,
                        pageProps: pageProps,
                        setInfoToastMessage: setInfoToastMessage,
                        setSuccessToastMessage: setSuccessToastMessage, 
                        setWarnToastMessage: setWarnToastMessage, 
                        setErrorToastMessage: setErrorToastMessage
                    })}

                    {layout == null &&
                        <Component {...pageProps} currentUser={GetSignedInUser()} loadedUser={frontEndLoadedState} setIsLoading={setIsLoading} logEvent={logEvent} logPurchase={logPurchase} store={useStore} setToastMessage={setToastMessage} setInfoToastMessage={setInfoToastMessage} setSuccessToastMessage={setSuccessToastMessage} setWarnToastMessage={setWarnToastMessage} setErrorToastMessage={setErrorToastMessage} />   
                    }
                </>
                }
                <ToastContainer />

            </ThemeProvider>

            {loadingLayout &&
            <>
                {loadingLayout(isLoadingShow)}
            </>
            }
        </>
    )
}