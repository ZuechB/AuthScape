import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';

export default function Mail() {

    const msalConfig = {
        auth: {
            clientId: "clientId",
            authority: "https://login.microsoftonline.com/" + "tenantId",
            redirectUri: "http://localhost:3000",
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false,
        }
    };
    
    const loginRequest = {
        scopes: ["User.Read", "Mail.Read"]
    };

    const IntegrateButton = () => {
        const { instance, accounts } = useMsal();
        const [emails, setEmails] = useState([]);

        const [authToken, setAuthToken] = useState(null);
    
        const handleIntegrate = () => {
            if (accounts.length > 0) {
                const request = {
                    ...loginRequest,
                    account: accounts[0]
                };
    
                instance.acquireTokenSilent(request).then(response => {

                    setAuthToken(response);



                    fetch('https://graph.microsoft.com/v1.0/me/messages', {
                        headers: {
                            Authorization: `Bearer ${response.accessToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => setEmails(data.value))
                    .catch(error => console.error(error));
                }).catch(error => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenPopup(request).then(response => {
                            fetch('https://graph.microsoft.com/v1.0/me/messages', {
                                headers: {
                                    Authorization: `Bearer ${response.accessToken}`
                                }
                            })
                            .then(response => response.json())
                            .then(data => setEmails(data.value))
                            .catch(error => console.error(error));
                        });
                    }
                });
            } else {
                instance.loginPopup(loginRequest).catch(e => {
                    console.error(e);
                });
            }
        };
    
        return (
            <div>
                <button onClick={handleIntegrate}>Integrate</button>
                {/* {JSON.stringify(authToken)} */}
                <ul>
                    {emails.map((email) => (
                         <li key={email.id}>
                            <strong>Subject:</strong> {email.subject}<br />
                            <strong>From:</strong> {email.from.emailAddress.name} ({email.from.emailAddress.address})<br />
                            <strong>Received:</strong> {new Date(email.receivedDateTime).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    
    const msalInstance = new PublicClientApplication(msalConfig);

    return (<div>
        <MsalProvider instance={msalInstance}>
            <IntegrateButton />
        </MsalProvider>
    </div>);
}