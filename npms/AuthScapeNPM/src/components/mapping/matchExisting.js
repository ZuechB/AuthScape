import React, {useEffect, useState, useRef} from 'react';
// import {apiService, authService, StripeConnect, ReactDraft, EditableDatagrid, FileUploader} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export function MatchExistingMappedColumn({companyId, documentId, documentMappingId, fromName, toOptions, onResponse}) {

    const [createNewOpen, setCreateNewOpen] = useState(false);

    const [onlyAddRowIfFound, setOnlyAddRowIfFound] = useState(false);
    const [rememberForNextTime, setRememberForNextTime] = useState(true);
    
    const [selectedToColumn, setSelectedToColumn] = useState(null);

    const handleClose = () => {
        setCreateNewOpen(false);
    }

    const checkboxRememberLabel = { inputProps: { 'aria-label': 'Checkbox Remember' } };

    const SelectedExistingColumns = ({toOptions}) => {

        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Match to column</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedToColumn}
                    label="Age"
                    onChange={(event) => {
                        setSelectedToColumn(event.target.value);
                    }}>
                        {toOptions != null && toOptions.map((toOption) => {

                            let isRequiredMessage = "";
                            if (toOption.isRequired)
                            {
                                isRequiredMessage = " (Required)";
                            }

                            return (
                                <MenuItem value={toOption.name}>{toOption.visibleName} {isRequiredMessage}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
        )
    }
    

    return (
        <Box>
            <Dialog
                open={createNewOpen}
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                {"Match existing column"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ***Inform the user about what it means to match existing columns***
                </DialogContentText>
                <Box sx={{paddingTop:2}}>
                    <TextField id="outlined-basic" label="File Column Name" defaultValue={fromName} variant="outlined" disabled={true} fullWidth={true} />
                </Box>
                <Box sx={{paddingTop:2}}>
                    <SelectedExistingColumns toOptions={toOptions} />
                </Box>

                <Box sx={{paddingTop:2}}>

                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox {...checkboxRememberLabel} defaultChecked onChange={(event) => {
                                setRememberForNextTime(event.target.checked);
                            }} />
                        }
                        label="Remember match for next time"
                        labelPlacement="end"
                    />
                    
                </Box>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={async () => {

                    let response = await apiService().put("/DocumentMapping/AssignMapping", {
                        companyId: companyId,
                        documentId: documentId,
                        fileColumnName: fromName,
                        documentMappingId: documentMappingId,
                        matchedColumn: selectedToColumn,
                        onlyAddRowIfColumnFound: onlyAddRowIfFound,
                        rememberForNextTime: rememberForNextTime
                    });

                    if (response != null && response.status == 200)
                    {
                        onResponse();
                        handleClose();
                    }

                }} autoFocus>
                    Match Existing
                </Button>
                </DialogActions>
            </Dialog>
            <Button startIcon={<LinkRoundedIcon />} size="small" sx={{paddingLeft:3}} onClick={() => {
                setCreateNewOpen(true);
            }}>Match Existing</Button>
        </Box>
    );
}