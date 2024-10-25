import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
// import { apiService } from 'authscape';
// import MappedColumn from './MappedColumn';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
// import ConditionBasedTool from './conditionBasedTool';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import SpreadsheetViewer from '../spreadsheetViewer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export function AssignMapping({currentUser, documentComponentId, setIsLoading = null, onCancel = null, onPublished = null}) {

    const [documentId, setDocumentId] = useState(documentComponentId);

    const [fromColumnOptions, setFromColumnOptions] = useState(null);
    const [toColumnOptions, setToColumnOptions] = useState(null);
    const [documentType, setDocumentType] = useState(null);
    const [documentName, setDocumentName] = useState(null);
    const [urlTick, setURLTick] = useState(1);
    const [spreadSheetAddress, setSpreadSheetAddress] = useState(null);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);

    const [advanceQuery, setAdvanceQuery] = useState(null);

    const spreadSheetRef = useRef(null);


    const fetchMappingTo = async () => {

        let response = await apiService().get("/DocumentMapping/GetMappedDynamicFieldsForCompany?companyId=" + currentUser.companyId + "&documentId=" + documentComponentId);
        if (response != null)
        {
            setToColumnOptions(response.data);
        }
    }

    const fetchMappingFrom = async () => {
        let response = await apiService().post("/DocumentMapping/GetMapping", {
            documentComponentId: documentComponentId,
            companyId: currentUser.companyId
        });
        if (response != null)
        {
            setFromColumnOptions(response.data.documentMappings);
            setDocumentName(response.data.name);
            setDocumentType(response.data.documentType);
        }
    }

    useEffect(() => {

        if (documentComponentId != null)
        {
            if (setIsLoading != null)
            {
                setIsLoading(true);
            }

            setSpreadSheetAddress("/DocumentMappingPreview/PreviewMappedData?companyId=" + currentUser.companyId + "&documentComponentId=" + documentComponentId);

            const fetchData = async () => {
                await fetchMappingFrom();
                await fetchMappingTo();


                if (setIsLoading != null)
                {
                    setIsLoading(false);
                }
            }

            fetchData();

        }

    }, [documentComponentId])

    return (
        <Box>
            <Container maxWidth="xl" sx={{marginTop:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{position:"sticky", top:20}}>
                            <Typography variant="h4" gutterBottom sx={{paddingBottom:2}}>
                                File Uploaded: <br/> {documentName}
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom sx={{paddingBottom:2}}>
                                You have {fromColumnOptions != null && fromColumnOptions.length} columns that can be created or mapped
                            </Typography>

                            <Button variant="outlined" sx={{marginRight:2}} onClick={async () => {

                                if (onCancel != null)
                                {
                                    onCancel();
                                }

                            }}>Cancel</Button>

                            <Button variant="contained" endIcon={<ArrowRightAltRoundedIcon/>} sx={{marginRight:2}} onClick={() => {

                                setShowPreviewDialog(true);

                            }}>Next, Preview your mapping</Button>

                        </Box>
                    </Grid>

                    <Grid item xs={5}>
                    {fromColumnOptions != null && fromColumnOptions.map((column) => {
                        return (
                            <Box>
                                
                                <MappedColumn companyId={currentUser.companyId} documentId={documentId} documentType={documentType} documentMappingId={column.id} name={column.name} toName={column.toName} isMapped={(column.toName == null || column.toName == "") ? true : false} toOptions={toColumnOptions} onResponse={() => {

                                    fetchMappingFrom();
                                    fetchMappingTo();

                                }} />
                            
                            </Box>
                        )
                    })}
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={showPreviewDialog}
                onClose={() => {
                    setShowPreviewDialog(false);
                }}
                fullWidth={true}
                maxWidth={"xl"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" sx={{fontSize:"25px", paddingTop:4}}>
                {"Preview your mapping"}
                </DialogTitle>

                <Box sx={{paddingLeft:3}}>
                    Ensure that the data uploaded is accurately mapped and all (Required) fields are completed.
                </Box>

                <IconButton
                    aria-label="close"
                    onClick={() => {
                        setShowPreviewDialog(false);
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>

                <DialogContent>

                    <Box sx={{paddingBottom:1}}>
                        <ConditionBasedTool toColumnOptions={toColumnOptions} documentId={documentId} onConditionApplied={(currentQuery) => {

                            let incrementNum = urlTick + 1;
                            setURLTick(incrementNum);

                            setAdvanceQuery(currentQuery);

                            // setSpreadSheetAddress("/DocumentMappingPreview/PreviewMappedData?companyId=" + currentUser.companyId + "&documentComponentId=" + documentComponentId + "&tick=" + incrementNum);

                        }} />
                    </Box>
                    
                    {spreadSheetAddress != null &&
                        <SpreadsheetViewer ref={spreadSheetRef} url={spreadSheetAddress} advanceQuery={advanceQuery} currentUser={currentUser} hideToolbar={true} loadedUser={true} />
                    }

                </DialogContent>
                <DialogActions>
                <Button onClick={() => {

                    setShowPreviewDialog(false);

                }}>Cancel</Button>
                <Button variant="contained" onClick={async () => {

                    if (setIsLoading != null)
                    {
                        setIsLoading(true);
                    }

                    let publishedRows = spreadSheetRef.current.getRows();

                    let response = await apiService().post("/DocumentMapping/Publish", {
                        companyId: currentUser.companyId,
                        documentId: documentId,
                        publishedRows: publishedRows
                    });

                    if (response != null && response.status == 200)
                    {
                        setShowPreviewDialog(false);

                        if (onPublished != null)
                        {
                            onPublished();
                        }
                    }
                    else
                    {
                        alert(JSON.stringify(response.data));
                    }

                    if (setIsLoading != null)
                    {
                        setIsLoading(false);
                    }

                }}>
                    Publish
                </Button>
                </DialogActions>
            </Dialog>


        </Box>
    )
}