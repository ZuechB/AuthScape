import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function confirmationModal({title, description, cancelClicked, okClicked, open = false, cancelTitle = "Cancel", okTitle = "OK"}) {
    return (
        <Dialog
            open={open}
            onClose={cancelClicked}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {description}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={cancelClicked}>{cancelTitle}</Button>
            <Button onClick={okClicked}>
                {okTitle}
            </Button>
            </DialogActions>
        </Dialog>
    );
}