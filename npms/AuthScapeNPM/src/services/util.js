import React, { useState, useRef, useEffect } from "react";

export const GetBaseUrl = () => {
    return window.location.protocol + "//" + window.location.host;
}

export const setCookie = (name, value, options = {}) => {
    return new Promise((resolve) => {
        let cookieString = `${name}=${value};`;

        if (options.maxAge) {
            cookieString += `max-age=${options.maxAge};`;
        }
        if (options.path) {
            cookieString += `path=${options.path};`;
        }
        if (options.domain) {
            cookieString += `domain=${options.domain};`;
        }
        if (options.secure) {
            cookieString += `secure;`;
        }

        document.cookie = cookieString;
        resolve();
    });
}
