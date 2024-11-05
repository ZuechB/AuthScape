import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Menu, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import { EditableDatagrid, FileUploader, AutoSaveTextField, apiService } from 'authscape';
import Grid from '@mui/material/Grid2';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import Autocomplete from '@mui/material/Autocomplete';

// comment this out when done
// import UserEditor from './UserEditor'; // remove when done
// import { CompanyEditor } from './CompanyEditor' // remove when done
// import { CSVUsersUpload } from './CSVUsersUpload'; // remove when done
// import { CustomFields } from './CustomFields'; // remove when done


export default function UserManagement({height = "50vh", platformType = 1, onUploadCompleted = null}) {

    const [showUserDetails, setShowUserDetails] = useState(null);
    const [showCustomSettings, setShowCustomSettings] = useState(false);

    const [showContactDialog, setShowContactDialog] = useState(false);


    const [allRoles, setAllRoles] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);


    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);
    const [uploadUsersShowDialog, setUploadUsersShowDialog] = useState(false);

    const [searchByName, setSearchByName] = useState('');
    const [searchByCompanyId, setSearchByCompanyId] = useState(null);
    const [searchByRoleId, setSearchByRoleId] = useState(null);

    const userEditorRef = useRef();


    const newFirstName = useRef();
    const newLastName = useRef();
    const newEmail = useRef();


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


    const companiesColumns = [
        {
            field: 'logo',
            headerName: 'Logo',
            flex: 1,
            renderCell: (param) => {
                return <Box sx={{backgroundImage: `url(${param.row.logo})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", marginTop:1}} height={50}></Box>
            }
        },
        {
            field: 'title',
            headerName: 'Name',
            flex: 1,
            renderCell: (param) => {
                return param.row.title; 
            }
        },
        {
            field: 'numberOfLocations',
            headerName: 'Number of Locations',
            flex: 1,    
            renderCell: (param) => {
                return param.row.numberOfLocations != null ? param.row.numberOfLocations : ""; 
            }
        },
        {
            field: 'numberOfUsers',
            headerName: 'Number of Users',
            flex: 1,    
            renderCell: (param) => {
                return param.row.numberOfUsers != null ? param.row.numberOfUsers : ""; 
            }
        },
    ];


    useEffect(() => {

        setDataGridRefreshKey(dataGridRefreshKey + 1);

    }, [searchByName]);

    const getDataGrid = () => {

        getAllCompanies();
        getAllRoles();

        let response = "";
        if (platformType == 1)
        {
            response = "/UserManagement/GetUsers";
        }
        else if (platformType == 2)
        {
            response = "/UserManagement/GetCompanies";
        }
        else if (platformType == 3)
        {

        }

        return response;
    }

    const getColumns = () => {

        if (platformType == 1)
        {
            return userColumns;
        }
        else if (platformType == 2)
        {
            return companiesColumns;
        }
        else if (platformType == 3)
        {
            return null;
        }
    }

    const getAllCompanies = async () => {

        let results = [];

        let response = await apiService().get("/UserManagement/GetCompanies");

        response.data.forEach(element => {

            results.push({
                label: element.title,
                id: element.id
            });
        });

        setAllCompanies(results);
    }

    const getAllRoles = async () => {

        let results = [];

        let response = await apiService().get("/UserManagement/GetRoles");
        response.data.forEach(element => {

            results.push({
                label: element.name,
                id: element.id
            });
        });

        setAllRoles(results);
    }

    return (
        <Box>
            <AppBar color={"invert"} position="static" sx={{borderRadius:1, paddingLeft:3, paddingRight:3, minHeight:50}}>
                <Toolbar disableGutters>
                {(!showCustomSettings && showUserDetails) &&
                <>
                    <Box sx={{paddingRight:2}}>
                        <KeyboardBackspaceRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor:"pointer" }} onClick={() => {
                            setShowUserDetails(null);
                        }} />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                </>
                }

                {showCustomSettings &&
                <>
                    <Box sx={{paddingRight:2}}>
                        <KeyboardBackspaceRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor:"pointer" }} onClick={() => {
                            setShowCustomSettings(false);
                        }} />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                </>
                }

                {!showCustomSettings &&
                <>
                    {showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2, paddingLeft:2}}>
                            <Button variant="text" startIcon={<SaveRoundedIcon />} onClick={async () => {

                                userEditorRef.current.saveChanges();

                            }}>Save</Button>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }

                    {showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2, paddingLeft:2}}>
                            <Button variant="text" startIcon={<SaveRoundedIcon />} onClick={async () => {

                                userEditorRef.current.saveChanges(true);
                                setShowUserDetails(null);

                            }}>Save &amp; close</Button>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }

                    {showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2, paddingLeft:2}}>
                            <Button variant="text" startIcon={<PasswordRoundedIcon />} onClick={async () => {

                                setShowChangePasswordDialog(true);

                            }}>Change Password</Button>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }


                    {!showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2}}>
                            <Typography variant="body" sx={{fontSize:20, fontWeight:"bold"}}>
                                {platformType == 1 && "Contacts"}
                                {platformType == 2 && "Companies"}
                                {platformType == 3 && "Locations"}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }

                    {!showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2, paddingLeft:1}}>
                            <Button variant="text" startIcon={<AddRoundedIcon />} onClick={async () => {

                                setShowContactDialog(true);

                            }}>Add Contact</Button>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }

                    {!showUserDetails &&
                    <>
                        <Box sx={{paddingRight:2, paddingLeft:1}}>
                            <Button variant="text" startIcon={<UploadRoundedIcon />} onClick={async () => {

                                setUploadUsersShowDialog(true);

                            }}>Upload Users</Button>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                    }
                </>
                }
                
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Custom Fields">
                    <IconButton sx={{ p: 0 }} onClick={() => {
                        setShowCustomSettings(true);
                    }}>
                        <SettingsRoundedIcon sx={{fontSize:25}} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    // anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    >
                    </Menu>
                </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{marginTop:1, padding:2, borderRadius:1, boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"}}>
                {showUserDetails == null &&
                    <Box sx={{paddingBottom:1}}>

                        <Grid container spacing={2}>
                            <Grid size={4}>
                                <AutoSaveTextField label="name or email " fullWidth={true} onChanged={(value) => {
                                
                                    setSearchByName(value);
                                    setDataGridRefreshKey(dataGridRefreshKey + 1);

                                }} />
                            </Grid>
                            <Grid size={4}>
                                <Autocomplete
                                    disablePortal
                                    options={allCompanies}
                                    renderInput={(params) => <TextField {...params} label="Companies" />}
                                    onChange={(event, newValue) => {

                                        if (newValue != null)
                                        {
                                            setSearchByCompanyId(newValue.id);
                                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                                        }
                                        else
                                        {
                                            setSearchByCompanyId(null);
                                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={4}>
                                <Autocomplete
                                    disablePortal
                                    options={allRoles}
                                    renderInput={(params) => <TextField {...params} label="Roles" />}
                                    onChange={(event, newValue) => {

                                        if (newValue != null)
                                        {
                                            setSearchByRoleId(newValue.id);
                                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                                        }
                                        else
                                        {
                                            setSearchByRoleId(null);
                                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>

                        
                    </Box>
                }

                {!showCustomSettings &&
                <Box>
                    {showUserDetails == null &&
                    <EditableDatagrid 
                        key={dataGridRefreshKey}
                        height={height}
                        pageSize={25}
                        url={getDataGrid()} 
                        columns={getColumns()}
                        params={{
                            searchByName: searchByName,
                            searchByCompanyId: searchByCompanyId,
                            searchByRoleId: searchByRoleId,
                        }} 
                        onRowClick={(row) => {
                            setShowUserDetails(row.id);
                        }} />
                    }

                    <Box>
                        {showUserDetails != null &&
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%' }}>
                                {platformType == 1 &&
                                    <UserEditor
                                        platformType={platformType}
                                        ref={userEditorRef}
                                        userId={showUserDetails}
                                        onSaved={(shouldClose) => {

                                            setDataGridRefreshKey(dataGridRefreshKey + 1);

                                            if (shouldClose)
                                            {
                                                setShowUserDetails(null);
                                            }
                                        }}
                                    />
                                }
                                {platformType == 2 &&
                                    <CompanyEditor 
                                        companyId={showUserDetails}
                                        onSaved={(shouldClose) => {

                                            setDataGridRefreshKey(dataGridRefreshKey + 1);

                                            if (shouldClose)
                                            {
                                                setShowUserDetails(null);
                                            }
                                        }}
                                    />
                                }
                            </Box>
                        </Grid>
                        }
                        
                    </Box>
                </Box>
                }

                <Dialog
                    open={showChangePasswordDialog}
                    onClose={() => {
                        setShowChangePasswordDialog(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                    {"Change Password"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please provide the new password that you want to change for this users account.
                        </DialogContentText>

                        <Grid size={12}>
                            
                            <Box sx={{paddingTop:2}}>
                                <TextField id="txtNewPassword" label="New Password" variant="outlined" fullWidth={true} onChange={(val) => {
                                    setNewPassword(val.currentTarget.value);
                                }} />
                            </Box>
                            <Box sx={{paddingTop:2}}>
                                <TextField id="txtConfirmPassword" label="Confirm Password" variant="outlined" fullWidth={true} onChange={(val) => {
                                    setConfirmPassword(val.currentTarget.value);
                                }} />

                                {newPassword !== confirmPassword &&
                                <Typography color={"red"}>{"New Password and Confirm Password"} does not match.</Typography>
                                }

                            </Box>

                        </Grid>




                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => {
                        setShowChangePasswordDialog(false);
                    }}>Cancel</Button>
                    <Button onClick={async () => {

                        if (newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")
                        {
                            let response = await apiService().put("/UserManagement/ChangeUserPassword", {
                                userId: parseInt(showUserDetails),
                                password: newPassword
                            });

                            if (response.data != null && response.data.error != null)
                            {
                                alert(response.data.error);
                            }
                            else
                            {
                                setShowChangePasswordDialog(false);
                            }
                        }

                    }}>
                        Change Password
                    </Button>
                    </DialogActions>
                </Dialog>





                <Dialog
                    open={showContactDialog}
                    onClose={() => {
                        setShowContactDialog(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                    {"Setup Contact Account"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please provide the following information to proceed and complete the account setup.
                        </DialogContentText>

                        <Grid container spacing={2} sx={{paddingTop:2}}>
                            <Grid size={6}>
                                <TextField inputRef={newFirstName} label="First Name" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid size={6}>
                                <TextField inputRef={newLastName} label="Last Name" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid size={12}>
                                <TextField inputRef={newEmail} label="Email" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => {
                        setShowChangePasswordDialog(false);
                    }}>Cancel</Button>
                    <Button onClick={async () => {


                        alert(newFirstName.current.value)
                        alert(newLastName.current.value)
                        alert(newEmail.current.value)

                        // if (newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")
                        // {
                        //     let response = await apiService().put("/UserManagement/ChangeUserPassword", {
                        //         userId: parseInt(showUserDetails),
                        //         password: newPassword
                        //     });

                        //     if (response.data != null && response.data.error != null)
                        //     {
                        //         alert(response.data.error);
                        //     }
                        //     else
                        //     {
                        //         setShowChangePasswordDialog(false);
                        //     }
                        // }

                    }}>
                        create contact
                    </Button>
                    </DialogActions>
                </Dialog>

                {showCustomSettings &&
                    <CustomFields platformType={platformType} />
                }

                <CSVUsersUpload showDialog={uploadUsersShowDialog} onClose={() => {
                    setUploadUsersShowDialog(false);
                }} />
            </Box>

        </Box>
    );
}