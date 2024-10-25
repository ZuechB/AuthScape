import { width } from '@xstyled/styled-components';
import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventSource = new EventSource(`http://localhost:54218/api/OpenAITest/stream?request=${encodeURIComponent(message)}`);

        eventSource.onmessage = (event) => {

            setResponses((prevResponses) => [...prevResponses, event.data]);
        };

        eventSource.onerror = (error) => {
            console.error('Error with SSE', error);
            eventSource.close();
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    style={{width:400}}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h3>Responses:</h3>
                {responses.map((response, index) => (
                    <span key={index}>{response}</span>
                ))}
            </div>
        </div>
    );
};

export default ChatComponent;
