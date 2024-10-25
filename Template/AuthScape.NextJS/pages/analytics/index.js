import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {apiService} from 'authscape';
import {Stack, Button, Box} from '@mui/material';
import axios from "axios";
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

// const getIPAddress = async () => {

//   let res = await axios.get("https://api.ipify.org/?format=json");
//   let ipAddress = "";
//   if (res && res.status == 200) {
//     ipAddress = res.data.ip;
//   }
  
//   return ipAddress;
// }

// const startSession = async () => {

//   let ipAddress = await getIPAddress();
//   let device = "";

//   if (isMobile) {
//     device = "mobile";
//   } else if (isTablet) {
//     device = "tablet";
//   } else if (isBrowser) {
//     device = "desktop";
//   }

//   let session = await apiService().post("/Analytics/StartSession", {
//       userId: user ? user.id : null,
//       locationId: user ? user.locationId : null,
//       companyId: user ? user.companyId : null,
//       ipAddress,
//       device, 
//       userAgent: window.navigator.userAgent
//   });

//   if (session && session.status == 200) {
//     localStorage.setItem("SessionId", session.data.id);
//     localStorage.setItem("SessionIpAddress", session.data.ipAddress);
//   }

// }

// const getSession = async () => {
//   let sessionId = localStorage.getItem("SessionId");
//   let sessionIpAddress = localStorage.getItem("SessionIpAddress");

//   if (!sessionId) 
//   {
//     sessionId = await startSession();
//   }

//   return {
//     id: sessionId,
//     ipAddress: sessionIpAddress
//   };
// }

// export function logEvent(category, action, label, user) {
//   const trackEvent = async () => {
//     try {
  
//       let session = await getSession();
  
//       await apiService().post("/Analytics/Event", {
//           Category: category,
//           Action:  action,
//           label: label,
//           host: window.location.host,
//           sessionId: session.id,
//           userId: user ? user.id : null,
//           locationId: user ? user.locationId : null,
//           companyId: user ? user.companyId : null,
//           uri: window.location.pathname + window.location.search
//       });
//     }
//     catch(e) { }
//   }

//   trackEvent();
// }

// export function logPageView(uri, user) {

//   const trackPageView = async (uri, user) => {
//     try {

//       let session = await getSession();

//       let res = await apiService().post("/Analytics/PageView", {
//           userId: user ? user.id : null,
//           locationId: user ? user.locationId : null,
//           companyId: user ? user.companyId : null,
//           sessionId: session.id,
//           uri,
//           host: window.location.host,
//           referrer: document.referrer
//       });

//     }
//     catch(e) { }
//   }

//   trackPageView();
// }

// export function logConversion(category, value, user) {
//   const trackConversion = async () => {
//     try {
  
//       let session = await getSession();
  
//       await apiService().post("/Analytics/Conversion", {
//           category,
//           value,
//           userId: user ? user.id : null,
//           locationId: user ? user.locationId : null,
//           companyId: user ? user.companyId : null,
//           sessionId: session.id
//       });
//     }
//     catch(e) { }
//   }

//   trackConversion();
  
// }

export default function Index({logEvent, logPurchase}) {

    return (
        <Box>
          <Head>
            <title>AuthScape | Analytics</title>
          </Head>
          <Stack spacing={2} direction={"row"}>

            <Button variant="outlined" onClick={() => {

              logEvent("My Category", "My Action", "My Optional Label");
            
            }}>Fire Event</Button>

            <Button variant="outlined" onClick={() => {
  
  
              let items = [];

              items.push({
                item_id: "SKU1234",
                item_name: "ProductName",
                price: 5.99,
                quantity: 3

              });

              logPurchase("123", 45.95, 10.12, items);
            
            }}>Log Purchase</Button>


            {/* <Button variant="outlined" onClick={onClickPrimary}>Test Button</Button>
            <Button variant="outlined" onClick={onClickGoToPage}>Go To Main Page</Button> */}
          </Stack> 
    
        </Box>
      )
}

