import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export function AutoSaveTextField ({label = "", value = null, variant = "outlined", timeout = 2000, isMultiLine = false, rows = 1, fullWidth = false, onChanged = null}) {
  const [text, setText] = useState(value);
  const [isComponentMounted, setComponentMounted] = useState(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  useEffect(() => {
    // Set the componentMounted flag to true after the initial render
    if (!isComponentMounted)
    {
        setComponentMounted(true);
    }
  }, []);

  useEffect(() => {

    if (isComponentMounted && text != null)
    {
        if (isFirstLoaded)
        {
            // Simulate saving text to a server or any storage mechanism
            // In a real-world scenario, you would send a request to a server to save the text
            // For this example, we'll just update the savedText state after 2 seconds
            const saveTimeout = setTimeout(() => {
            if (onChanged != null)
            {
                onChanged(text);
            }
            }, timeout);

            // Clean up the timeout to avoid unnecessary saves if the text changes again
            return () => clearTimeout(saveTimeout);
        }

        setIsFirstLoaded(true);
    }
  }, [text, isComponentMounted]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  return (
    <TextField
        label={label}
        fullWidth={fullWidth}
        autoComplete='off'
        variant={variant}
        multiline={isMultiLine}
        rows={rows}
        value={text}
        onChange={handleTextChange}
    />
  );
};
