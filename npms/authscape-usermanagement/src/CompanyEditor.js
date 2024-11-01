import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Button, Grid } from '@mui/material';
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
import { apiService } from 'authscape';
// import {renderCustomField, renderSystemField} from './EditorFields';

export function CompanyEditor({companyId = null, onSaved = null}) {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const refTimeoutToken = useRef(null);

  const [customFields, setCustomFields] = useState([]);

  const [company, setCompany] = useState(null);

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


  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };

  useEffect(() => {

    const fetchData = async () => {
      const response = await apiService().get("/UserManagement/GetCompany?companyId=" + companyId);
      if (response != null && response.status == 200)
      {
        setCompany(response.data);

        if (response.data.customFields != null)
        {
          setCustomFields(response.data.customFields);
        }

      }
    }

    fetchData();

  }, []);

  const fields = [
    "Title",
    // "LastName",
    // "IsActive",
    // "Email"
  ]

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
      <Box sx={{paddingTop:0, minWidth: 600}}>

          <form onSubmit={handleSubmit(async (data) => {


            let companyCustomFields = [];

            customFields && customFields.forEach(customField => {

              companyCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: data[customField.customFieldId].toString()
                });
            });


            const response = await apiService().post("/UserManagement/UpdateCompany", {
              id: companyId,
              title: data.Title,
              customFields: companyCustomFields
            });

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                    onSaved();
                }
            }




            

            // let response = await apiService().put("/UserManagement/UpdateUser", {
            //     id: userId,
            //     firstName: data.FirstName,
            //     lastName: data.LastName,
            //     companyId: company != null ? company.id : null,
            //     locationId: location != null ? location.id : null,
            //     email: data.Email,
            //     isActive: data.IsActive,
            //     roles: selectedRoles != "" ? selectedRoles : null,
            //     permissions: selectedPermission != "" ? selectedPermission : null,
            //     userCustomFields: userCustomFields
            // });

            

          })} noValidate autoComplete="off">

            <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
              {(company != null && company.logo != null) &&
                <Box sx={{backgroundImage: `url(${company.logo})`, backgroundSize:"contain", 
                  backgroundRepeat:"no-repeat", backgroundPosition:"center center", marginTop:1, width:"100%", height:80, cursor:"pointer"}}></Box>
              }
              {(company != null && company.logo == null) && 
                <Box sx={{marginTop:1, width:100, height:100, border:"1px dashed black", cursor:"pointer"}}>
                  <Box sx={{marginTop:4.5}}>
                    No Image
                  </Box>
                </Box>
              }
            </Box>

            <Box>
              <Box>
              <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="basic tabs example" centered>
                  <Tab label="Information" {...a11yProps(0)} />
                  <Tab label="Description" {...a11yProps(1)} />
              </Tabs>
              </Box>

              {tabValue === 0 &&
                <Grid spacing={2} sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>
                  
                  {renderSystemField(companyId, company, control, errors, register, fields)}
                  
                  {customFields != null &&
                    <>
                      {renderCustomField(companyId, company, control, errors, register, customFields)}
                    </>
                  }
                </Grid>
              }

              {tabValue === 1 &&
                <Grid spacing={2} sx={{paddingLeft:2, paddingRight:2, paddingTop:2}}>
                 Description here...
                </Grid>
              }

              {(tabValue == 0 || tabValue == 1 || tabValue == 2) &&
                <Box sx={{paddingTop:1, paddingBottom: 4, paddingLeft: 2}}>
                  <Button variant="contained" type="submit">{companyId == -1 ? "Create Company" : "Update Company"}</Button>
                </Box>
              }

            </Box>
          </form>
      </Box>
  )
}