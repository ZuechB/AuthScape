import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import { Avatar, Button, Drawer, Grid, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { EditableDatagrid, FileUploader, AutoSaveTextField, apiService } from 'authscape';
// import { UserEditor } from './UserEditor'; // remove when done
// import { CSVUsersUpload } from './CSVUsersUpload'; // remove when done

export default function UserManagement({height = "50vh", onUploadCompleted = null, onPasswordChanged = null}) {

    const [showUserDetails, setShowUserDetails] = useState(null);

    const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);
    const [uploadUsersShowDialog, setUploadUsersShowDialog] = useState(false);

    const [searchByName, setSearchByName] = useState('');

    const userColumns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            flex: 1,
            renderCell: (param) => {
                return param.row.firstName + " " + param.row.lastName; 
            }
        },
        { field: 'userName', flex:1, headerName: 'Email', editable: false, headerClassName: 'invoiceHeaderColumn' },  
        {
            field: 'company',
            headerName: 'Company',
            flex: 1,    
            renderCell: (param) => {
                return param.row.company != null ? param.row.company.title : ""; 
            }
        },
        {
            field: 'location',
            headerName: 'Location',
            flex: 1,    
            renderCell: (param) => {
                return param.row.location != null ? param.row.location.title : ""; 
            }
        },
        {
            field: 'isActive',
            headerName: 'Status',
            flex: 1,    
            renderCell: (param) => {
                return param.row.isActive ? "Active" : "Not Active"; 
            }
        },
        {
            field: 'roles',
            headerName: 'Roles',
            flex: 1,    
            renderCell: (param) => {
                return param.row.roles; 
            }
        },
        {
            field: 'permission',
            headerName: 'Permission',
            flex: 1,    
            renderCell: (param) => {
                return param.row.permissions; 
            }
        },
    ];

    useEffect(() => {

        setDataGridRefreshKey(dataGridRefreshKey + 1);

    }, [searchByName]);

    return (
        <Box>

            <Grid container spacing={2} sx={{paddingBottom:2}}>
                <Grid item xs={6}>

                    <AutoSaveTextField label="Search... " fullWidth={true} onChanged={(value) => {
                        
                        setSearchByName(value);
                        setDataGridRefreshKey(dataGridRefreshKey + 1);

                    }} />

                </Grid>
                <Grid item xs={6}>

                    <Box sx={{textAlign:"right"}}>
                        <Button variant="contained" sx={{width:200}} onClick={async () => {

                            setShowUserDetails(-1);

                        }}>Add User</Button>


                        <Button startIcon={<UploadRoundedIcon/>} variant="contained" sx={{width:200, marginLeft:2}} onClick={async () => {
                            setUploadUsersShowDialog(true);
                        }}>Upload Users</Button>
                    </Box>

                </Grid>
            </Grid>

            <Box>
                <EditableDatagrid 
                    key={dataGridRefreshKey}
                    height={height}
                    pageSize={25}
                    url={"/UserManagement/GetUsers"} 
                    columns={userColumns}
                    params={{
                        searchByName: searchByName
                    }} 
                    onRowClick={(row) => {
                        setShowUserDetails(row.id);
                    }} />

                <Drawer
                    anchor={"right"}
                    fullWidth={true}
                    width={800}
                    open={showUserDetails != null ? true : false}
                    onClose={() => {
                        setShowUserDetails(null);
                    }}>

                    <IconButton size="large" sx={{position:"absolute", right: 10, top: 6}} onClick={() => {
                        setShowUserDetails(null);
                    }}>
                        <CloseRoundedIcon />
                    </IconButton>

                    <Grid item xs={12}>
                        <Box sx={{padding:2}}>
                            User Information
                        </Box>
                        <hr />

                        <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100, height: 100 }} />
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            

                            <UserEditor 
                                userId={showUserDetails}
                                onPasswordChanged={onPasswordChanged}
                                onSaved={() => {

                                    setDataGridRefreshKey(dataGridRefreshKey + 1);
                                    setShowUserDetails(null);
                                }} 
                            />


                        </Box>

                    </Grid>
                    
                </Drawer>
            </Box>

            <CSVUsersUpload showDialog={uploadUsersShowDialog} onClose={() => {
                setUploadUsersShowDialog(false);
            }} />

        </Box>
    );
}