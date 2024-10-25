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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export function Datasources({disableTraining = false}) {

    const documentColumns = [
        { field: 'name', headerName: 'Name', width: 150, editable: false },
        {
            field: "type",
            type: "actions",
            width: 200,
            flex:1,
            headerName: "Data Source",
            getActions: ({ id, row }) => {
              return [
                <Box sx={{textAlign:"left"}}>
                    {row.type == 0 ? "Database" : ""}
                    {row.type == 1 ? "Dynamic Mapping" : ""}
                    {row.type == 2 ? "Custom Model" : ""}
                </Box>,
              ];
            },
        },
        {
            field: "Detail",
            type: "actions",
            width: 200,
            flex:1,
            headerName: "Mapping To",
            getActions: ({ id, row }) => {
              return [
                <Box sx={{textAlign:"left"}}>

                    {row.type == 0 ? 
                        <>Table: {row.tableName}</>
                        : 
                        ""
                    }

                    {row.type == 1 ? 
                        <>Database driven mapping</>
                        : 
                        ""
                    }

                    {row.type == 2 ? 
                        <>Type Name: {row.typeName}
                        <br/> Assembly Fullname: {row.assemblyFullName}</>
                        : 
                        ""
                    }
                    
                </Box>,
              ];
            },
        },
        // {
        //     field: "actions",
        //     type: "actions",
        //     width: 200,
        //     headerName: "Archive",
        //     cellClassName: "actions",
        //     getActions: ({ id, row }) => {
        //       return [
        //         <GridActionsCellItem key={id}
        //           icon={<DeleteRoundedIcon />}
        //           label="Archive"
        //           className="textPrimary"
        //           onClick={async () => {
                    
        //             let documentMappingId = "";
        //             let documentComponentId = "";
                    
        //             // archive the column
        //             await apiService().delete("/DocumentMapping/RemoveColumnFromDocumentComponent?documentMappingId=" + documentMappingId + "&documentComponentId=" + documentComponentId)

        //           }}
        //         />,
        //       ];
        //     },
        // }

    ];

    const refDatabaseTableSelect = useRef(null);
    const refNewDocTypeName = useRef(null);

    const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);

    const [document, setDocument] = useState(null);
    const [showDatasource, setShowDatasource] = useState(false);
    const [databaseTables, setDatabaseTables] = useState(null);

    const [mappingType, setMappingType] = useState("database");


    const refTypeName = useRef(null);
    const refAssemblyFullName = useRef(null);



    useEffect(() => {

        let fetchData = async () => {
            let response = await apiService().get("/DocumentMapping/GetTablesFromDatabase");
            if (response != null && response.status == 200)
            {
                setDatabaseTables(response.data);
            }
        }
        
        fetchData();

    }, [])

    return (
        <Box sx={{marginTop:6}}>
            <Box>
                {!disableTraining &&
                <Box sx={{textAlign:"right", marginBottom:2}}>
                    <Button variant="contained" onClick={() => {
                        setShowDatasource(true);
                    }}>Add Data Source</Button>
                </Box>
                }
                <EditableDatagrid key={dataGridRefreshKey} loadedUser={true} url={"/DocumentMapping/GetDocumentTypes"} columns={documentColumns}/>
            </Box>

            <Dialog
                open={showDatasource}
                onClose={() => {
                    setShowDatasource(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Data Source"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A data source is a place or system where data is stored and collected. It can be a database, file, web service, or sensor. Data is extracted, transformed, and used for analysis and other purposes. Managing data sources is crucial for data-driven decision-making.
                    </DialogContentText>

                    <Box sx={{marginTop:3}}>
                        <TextField inputRef={refNewDocTypeName} label="Name for data source" variant="outlined" fullWidth={true} />
                    </Box>

                    <Box sx={{marginTop:2}}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">How the data will connect:</FormLabel>
                            <RadioGroup value={mappingType} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(env) => {
                                setMappingType(env.currentTarget.value);
                            }}>
                                <FormControlLabel value="database" control={<Radio />} label="Database" />
                                <FormControlLabel value="mappingTable" control={<Radio />} label="Dynamic Mapping Table" />
                                <FormControlLabel value="customModelMapping" control={<Radio />} label="Custom Model" />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    {mappingType == "database" &&
                        <Box sx={{marginTop:2}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Database Tables</InputLabel>
                                    <Select
                                    inputRef={refDatabaseTableSelect}
                                    labelId="demo-simple-select-label"
                                    label="Age">
                                        {databaseTables != null && databaseTables.map((table, index) => {
                                            return (<MenuItem value={table.tableName}>{table.tableName}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    }

                    {mappingType == "customModelMapping" &&

                        <Box sx={{marginTop:2}}>
                            <Box sx={{ minWidth: 120 }}>
                                <TextField inputRef={refTypeName} label="Type Name (Example: API.Controllers.InvoiceUpload)" variant="outlined" fullWidth={true} sx={{marginTop:1}} />
                                <TextField inputRef={refAssemblyFullName} label="Assembly Full Name (Example: API)" variant="outlined" fullWidth={true} sx={{marginTop:1}} />
                            </Box>
                        </Box>
                    }

                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setShowDatasource(false);
                }}>Cancel</Button>
                <Button onClick={async () => {

                    if (mappingType == "customModelMapping")
                    {
                        let response = await apiService().post("/DocumentMapping/AddDataSource", {
                            name: refNewDocTypeName.current.value,
                            dataTable: refNewDocTypeName.current.value,
                            documentType: 2,
                            typeName: refTypeName.current.value,
                            assemblyFullName: refAssemblyFullName.current.value
                        });

                        if (response != null && response.data.error != null)
                        {
                            alert(response.data.error);
                        }
                        else
                        {
                            if (response != null && (response.status == 204 || response.status == 200))
                            {
                                setDataGridRefreshKey(dataGridRefreshKey + 1);
                                setShowDatasource(false);
                            }
                        }
                    }
                    else
                    {
                        let response = await apiService().post("/DocumentMapping/AddDataSource", {
                            name: refNewDocTypeName.current.value,
                            dataTable: refDatabaseTableSelect.current != null ? refDatabaseTableSelect.current.value : "",
                            documentType: (mappingType == "database" ? 0 : 1) 
                        });

                        if (response != null && (response.status == 204 || response.status == 200))
                        {
                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                            setShowDatasource(false);
                        }
                    }

                }}>
                    Add Data Source
                </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}
