import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Bounce } from 'react-toastify';

export default function Home({currentUser, setToastMessage}) {

  return (
    <Box sx={{paddingTop:8}}>
        <Typography variant="h3" gutterBottom>
            Toast Playground
        </Typography>
        
        <Box sx={{marginTop:4}}>
            <Button variant="contained" sx={{marginRight:2}} onClick={() => {

                setToastMessage("Hello World");

            }}>Simple Toast</Button>

            <Button variant="contained" onClick={() => {

                setToastMessage("Hello World", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });

            }}>Toast with Options</Button>
        </Box>
    </Box>
  )
}
