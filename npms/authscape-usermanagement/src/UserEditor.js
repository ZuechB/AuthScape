import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useForm, Controller } from 'react-hook-form';
import { Tab, Tabs } from '@mui/material';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { apiService } from 'authscape';
import Grid from '@mui/material/Grid2';

// remove when publishing
// import {renderCustomField, renderSystemField } from './EditorFields';


const UserEditor = forwardRef(({userId = null, platformType, onSaved = null}, ref) => {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const refTimeoutToken = useRef(null);

  const refShouldClose = useRef(null);
  const refSubmitButton = useRef(null);

  const [selectedRoles, setSelectedRole] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [inputCompanyValue, setInputCompanyValue] = useState('');

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [inputLocationValue, setInputLocationValue] = useState('');

  const [roles, setRole] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [customFields, setCustomFields] = useState([]);

  const [user, setUser] = useState(null);

  const [tabOptions, setTabOptions] = useState([]);


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
  };


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };

  useEffect(() => {

      const fetchData = async () => {

          let responseRoles = await apiService().get("/UserManagement/GetRoles");
          if (responseRoles != null && responseRoles.status == 200)
          {
            setRole(responseRoles.data);
          }

          let responsePermissions = await apiService().get("/UserManagement/GetPermissions");
          if (responsePermissions != null && responsePermissions.status == 200)
          {
            setPermissions(responsePermissions.data);
          }

      }
      fetchData();

  }, []);

  useEffect(() => {

    if (userId != null)
    {
      const fetchData = async () => {
        let response = await apiService().get("/UserManagement/GetUser?userId=" + userId);
        if (response != null && response.status == 200)
        {
          setUser(response.data);

          if (response.data.company != null)
          {
            setCompany(response.data.company);
          }

          if (response.data.location != null)
          {
            setLocation(response.data.location);
          }

          if (response.data.customFields != null)
          {
            setCustomFields(response.data.customFields);
          }

          // assign all selected roles
          if (response.data.roles != null)
          {
            let roleNames = [];
            for (let index = 0; index < response.data.roles.length; index++) {
              const role = response.data.roles[index];
              
              roleNames.push(role);
            }
            setSelectedRole(roleNames);
          }

          // assign all selected permissions
          if (response.data.permissions != null)
          {
            let permissionNames = [];
            for (let index = 0; index < response.data.permissions.length; index++) {
              const permission = response.data.permissions[index];
              
              permissionNames.push(permission);
            }
            setSelectedPermission(permissionNames);
          }
          
        }
      }

      if (userId != -1)
      {
        fetchData();
      }
      
    }

  }, [userId])

  const fields = [
    "FirstName",
    "LastName",
    "IsActive",
    "Email",
    "PhoneNumber"
  ]

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const refreshTabOptions = async () => {
      const customTabResponse = await apiService().get("/UserManagement/GetCustomTabs?platformType=" + platformType);
      if (customTabResponse != null && customTabResponse.status == 200)
      {
          let dataElement = customTabResponse.data; 
          setTabOptions(dataElement);

          if (dataElement.length > 0)
          {
            setTabValue(dataElement[0].id);
          }
      }
  }


  useEffect(() => {

    const fetchData = async () => {

        const response2 = await apiService().get("/UserManagement/GetCompanies?name=" + inputCompanyValue);
        if (response2 != null && response2.status == 200)
        {
          setCompanies(response2.data);
        }

        await refreshTabOptions();
    }

    // sets a delay so the user can type
    clearTimeout(refTimeoutToken.current)
    refTimeoutToken.current = setTimeout(() => {

      clearTimeout(refTimeoutToken.current)

      fetchData();

    }, 1000);
    

  }, [inputCompanyValue])


  useEffect(() => {

    const fetchData = async () => {

      if (company != null)
      {
        if (inputLocationValue == null || inputLocationValue == "")
        {
          let response = await apiService().get("/UserManagement/GetLocations?companyId=" + company.id);
          if (response != null && response.status == 200)
          {
            setLocations(response.data);
          }
        }
        else
        {
          let response = await apiService().get("/UserManagement/GetLocations?companyId=" + company.id + "&name=" + inputLocationValue);
          if (response != null && response.status == 200)
          {
            setLocations(response.data);
          }
        }
      }
    }

    if (user != null || userId == -1)
    {
      fetchData();
    }

  }, [user, userId, inputLocationValue, company])


  const saveChanges = (shouldClose) => {
    refShouldClose.current = shouldClose;
    refSubmitButton.current.click();
  }


  useImperativeHandle(ref, () => ({
    saveChanges,
  }));



  return (
      <Box>

          <form onSubmit={handleSubmit(async (data) => {
            
            let userCustomFields = [];

            customFields && customFields.forEach(customField => {

              let newValue = data[customField.customFieldId];
              if (newValue != null)
              {
                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: newValue.toString()
                });
              }
                
            });

            let response = await apiService().put("/UserManagement/UpdateUser", {
                id: userId,
                firstName: data.FirstName,
                lastName: data.LastName,
                companyId: company != null ? company.id : null,
                locationId: location != null ? location.id : null,
                email: data.Email,
                isActive: data.IsActive,
                roles: selectedRoles != "" ? selectedRoles : null,
                permissions: selectedPermission != "" ? selectedPermission : null,
                customFields: userCustomFields
            });

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                    onSaved(refShouldClose.current);
                }
            }

          })} noValidate autoComplete="off">
            
            <Grid container spacing={2} sx={{paddingTop:2}}>
              <Grid size={3} sx={{backgroundColor:"#f5f8fa", borderRadius:2, border: "1px solid lightgray", padding:2}}>
                <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100, height: 100 }} />
                </Box>

                <hr />
                <Box sx={{fontWeight:"bold", paddingBottom: 1}}>
                  About this contact
                </Box>

                {renderSystemField(userId, user, control, errors, register, fields)}

                <Box sx={{fontWeight:"bold", paddingTop:1, paddingBottom: 1}}>
                  Companies and Locations
                </Box>

                <Box>
                  <Autocomplete
                    id="companySelect"
                    sx={{paddingTop:2}}
                    getOptionLabel={
                      (option) => option.title
                    }
                    filterOptions={(x) => x}
                    options={companies != null ? companies : []}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={company}
                    noOptionsText="No companies"
                    onChange={(event, newValue) => {
                      //setCompanies(newValue ? [newValue, ...companies] : companies);
                      setCompany(newValue);
                      setLocation(null);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputCompanyValue(newInputValue);
                      setLocation(null);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Company" fullWidth />
                    )}
                    renderOption={(props, option) => {
                      // const matches =
                      //   option.structured_formatting.main_text_matched_substrings || [];

                      // const parts = parse(
                      //   option.structured_formatting.main_text,
                      //   matches.map((match) => [match.offset, match.offset + match.length]),
                      // );


                      return (
                        <li {...props} key={"company-" + props.id} >
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <BusinessRoundedIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                              {/* {parts.map((part, index) => (
                                <Box
                                  key={index}
                                  component="span"
                                  sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                >
                                  {part.text}
                                </Box>
                              ))} */}
                              <Typography variant="body2" color="text.secondary">
                                {option.title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </li>
                      );
                    }}
                  />

                  <Autocomplete
                    id="LocationSelect"
                    sx={{paddingTop:3}}
                    getOptionLabel={
                      (option) => option.title
                    }
                    filterOptions={(x) => x}
                    options={locations != null ? locations : []}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={location}
                    noOptionsText="No locations"
                    onChange={(event, newValue) => {
                      setLocations(newValue ? [newValue, ...locations] : locations);
                      setLocation(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      //setInputCompanyValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Location" fullWidth />
                    )}
                    renderOption={(props, option) => {

                      return (
                        <li {...props}>
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <BusinessRoundedIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                              <Typography variant="body2" color="text.secondary">
                                {option.title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </li>
                      );
                    }}
                  />
                </Box>

                <Box sx={{fontWeight:"bold", paddingTop:2}}>
                  Roles and Permissions
                </Box>

                <Box>

                    <FormControl sx={{ marginTop:3, width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                        <Select
                            fullWidth={true}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            {...register("roles", { required: false })}
                            multiple
                            value={selectedRoles}
                            onChange={(event) => {

                            const {
                                target: { value },
                            } = event;
                            setSelectedRole(
                                // On autofill we get a stringified value.
                                typeof value === 'string' ? value.split(',') : value,
                            );
                                
                            }}
                            input={<OutlinedInput label="Roles" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}>
                            {roles.map((role) => (
                                <MenuItem key={role.name} value={role.name}>
                                <Checkbox checked={selectedRoles.indexOf(role.name) > -1} />
                                <ListItemText primary={role.name} /> 
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.roles && <Typography color={"red"}>{"roles"} is required.</Typography>}
                    

                    <FormControl sx={{ marginTop:3, width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">Permissions</InputLabel>
                        <Select
                        fullWidth={true}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        {...register("permissions", { required: false })}
                        multiple
                        value={selectedPermission}
                        onChange={(event) => {

                          const {
                            target: { value },
                          } = event;
                          setSelectedPermission(
                            // On autofill we get a stringified value.
                            typeof value === 'string' ? value.split(',') : value,
                          );

                        }}
                        input={<OutlinedInput label="Roles" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}>
                        {permissions.map((permission) => (
                            <MenuItem key={permission.name} value={permission.name}>
                              <Checkbox checked={selectedPermission.indexOf(permission.name) > -1} />
                              <ListItemText primary={permission.name} /> 
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    {errors.permissions && <Typography color={"red"}>{"permissions"} is required.</Typography>}

                </Box>
            

              </Grid>
              <Grid size={9}>

                <Box>
                  <Box>
                  <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="basic tabs example" centered>
                    {tabOptions.map((tab, index) => {
                      return (
                        <Tab label={tab.name} value={tab.id} />
                      )
                    })}
                  </Tabs>
                  </Box>
                  
                  <Grid container spacing={1} sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>

                    {tabOptions.map((tab, index) => {
                      return (
                        <>
                        {tabValue === tab.id && 
                          <>
                            {customFields != null &&
                              <>
                                {renderCustomField(userId, user, control, errors, register, setValue, customFields.filter(s => s.tabId == tab.id))}
                              </>
                            }
                          </>
                        }
                        </>
                      )
                    })}

                      <Button ref={refSubmitButton} variant="contained" type="submit" sx={{display:"none"}}>Save Changes</Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </form>
      </Box>
  )
});

UserEditor.displayName = "UserEditor";

export default UserEditor;