import React, {useEffect, useState, useRef} from 'react';
// import {apiService, authService, StripeConnect, ReactDraft, EditableDatagrid, FileUploader} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
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
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import Grid from '@mui/material/Grid';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export function ManageMappingDocuments({fileUploadName, hideDocumentManager = false, documentTypeId = null, companyId = null, locationId = null, userId = null, onManageField = null, onArchive = null}) {

    const [document, setDocument] = useState(null);
    const [addColumnDialog, setAddColumnDialog] = useState(false);

    const [showAddNewDocument, setShowAddNewDocument] = useState(false);
    const [showTrainingDocument, setShowTrainingDocument] = useState(false);

    const [columnName, setColumnName] = useState('');
    const [selectedAddedColumn, setSelectedAddedColumn] = useState(null);

    const [documentMappingColumns, setDocumentMappingColumns] = useState(null);
    const [toColumnOptions, setToColumnOptions] = useState(null);

    const [removeDocument, setRemoveDocument] = useState(null);

    const [selectedDocumentComponentId, setSelectedDocumentComponentId] = useState(null);

    const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);
    const [dataGridMappingRefreshKey, setDataGridMappingRefreshKey] = useState(0);

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [status, setStatus] = useState(0);

    const [componentTypes, setComponentTypes] = useState([]);
    
    const refHeaderRowInput = useRef(null);
    const fileUploaderRef = useRef(null);
    const refNewDocumentName = useRef(null);
    const refSelectDocumentType = useRef(null);
    const refNewColumnFileColumn = useRef(null);

    const documentColumns = [
        { field: 'name', flex:1, headerName: 'Document Name', width: 150, editable: false },
        { field: 'documentTypeName', flex:1, headerName: 'Document Type', width: 150, editable: false },
        {
            field: "actions",
            type: "actions",
            width: 200,
            flex:1,
            headerName: "",
            cellClassName: "actions",
            getActions: ({ id, row }) => {
              return [
                <Button variant="text" startIcon={<ListRoundedIcon/>} onClick={() => {

                    if (onManageField != null)
                    {
                        onManageField(row.id);
                    }

                  }}>
                    Manage Fields
                </Button>,
                <Button variant="text" startIcon={<DownloadRoundedIcon/>} onClick={() => {

                    window.open("https://view.officeapps.live.com/op/view.aspx?src=" + row.fileUri + "&wdOrigin=BROWSELINK");

                  }}>
                    Download File
                </Button>,
                <Button variant="text" startIcon={<DeleteRoundedIcon/>} onClick={async () => {
                    
                    let documentMappingId = row.id;
                    setRemoveDocument({
                        companyId: companyId,
                        documentMappingId: documentMappingId
                    });

                  }}>
                    Remove
                </Button>
              ];
            },
          }

    ];

    useEffect(() => {

        if (document != null)
        {
            const fetchData = async () => {

                let response = await apiService().get("/DocumentMapping/GetMappingFieldsForDocument?documentId=" + document.id);
                if (response != null)
                {
                    setToColumnOptions(response.data);
                    setDocumentMappingColumns(
                        [
                            { field: 'name', flex:1, headerName: 'File Column', width: 150, editable: true },
                            {
                                field: 'toName',
                                headerName: 'Upload To',
                                flex:1,
                                width: 150,
                                editable: true,
                                type: 'singleSelect',
                                valueOptions: response.data,
                            },
                            {
                                field: "actions",
                                type: "actions",
                                width: 200,
                                headerName: "Archive Fields",
                                cellClassName: "actions",
                                getActions: ({ id, row }) => {
                                  return [
                                    <GridActionsCellItem key={id}
                                      icon={<DeleteRoundedIcon />}
                                      label="Archive"
                                      className="textPrimary"
                                      onClick={async () => {
                                        
                                        let documentMappingId = row.id;
                                        let documentComponentId = row.documentComponentId;

                                        // archive the column
                                        let response = await apiService()
                                            .delete("/DocumentMapping/RemoveColumnFromDocumentComponent?documentMappingId=" + 
                                            documentMappingId + "&documentComponentId=" + documentComponentId);

                                            if (response != null && response.status == 200)
                                            {
                                                setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);
                                            }

                                      }}
                                    />,
                                  ];
                                },
                            }
                        ]
                    );
                }

            }
            fetchData();
        }

    }, [document])

    useEffect(() => {

        if (showAddNewDocument && documentTypeId == null)
        {
            // get all document types
            const fetchData = async () => {
                let response = await apiService().post("/DocumentMapping/GetDocumentTypes");
                if (response != null && response.status == 200)
                {
                    setComponentTypes(response.data.data);
                }
            };
            fetchData();
        }

    }, [showAddNewDocument, documentTypeId])

    const GetHeaderRowData = async (documentComponentId) => {

        let response = await apiService().get("/DocumentMapping/GetHeaderRow?documentComponentId=" + documentComponentId);
        if (response != null && response.status == 200)
        {
            refHeaderRowInput.current.value = response.data;
        }
    }

    useEffect(() => {

        if (status != null)
        {
            setDataGridRefreshKey(dataGridRefreshKey + 1);
        }

    }, [status])

    return (
        <Box>
            {!hideDocumentManager &&
            <Box>

                <Grid container spacing={2} sx={{paddingBottom:2}}>
                    <Grid item xs={3}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                    }}
                                >
                                <MenuItem value={0}>Open</MenuItem>
                                <MenuItem value={2}>Published</MenuItem>
                                <MenuItem value={1}>Archived</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                
                
                        <Box sx={{textAlign:"right", marginBottom:2}}>
                            <Button variant="contained" onClick={() => {
                                setShowAddNewDocument(true);
                            }}>{fileUploadName}</Button>
                        </Box>
                    </Grid>
                </Grid>


                <EditableDatagrid key={dataGridRefreshKey} loadedUser={true} params={{
                    companyId: companyId,
                    userId: userId,
                    locationId: locationId,
                    status: status
                }} url={"/DocumentMapping/GetDocumentComponents"} columns={documentColumns}/>

            </Box>
            }

            {hideDocumentManager &&
                <Button variant="contained" onClick={() => {
                    setShowAddNewDocument(true);
                }}>{fileUploadName}</Button>
            }

            {/* <Box sx={{textAlign:"right"}}>
                <Button variant='contained' onClick={async () => {

                    let response = await apiService().post("/DocumentMapping/SubmitMappedDocument", {
                        companyId: companyId,
                        documentComponentId: selectedDocumentComponentId
                    });

                    if (response != null && (response.status == 200 || response.status == 201))
                    {
                        alert("Worked!");
                    }

                }}>Submit</Button>
            </Box> */}

            <Dialog
                open={showAddNewDocument}
                onClose={() => {
                    setShowAddNewDocument(false);
                }}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Upload Document</DialogTitle>
                <DialogContent>

                    {documentTypeId == null &&
                        <DialogContentText id="alert-dialog-description" sx={{paddingBottom:2}}>
                        Please select the type of document, then click "Choose a file"
                        </DialogContentText>
                    }

                    {documentTypeId == null &&
                        <Box sx={{marginTop:2}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Document Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        inputRef={refSelectDocumentType}
                                        onChange={(val) => {

                                            var _selectedDocument = componentTypes.find(s => s.id == val.target.value);
                                            setSelectedDocument(_selectedDocument);

                                        }}
                                        label="DocumentType">

                                        {componentTypes != null && componentTypes.map((componentType) => {
                                            return (<MenuItem value={componentType.id}>{componentType.name}</MenuItem>)
                                        })}

                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    }

                    {(selectedDocument != null || (selectedDocument == null && documentTypeId != null)) &&

                        <Box sx={{textAlign:"center", width:"100%", display:"flex", alignItems:"center", paddingTop:2}}>
                            <FileUploader refOveride={fileUploaderRef} params={{

                                documentTypeId: documentTypeId == null ? selectedDocument.id : documentTypeId,
                                companyId: companyId
                                        
                                }} url={"/DocumentMapping/SyncDocument"} multiple={true} variant='custom' onUploadCompleted={(responses) => {

                                    if (responses.length > 0)
                                    {
                                        let row = responses[0].data;
                                        
                                        if (onManageField != null)
                                        {
                                            onManageField(row.id);
                                        }
                                    }
                                    
                                    setShowAddNewDocument(false);

                                }}>
                                
                                    <Box sx={{display:"flex", alignItems:"center"}}>
                                        <Box htmlFor="file-upload" sx={{border:"2px dashed #aaa", padding: 20, textAlign:"center", cursor:"pointer"}}>
                                            {'Choose a file'}
                                        </Box>
                                    </Box>
                            </FileUploader>
                        </Box>
                    }

                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setShowAddNewDocument(false);
                }}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showTrainingDocument}
                onClose={() => {
                    setShowTrainingDocument(false);
                }}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Setup Mapping</DialogTitle>
                <DialogContent>

                    <DialogContentText id="alert-dialog-description">
                        If you'd like to submit a file, we can assist in configuring the fields to match the formatting of your document.
                    </DialogContentText>

                    {document != null &&
                    <>
                        <FileUploader refOveride={fileUploaderRef} url={"/DocumentMapping/TrainDocument"} params={{
                            documentComponentId: document.id,
                            companyId: companyId,
                            locationId: locationId,
                            userId: userId
                        }} multiple={false} variant='custom' onUploadCompleted={() => {

                            setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);

                                // setUpdate(!update);
                                // handleClose();
                            }}>
                            <Box sx={{marginTop:2, borderRadius: 2, backgroundColor: "#f5f5f5", border:"1px solid lightgray", cursor:"pointer", padding:2}}>
                                <Button
                                    id="FileUploader"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="text"
                                    disableElevation
                                    startIcon={<PublishRoundedIcon />}
                                    sx={{marginLeft:1}}>
                                    Upload Sample File
                                </Button>
                            </Box>
                        </FileUploader>
                    </>
                    }
                    
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setShowTrainingDocument(false);
                }}>No, thank you</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={addColumnDialog}
                onClose={() => {
                    setAddColumnDialog(false);
                }}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Add Column</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Include a column for document mapping
                    </DialogContentText>

                    <Box sx={{marginTop:2}}>
                        <TextField inputRef={refNewColumnFileColumn} id="outlined-basic" label="File Column" fullWidth={true} variant="outlined" />
                    </Box>

                    <Box sx={{marginTop:4}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Column Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedAddedColumn}
                                label="Column Name"
                                onChange={(data) => {
                                    setSelectedAddedColumn(data.target.value);
                                }}>
                                    {/* {toColumnOptions != null && toColumnOptions.map((column) => {
                                        return (
                                            <MenuItem value={column}>{column}</MenuItem>
                                        )
                                    })} */}
                                
                            </Select>
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setAddColumnDialog(false);
                }}>Cancel</Button>
                <Button onClick={async () => {

                    let response = await apiService().post("/DocumentMapping/AddNewField", {
                        tableName: document.name,
                        fieldName: refNewColumnFileColumn.current.value,
                        fileColumn: selectedAddedColumn,
                        companyId: companyId,
                        locationId: locationId,
                        userId: userId
                    });

                    if (response != null && response.status == 200)
                    {
                        setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);
                        setAddColumnDialog(false);
                    }
                    
                }} autoFocus>
                    Add Column
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={removeDocument != null ? true : false}
                onClose={() => {
                    setRemoveDocument(null);
                }}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Remove the document</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove this document?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setRemoveDocument(null);
                }}>Cancel</Button>
                <Button onClick={async () => {

                    let response = null;
                    if (companyId != null)
                    {
                        response = await apiService().delete("/DocumentMapping/RemoveDocument?companyId=" + removeDocument.companyId + "&documentId=" + removeDocument.documentMappingId)
                    }
                    else
                    {
                        response = await apiService().delete("/DocumentMapping/RemoveDocument?documentId=" + removeDocument.documentMappingId)
                    }

                    if (response != null && response.status == 200)
                    {
                        setDataGridRefreshKey(dataGridRefreshKey + 1);
                        setRemoveDocument(null);

                        if (onArchive != null)
                        {
                            onArchive(removeDocument.documentMappingId);
                        }
                    }
                    
                }}>
                    Remove Document
                </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}