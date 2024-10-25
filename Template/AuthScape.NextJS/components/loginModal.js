import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function loginModal({loadedUser, setIsLoginOpen, open = false}) {

    const handleClose = () => {
        setIsLoginOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
            <DialogTitle sx={{position:"absolute", right:0}}>
            {(
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}>
                <CloseIcon />
                </IconButton>
            )}
            </DialogTitle>
            <DialogContent sx={{padding:0}}>
                <iframe 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true}
                    src={loadedUser ? process.env.WebsiteBaseUri + "/login?redirecturl=" + window.location.href : ""}
                    height={600}
                    width={500}>
                </iframe>
            </DialogContent>
        </Dialog>
    );
}