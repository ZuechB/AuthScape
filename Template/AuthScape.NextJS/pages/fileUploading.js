import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dropzone } from '../components/dropzone';

export default function Home({currentUser, setToastMessage}) {

  return (
    <Box sx={{paddingTop:8}}>
        <Typography variant="h3" gutterBottom>
            Dropzone
        </Typography>
        
        <Box sx={{marginTop:4}}>
            <Dropzone />
        </Box>
    </Box>
  )
}
