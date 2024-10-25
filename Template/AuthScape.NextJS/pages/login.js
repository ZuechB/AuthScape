import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authService } from 'authscape';

export default function Login({dnsRecord}) {

    const router = useRouter();
    
    useEffect(() => {

        const redirectPage = async () => {
            if(!router.isReady) return;
            await authService().login(router.query.redirecturl, dnsRecord, router.query.deviceId);
        }
        redirectPage();

    }, [router.isReady]);


    return (
        <>           
            <div>
            </div>
        </>
    )
}