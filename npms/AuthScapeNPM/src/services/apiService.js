import axios from 'axios'
import querystring from 'query-string';
import fileDownload from 'js-file-download';
import Cookies from 'js-cookie';

const setupDefaultOptions = async (ctx = null) => {

    let defaultOptions = {};
    if (ctx == null)
    {
        let accessToken = Cookies.get('access_token') || '';

        if (accessToken !== null && accessToken !== undefined && accessToken != "") {
            defaultOptions = {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            };
        }
        else {
            defaultOptions = {
                headers: {
                },
            };
        }
    }
    else
    {
        defaultOptions = {
            headers: {
            },
        };
    }

    return defaultOptions;
}

const RefreshToken = async (originalRequest, instance) => {

    let accessToken = Cookies.get('access_token') || '';
    let refreshToken = Cookies.get('refresh_token') || '';

    let response = await instance.post(process.env.authorityUri + "/connect/token",
        querystring.stringify({
            grant_type: 'refresh_token',
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            refresh_token: refreshToken
        }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + accessToken
        }
    });

    if (response != null && response.status == 200)
    {
        let domainHost = window.location.hostname.split('.').slice(-2).join('.');
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;





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
    }
}

export const apiService = (ctx = null) => {

    let env = process.env.stage;
    if (env == "development")
    {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    let baseUri = process.env.apiUri + "/api";

    const instance = axios.create({
        baseURL: baseUri,
        //timeout: 10000,
        params: {} // do not remove this, its added to add params later in the config
    });

    instance.interceptors.response.use(
        (response) => {
        
        return response;
        },
        async (error) => {
            const originalConfig = error.config;
            if (error.response) {

                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    // Do something, call refreshToken() request for example;
                    await RefreshToken(originalConfig, instance);

                    // return a request
                    return instance.request(originalConfig);
                }

                if (error.response.status === 400) {
                    // Do something 

                    if (error.response.config.url.includes("/connect/token")) // remove the access and refresh if invalid
                    {
                        let domainHost = window.location.hostname.split('.').slice(-2).join('.');


                        Cookies.remove('access_token', { path: '/', domain: domainHost });
                        Cookies.remove('refresh_token', { path: '/', domain: domainHost });
                        Cookies.remove('expires_in', { path: '/', domain: domainHost });

                        // destroyCookie(null, "access_token", {
                        //     maxAge: 2147483647,
                        //     path: '/',
                        //     domain: domainHost
                        // });

                        // destroyCookie(null, "refresh_token", {
                        //     maxAge: 2147483647,
                        //     path: '/',
                        //     domain: domainHost
                        // });

                        // destroyCookie(null, "expires_in", {
                        //     maxAge: 2147483647,
                        //     path: '/',
                        //     domain: domainHost
                        // });
                    }

                    return Promise.reject(error);
                }
            }
        
            return Promise.reject(error);
        }
    );

    return {

        get: async (url, options= {}) => {
            
            try
            {
                let defaultOptions = await setupDefaultOptions(ctx);
                return await instance.get(url, { ...defaultOptions, ...options });
            }
            catch(error)
            {
                return error.response;
            }
        },
        post: async (url, data, options = {}) => {

            try
            {
                let defaultOptions = await setupDefaultOptions(ctx);
                return await instance.post(url, data, { ...defaultOptions, ...options });
            }
            catch(error)
            {
                return error.response;
            }
        },
        put: async (url, data, options = {}) => {

            try
            {
                let defaultOptions = await setupDefaultOptions(ctx);
                return await instance.put(url, data, { ...defaultOptions, ...options });
            }
            catch(error)
            {
                return error.response;
            }
        },
        delete: async (url, options = {}) => {

            try
            {
                let defaultOptions = await setupDefaultOptions(ctx);
                return await instance.delete(url, { ...defaultOptions, ...options });
            }
            catch(error)
            {
                return error.response;
            }
        },
        GetCurrentUser: async () => {

            try
            {
                let accessToken = Cookies.get('access_token') || null;

                if (accessToken)
                {
                    let defaultOptions = await setupDefaultOptions(null);
                    const response = await instance.get('/UserManagement', defaultOptions);
                    if (response != null && response.status == 200)
                    {
                        return response.data;
                    }
                    // else if (response != null && response.status == 401)
                    // {
                    //     // call the login window maybe?
                    // }
                }

            } catch(exp) {
                //return -1;
                console.log(exp.message);
            }
            return null;    
        },
        DownloadFile : async (url, fileName, completed, method = "get", data = {}, mimeType = "application/octet-stream", passData = false) => {

            try
            {
                //let defaultOptions = await setupDefaultOptions();
                let defaultOptions = {};
                let options = { responseType: "blob" };

                let response = null;
                if (method == "get")
                {
                    response = await instance.get(url, { ...defaultOptions, ...options });
                }
                else if (method == "post")
                {
                    response = await instance.post(url, data, { ...defaultOptions, ...options });
                }
                
                if (response != null && response.status === 200) {

                    if (!passData)
                    {
                        fileDownload(response.data, fileName, mimeType);
                        if (completed !== undefined) {
                            completed();
                        }
                    }
                    else
                    {
                        completed(response.data);
                    }
                }
            }
            catch(error)
            {
                console.error(error);
                if (completed !== undefined) {
                    completed();
                }
            }

        }
    }
}