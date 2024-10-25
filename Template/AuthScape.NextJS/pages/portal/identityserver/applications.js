import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import {apiService} from 'authscape';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
    DataGrid,
    GridActionsCellItem,
  } from "@mui/x-data-grid";
import { Fab, FormControlLabel, Grid, Switch } from '@mui/material';

const Index = ({currentUser}) => {

    const [title, setTitle] = useState(null);
    const [pageType, setPageType] = useState(1);
    const [openEditApplication, setOpenEditApplication] = useState(null);
    const [openNewApp, setOpenNewApp] = useState(false);
    
    const [pages, setPages] = React.useState([]);

    const handleSaveChanges = async () => {

        if (title != null)
        {
            let response = await apiService().post("/ContentManagement", {
                Title: title,
                PageType: 1 //parseInt(pageType)
            });

            if (response != null && response.status == 200)
            {
                setTitle(null)
                setOpen(false);
                await RefreshPages();
            }
        }
    }

    const handleDelete = (pageId) => {

        swal({
            title: "Delete Page",
            text: "Are you sure you want to delete this page",
            icon: "warning",
            buttons:  ["No", "Yes"],
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                await apiService().delete("/ContentManagement?id=" + pageId);
                RefreshPages();
            }
        });
    }

    useEffect(() => {
        RefreshPages();
    }, []);

    const RefreshPages = async () => {

        let response = await apiService().get("/identityServer/GetApplications");
        if (response != null)
        {
            setPages(response.data);
        }
    }

    const columns = [
        { field: 'clientId', headerName: 'clientId', width:300, editable: false },
        { field: 'displayName', headerName: 'displayName', width:300, editable: false },
        { field: 'type', headerName: 'type', width:300, editable: false },
        {
            field: "actions",
            type: "actions",
            width: 300,
            headerName: "Actions",
            cellClassName: "actions",
            getActions: ({ id, row }) => {
              return [
                <GridActionsCellItem key={id}
                  icon={<NoteAltRoundedIcon />}
                  label="Edit"
                  onClick={async () => {
                    //window.location.href = "/portal/editor/" + row.id;
                    
                    let response = await apiService().get("/IdentityServer/GetApplication?applicationId=" + row.id);
                    if (response != null && response.status == 200)
                    {
                        setOpenEditApplication(response.data);
                    }

                  }}
                />,
                <GridActionsCellItem key={id}
                  icon={<DeleteRoundedIcon />}
                  label="Delete"
                  className="textPrimary"
                  onClick={() => {
                    setArchiveTicketId(row.id);
                  }}
                />,
              ];
            },
        }
    ];
    
    return (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>Applications | Identity Server</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="m-0 font-weight-bold text-primary">Applications</h1>
                    <div className="text-right">

                        <Fab onClick={() => {
                            setOpenNewApp(true);
                        }} color={"primary"} sx={{position:"absolute", bottom:20, right:20}}>
                            <AddRoundedIcon />
                        </Fab>

                    </div>
                </div>
                <Box sx={{width:"100%",  height: 300}}>
                    <DataGrid
                    isRowSelectable={false}
                        rows={pages}
                        columns={columns}
                    />
                </Box>
            </div>
        </div>



        <Dialog
            open={openNewApp}
            fullWidth={true}
            maxWidth={"sm"}
            onClose={() => {
              setOpenNewApp(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Create Application"}</DialogTitle>
            <DialogContent>
                <Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Client Id" />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Display Name" />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Secret (leave empty for auto generated)" />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                
                
                
                setOpenEditApplication(null);



            }} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSaveChanges} variant="contained" color="primary" autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openEditApplication == null ? false : true}
            fullWidth={true}
            maxWidth={"lg"}
            onClose={() => {
              setOpenEditApplication(null);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Edit Application"}</DialogTitle>
            <DialogContent>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      
                    
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Client Id" defaultValue={openEditApplication != null ? openEditApplication.clientId : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Display Name" defaultValue={openEditApplication != null ? openEditApplication.displayName : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Type" defaultValue={openEditApplication != null ? openEditApplication.type : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Client Uri" defaultValue={openEditApplication != null ? openEditApplication.clientUri : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Logo Uri" defaultValue={openEditApplication != null ? openEditApplication.logoUri : ""} />
                    </Box>
                    </Grid>
                    <Grid item xs={6}>
                    <Box>
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Authorization Code Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Implicit Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Hybrid Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Password Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Client Credentials Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Refresh Token Flow" />
                      <FormControlLabel control={<Switch defaultChecked />} label="Allow Device Endpoint" />
                    </Box>

                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} multiline={true} rows={4} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Redirect Uri" defaultValue={openEditApplication != null ? openEditApplication.redirectUris : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        
                        <FormControlLabel control={<Switch defaultChecked />} label="Allow Logout Endpoint" />
                        
                        <TextField fullWidth={true} multiline={true} rows={4} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Post Logout Redirect Uris" defaultValue={openEditApplication != null ? openEditApplication.postLogoutRedirectUris : ""} />
                    </Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Consent Type" defaultValue={openEditApplication != null ? openEditApplication.consentType : ""} />
                    </Box>
                    <Box>
                      <FormControlLabel control={<Switch defaultChecked />} label="Scope Name here..." />
                    </Box>
                    </Grid>
                  </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
              setOpenEditApplication(null);
            }} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSaveChanges} variant="contained" color="primary" autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

    </div>
    )
}

export default Index;