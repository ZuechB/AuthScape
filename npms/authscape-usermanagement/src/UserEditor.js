import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useForm, Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Tab, Tabs } from '@mui/material';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { apiService } from 'authscape';

export function UserEditor({userId = null, onSaved = null, onPasswordChanged = null}) {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

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

          if (response.data.userCustomFields != null)
          {
            setCustomFields(response.data.userCustomFields);
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
    "Email"
  ]

  const findTheValue = (field) => {

    let result = "";
    if (user != null)
    {
      Object.getOwnPropertyNames(user).forEach(element => {

        if (field.toLowerCase() == element.toLowerCase())
        {
          result = user[element];
        }

      });
    }

    return result;
  }

  const findCustomFieldValue = (field) => {

    let result = "";
    if (user != null && user.userCustomFields)
    {
        user.userCustomFields.forEach(userCustomField => {

            if (field.toLowerCase() == userCustomField.name.toLowerCase())
            {
                result = userCustomField.value;
            }
            
        });
    }

    return result;
  }

  const renderCustomField = (customFields) => {

    return (
        <>
        {(userId != -1 ? user != null : true) && customFields.map((field) => {

            let result = findCustomFieldValue(field.name);

            return (
            <Grid item xs={6}>
                <Controller name={field.customFieldId} 
                    control={control}
                    rules={{
                        required: field.isRequired,
                    }}
                    render={({renderField}) => 
                    <TextField
                        label={field.name}
                        variant="outlined"
                        defaultValue={result}
                        margin="normal"
                        fullWidth
                        {...register(field.customFieldId, { required: field.isRequired })}
                        {...renderField}
                    />
                    }
                />
                {errors[field.name] && <Typography color={"red"}>{field.name} is required.</Typography>}
            </Grid>
            )

        })}
        </>
    )
  }

  const renderSystemField = (customFields, isSystemField = false) => {

    return (
        <>
        {(userId != -1 ? user != null : true) && customFields.map((field) => {

            let result = findTheValue(field);

            return (
            <Grid item xs={6}>

              {field == "IsActive" &&
                  <Box>
                  <Controller name={field} 
                      control={control}
                      rules={{
                          required: false,
                      }}
                      render={({renderField}) => 
                      <FormControlLabel control={<Switch defaultChecked={result} />} label={field} {...register(field, { required: false })} {...renderField} />
                      }
                  />
                  {errors[field] && <Typography color={"red"}>{field} is required.</Typography>}

                  </Box>
              }

              {field != "IsActive" &&
              <Box>
                  <Controller name={field} 
                      control={control}
                      rules={{
                          required: true,
                      }}
                      render={({renderField}) => 
                      <TextField
                          label={field}
                          variant="outlined"
                          defaultValue={result}
                          margin="normal"
                          fullWidth
                          {...register(field, { required: true })}
                          {...renderField}
                      />
                      }
                  />
                  {errors[field] && <Typography color={"red"}>{field} is required.</Typography>}
              </Box>
              }
            </Grid>
            )

        })}
        </>
    )
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }


  useEffect(() => {

    const fetchData = async () => {

      if (inputCompanyValue == null || inputCompanyValue == "")
      {
        let response = await apiService().get("/UserManagement/GetCompanies");
        if (response != null && response.status == 200)
        {
          setCompanies(response.data);
        }
      }
      else
      {
        let response = await apiService().get("/UserManagement/GetCompanies?name=" + inputCompanyValue);
        if (response != null && response.status == 200)
        {
          setCompanies(response.data);
        }
      }

    }

    if (user != null || userId == -1)
    {
      fetchData();
    }

  }, [user, userId, inputCompanyValue])

  

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

  return (
      <Box sx={{paddingTop:0, minWidth: 600}}>

          <form onSubmit={handleSubmit(async (data) => {
            
            let userCustomFields = [];

            customFields && customFields.forEach(customField => {

                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: data[customField.customFieldId] 
                });
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
                userCustomFields: userCustomFields
            });

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                    onSaved();
                }
            }

          })} noValidate autoComplete="off">

            <Box>
              <Box>
              <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="basic tabs example" centered>
                  <Tab label="Information" {...a11yProps(0)} />
                  <Tab label="Company & Locations" {...a11yProps(1)} />
                  <Tab label="Roles & Permissions" {...a11yProps(2)} />
                  <Tab label="Authentication & Authorization" {...a11yProps(3)} />
              </Tabs>
              </Box>

              {tabValue === 0 &&
                <Grid spacing={2} sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>

                  {renderSystemField(fields)}
                  
                  {customFields != null &&
                    <>
                      {renderCustomField(customFields)}
                    </>
                  }
                </Grid>
              }

              {tabValue === 1 &&
                <Grid spacing={2} sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>

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
                    noOptionsText="No locations"
                    onChange={(event, newValue) => {
                      setCompanies(newValue ? [newValue, ...companies] : companies);
                      setCompany(newValue);
                      setLocation(null);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputCompanyValue(newInputValue);
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
                        <li {...props}>
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
                      setInputCompanyValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Location" fullWidth />
                    )}
                    renderOption={(props, option) => {

                      return (
                        <li {...props}>
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <BusinessRounded sx={{ color: 'text.secondary' }} />
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
                  
                </Grid>
              }

              {tabValue === 2 &&
                <Box sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>

                  <FormControl sx={{ paddingTop:1, m: 1, width: "100%" }}>
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
                  

                  <FormControl sx={{ m: 1, paddingTop:1, width: "100%" }}>
                      <InputLabel id="demo-multiple-checkbox-label">Permissions</InputLabel>
                      <Select
                      fullWidth={true}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      MenuProps={MenuProps}
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
              }

              {tabValue === 3 &&
                <Box sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>
                  
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
                  <Box sx={{paddingTop:2}}>
                    <Button variant="contained" type="button" onClick={async () => {

                      if (newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")
                      {
                        let response = await apiService().put("/UserManagement/ChangeUserPassword", {
                          userId: userId,
                          password: newPassword
                        });

                        if (onPasswordChanged != null)
                        {
                          onPasswordChanged(response);
                        }
                        // if (response != null && response.status == 200)
                        // {
                        //   if (response.data == null)
                        //   {
                            
                        //   }
                        //   else
                        //   {

                        //   }

                        //   alert("Password Changed!");
                        // }
                        // else
                        // {
                        //   alert(JSON.stringify(response.data.error));
                        // }
                        
                      }

                    }}>{"Change Password"}</Button>
                  </Box>

                </Box>
              }

              {(tabValue == 0 || tabValue == 1 || tabValue == 2) &&
                <Box sx={{paddingTop:1, paddingBottom: 4, paddingLeft: 2}}>
                  <Button variant="contained" type="submit">{userId == -1 ? "Create Account" : "Update Account"}</Button>
                </Box>
              }

            </Box>
          </form>
      </Box>
  )
}