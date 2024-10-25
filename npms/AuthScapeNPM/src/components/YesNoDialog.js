import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function YesNoDialog({open, title, message, yesText = "Yes", noText = "No", YesAction, NoAction}) {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  return (
    <Dialog
        open={open}
        onClose={NoAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={NoAction}>{noText}</Button>
            <Button onClick={YesAction} autoFocus>
            {yesText}
            </Button>
        </DialogActions>
    </Dialog>
  );
}


