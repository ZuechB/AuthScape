import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import { PrivateLabelEditor } from 'authscape';

export default function Home({loadedUser, setIsLoading, currentUser, toast}) {

    return (
    <div>
        <Head>
            <title>OEM</title>
            <meta name="description" content="AuthScape OEM" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box sx={{width: '100%' }}>
            <Box>
                <PrivateLabelEditor azureWebsite={"indealspaces.azurewebsites.net"} azureTxtValue={"3C6463B49E18993E32249450799B7A1F04A9BC60DB6AD1BFBCC6429AC7F074F3"} loadedUser={loadedUser} showAllDomains={true} toast={toast} notification={() => {
                }} />
            </Box>
        </Box>
    </div>
    )
}