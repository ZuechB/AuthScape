import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RichTextEditor } from 'authscape';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function SpreadSheetRichTextEditor({isOpen, content = null, onCancelEditor = null, onUpdate = null}) {

    return (
        <Dialog
            open={isOpen}
            maxWidth={"md"}
            onMouseDown={e => e.stopPropagation()}
            fullWidth={true}
            onClose={() => {
                if (onCancelEditor != null)
                {
                  onCancelEditor();
                }
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            {"Edit your content"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => {
                if (onCancelEditor != null)
                {
                  onCancelEditor();
                }
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>


            <DialogContent>
              <DialogContentText id="alert-dialog-description">

                <RichTextEditor html={content} onSave={(html) => {
                  onUpdate(html);
                }}/>

              </DialogContentText>
            </DialogContent>
            {/* <DialogActions>

              <Box>
                <Button onClick={() => {
                    if (onCancelEditor != null)
                    {
                      onCancelEditor();
                    }
                }}>Cancel</Button>
                <Button  onClick={() => {

                  if (onUpdate != null)
                  {
                    onUpdate();  
                  }

                }} autoFocus>
                    Update
                </Button>
              </Box>
            
            </DialogActions> */}
        </Dialog>
    )

}