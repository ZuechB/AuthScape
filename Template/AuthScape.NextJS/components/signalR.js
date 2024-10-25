import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const SignalR = (hubUrl = null, onReceive) => {
    const [connection, setConnection] = useState(null);
  
    useEffect(() => {

        if (hubUrl == null)
        {
            return;
        }

        // Create a new SignalR connection
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();
    
        // Set up event listeners
        newConnection.on('ReceiveMessage', onReceive);
    
        // Start the connection
        newConnection
            .start()
            .then(() => {
                console.log('SignalR connected');
            })
            .catch((error) => {
                console.error('Error connecting to SignalR:', error);
            });
    
        // Set the connection in the state
        setConnection(newConnection);
    
        // Clean up the connection when the component unmounts
        return () => {
            if (newConnection) {
            newConnection.stop();
            }
        };
    }, [hubUrl]);
  
    return connection;
  };