import React, { useEffect, useState, useRef } from 'react';

export async function PrivateLabelPageModule(apiUri, host) {

    var data = {};
    if (host.includes("localhost"))
    {
        host = "http://" + host;
    }
    else
    {
        host = "https://" + host;
    }

    const response = await fetch(apiUri + "/api/PrivateLabel/GetCompanyIdFromDomain?domain=" + host);
    if (response.status == 200)
    {
        var data = await response.json();
        if (data != null)
        {
            if (data.companyId != null)
            {
                data.oemCompanyId = data.companyId;
            }

            if (data.demoCompanyId != null)
            {
                data.demoId = data.demoCompanyId;
            }

            if (data.favIcon != null)
            {
                data.favIcon = data.favIcon;
            }

            if (data.companyName != null)
            {
                data.companyName = data.companyName;
            }
        }
    }
    
    return data;
}

export function HeaderRecords({pageProps})
{
    return (
        <>
            {(pageProps != null && pageProps.oemCompanyId != null) &&
            <>
                <link
                    href={process.env.apiUri + "/api/PrivateLabel/GetDataFromRecord?oemCompanyId=" + pageProps.oemCompanyId}
                    rel="stylesheet"
                />

                {/* <link rel="manifest" href="/manifest.json" />
                <link
                  href="/icons/favicon-16x16.png"
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                />
                <link
                  href="/icons/favicon-32x32.png"
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                /> */}
            </>
            }
        </>
    )
}