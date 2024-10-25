import React, {useState, useRef} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
// import { apiService } from 'authscape';

export function NewMappingColumn({name, companyId, documentType, documentId, documentMappingId, onResponse}) {

    const newColumnNameRef = useRef(null);
    const newColumnDescriptionRef = useRef(null);

    const [createNewOpen, setCreateNewOpen] = useState(false);
    const [selectedAttributeId, setSelectedAttributeId] = useState(null);

    const handleClose = () => {
        setCreateNewOpen(false);
    }

    const AttributeTypeComponent = ({id, icon, text}) => {

        return (
            <Grid item xs={3}>
                <Card sx={{textAlign:"center", cursor:"pointer", backgroundColor: (selectedAttributeId == id ? "#e5e5e5": "none")}} onClick={() => {
                    setSelectedAttributeId(id);
                }}>
                    <CardContent>
                        {icon}
                        <Typography variant="body2" color="text.secondary" sx={{paddingTop:1}}>
                            {text}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
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
                {"Match to new column"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    inform the user about adding a new columna and what that means here...
                </DialogContentText>
                <Box sx={{paddingTop:2}}>
                    <TextField inputRef={newColumnNameRef} defaultValue={name} id="outlined-basic" label="Name" variant="outlined" fullWidth={true} />
                </Box>
                <Box sx={{paddingTop:2}}>
                    <TextField inputRef={newColumnDescriptionRef} id="outlined-basic" label="Description (optional)" variant="outlined" fullWidth={true} />
                </Box>
                <Box sx={{paddingTop:2}}>
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Select how this column will be formatted
                        </Typography>
                    </Box>
                    <Grid container spacing={2} sx={{paddingTop:2}}>

                        <AttributeTypeComponent id={0} icon={<TextFieldsRoundedIcon />} text={"text"} />
                        <AttributeTypeComponent id={1} icon={<LocalParkingRoundedIcon/>} text={"Paragraph"} />
                        <AttributeTypeComponent id={2} icon={<IntegrationInstructionsRoundedIcon/>} text={"HTML"} />
                        <AttributeTypeComponent id={3} icon={<Box>{123}</Box>} text={"Integer"} />
                        <AttributeTypeComponent id={4} icon={<Box>{10.23}</Box>} text={"Decimal"} />
                        <AttributeTypeComponent id={5} icon={<ListAltRoundedIcon/>} text={"Dropdown"} />
                        <AttributeTypeComponent id={6} icon={<CalendarMonthRoundedIcon/>} text={"Date"} />
                        <AttributeTypeComponent id={7} icon={<LinkRoundedIcon/>} text={"URL"} />
                        <AttributeTypeComponent id={8} icon={<CheckBoxRoundedIcon/>} text={"Boolean"} />
                        <AttributeTypeComponent id={9} icon={<InsertPhotoRoundedIcon/>} text={"Photo"} />

                    </Grid>

                </Box>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={async () => {

                    let response = await apiService().post("/DocumentMapping/AddNewColumnAndMapping", {
                        companyId: companyId,
                        documentId: documentId,
                        documentMappingId: documentMappingId,
                        newColumn: newColumnNameRef.current.value,
                        description: newColumnDescriptionRef.current.value,
                        attributeFieldType: selectedAttributeId 
                    });

                    if (response != null && response.status == 200)
                    {
                        handleClose();
                        onResponse();
                    }

                }} autoFocus>
                    Create
                </Button>
                </DialogActions>
            </Dialog>

            {documentType != null && documentType == 1 &&
                <Button startIcon={<AddRoundedIcon />} size="small" sx={{paddingLeft:3}} onClick={() => {
                    setCreateNewOpen(true);
                }}>Create New Column</Button>
            }
        </Box>
    );
}