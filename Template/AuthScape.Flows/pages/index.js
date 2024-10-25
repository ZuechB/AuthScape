import React, {useEffect, useState, useRef} from 'react';
import {apiService, authService} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {EditableDatagrid} from 'authscape';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function Home({loadedUser, setIsLoading, currentUser}) {

  const refProjectName = useRef(null);
  const refProjectDesc = useRef(null);

  const [open, setOpen] = useState(false);
  const [archiveProject, setArchiveProject] = useState(null);
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'created', flex: 1, headerName: 'Created', width: 200 },
    {
      field: "actions",
      type: "actions",
      width: 200,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem key={id}
            icon={<VisibilityRoundedIcon />}
            label="View"
            onClick={() => {
              window.location.href = "/editor?projectId=" + row.id;
            }}
          />,
          <GridActionsCellItem key={id}
            icon={<DeleteRoundedIcon />}
            label="Archive"
            className="textPrimary"
            onClick={() => {
              setArchiveProject(row.id);
            }}
          />,
        ];
      },
    }
  ];

  return (
  <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit' elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Projects
            </Typography>
            <Button color="primary" variant="contained" startIcon={<AddRoundedIcon/>} onClick={async () => {

              // upload a invoice for a customer
              setOpen(true);

            }}>Create Project</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{height: 600, width: '100%' }}>
        <EditableDatagrid loadedUser={loadedUser} url={"/Flow/GetFlows"} height={"85vh"} columns={columns} />
      </Box>

      <Dialog
        open={open}
        fullWidth={true}
        onClose={() => {

          setOpen(false);

        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"New Project"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField inputRef={refProjectName} label="Project Name" variant="outlined" fullWidth={true} sx={{marginTop:2}} />
          </Box>
          <Box>
            <TextField inputRef={refProjectDesc} label="About your project" variant="outlined" rows={4} multiline={true} fullWidth={true} sx={{marginTop:2}} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {

            setOpen(false);

          }}>Cancel</Button>
          <Button onClick={async () => {

            let response = await apiService().post("/Flow/CreateFlow", {
              name: refProjectName.current.value,
              description: refProjectDesc.current.value
            });
            if (response != null && response.status == 200)
            {
              window.location.href = "/editor?projectId=" + response.data;
            }

          }}>
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

    </div>
    
  )
}
