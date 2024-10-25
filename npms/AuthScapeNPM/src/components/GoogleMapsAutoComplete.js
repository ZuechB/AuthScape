import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ListItemText from '@mui/material/ListItemText';
import useOnclickOutside from "react-cool-onclickoutside";
import Stack from "@mui/material/Stack";

import usePlacesAutocomplete, {
  getGeocode,
  getZipCode,
  getDetails,
  getLatLng,
} from "use-places-autocomplete";

const AutoCompleteDialog = ({placeholder, onSelected, defaultValue, onChange}) => {

    const txtAddressField = useRef(null);
  
    const dismissSuggestions = () => {
      clearSuggestions();
    };
  
    const ref = useOnclickOutside(dismissSuggestions);
  
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 1000,
    });
  
    const handleInput = (e) => {
      e.stopPropagation()
  
      // Update the keyword of the input element
      setValue(e.target.value);
  
      onChange(e.target.value);
    };
  
    // useEffect(() => {
  
    //   setValue(defaultValue) // test this!!!!
  
    // }, [defaultValue])
  
  
    const determineComponentType = (component) => {
  
      let returnVal = {};
  
      for (let index = 0; index < component.types.length; index++) {
        const componentType = component.types[index];
  
  
        switch(componentType)
        {
          case "street_number":
  
            returnVal = {
              componentType: "Street_number",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
          case "route":
  
            returnVal = {
              componentType: "Route",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "locality":
  
            returnVal = {
              componentType: "City",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "administrative_area_level_2":
  
            returnVal = {
              componentType: "County",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "administrative_area_level_1":
  
            returnVal = {
              componentType: "State",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "country":
  
            returnVal = {
              componentType: "country",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "postal_code":
  
            returnVal = {
              componentType: "postal_code",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
  
          case "postal_code_suffix":
  
            returnVal = {
              componentType: "postal_code_suffix",
              long_name: component.long_name,
              short_name: component.short_name
            }
  
            break;
        }
      }
  
      return returnVal;
    }
  
    const getSimplifyResult = (result) => {
  
      let street_number = "";
      let route = "";
      let city = "";
      let county = "";
      let state = "";
      let country = "";
      let postal_code = "";
      let postal_code_suffix = "";
      let lat = null;
      let long = null;
      let mapUrl = "";
      let placeId = null;
  
      for (let index = 0; index < result.address_components.length; index++) {
        const component = result.address_components[index];
  
        let response = determineComponentType(component);
  
        if (response.componentType == "Street_number")
        {
          street_number = response.long_name;
        }
        else if (response.componentType == "Route")
        {
          route = response.long_name;
        }
        else if (response.componentType == "City")
        {
          city = response.long_name;
        }
        else if (response.componentType == "County")
        {
          county = response.long_name;
        }
        else if (response.componentType == "State")
        {
          state = response.short_name;
        }
        else if (response.componentType == "country")
        {
          country = response.long_name;
        }
        else if (response.componentType == "postal_code")
        {
          postal_code = response.long_name;
        }
        else if (response.componentType == "postal_code_suffix")
        {
          postal_code_suffix = response.long_name;
        }
      }
  
      if (result.geometry != null && result.geometry.location != null)
      {
        lat = result.geometry.location.lat;
        long = result.geometry.location.lng;
      }
  
      mapUrl = result.url;
      placeId = result.place_id;
      
      return {
        address: (street_number + " " + route),
        city: city,
        state: state,
        county: county,
        postalCode: postal_code,
        country: country,
        lat: lat,
        long: long,
        mapUrl: mapUrl,
        placeId: placeId
      };
  
    }
  
    const handleSelect =
      ({ description, place_id }) =>
      () => {
  
        const parameter = {
          // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
          placeId: place_id,
          // Specify the return data that you want (optional)
          //fields: ["name", "rating"],
        };
  
        clearSuggestions();
  
        getDetails(parameter)
          .then((result) => {
  
            let response = getSimplifyResult(result);
            if (response != null)
            {
              onSelected(response);
  
              setValue(response.address, false);
            }
  
          })
          .catch((error) => {
            alert(error);
          });
      };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <MenuItem key={place_id} onClick={handleSelect(suggestion, place_id)} sx={{paddingRight:2}}>
            <ListItemIcon>
              <LocationOnRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText><strong>{main_text}</strong> <small>{secondary_text}</small></ListItemText>
          </MenuItem>
        );
      });
  
    return (
      <>

        <Stack>
          <TextField ref={txtAddressField} defaultValue={defaultValue} name="address" autoComplete="new-password" label={placeholder} variant="outlined" fullWidth={true} value={value} onChange={handleInput} />
        </Stack>

        {status == "OK" &&
          <MenuList ref={ref} sx={{position:"absolute", zIndex:9999, backgroundColor:"white", border:"1px solid black"}}>
            {renderSuggestions()}
          </MenuList>
        }
      </>
    );
  };

export const GoogleMapsAutoComplete = ({
  onAddressSelected,
  _address = "",
  _city = "",
  _state = "",
  _postalCode = ""
}) => {
  const [address, setAddress] = useState(_address);
  const [city, setCity] = useState(_city);
  const [state, setState] = useState(_state);
  const [zip, setPostalcode] = useState(_postalCode);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  return (
    <>
    <Box>
        <AutoCompleteDialog
        placeholder={"Address"}
        defaultValue={address}
        onSelected={(data) => {
            setAddress(data.address);
            setCity(data.city);
            setState(data.state);
            setPostalcode(data.postalCode);
            setLat(data.lat);
            setLng(data.long);

            onAddressSelected(data.address, data.city, data.state, data.postalCode, data.lat, data.long);
        }}
        onChange={(address) => {
            setAddress(address);
        }}
        ></AutoCompleteDialog>

        <Grid container spacing={1} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
            <Box>

              <TextField
                  id="outlined-basic"
                  label="City"
                  name="city"
                  variant="outlined"
                  fullWidth={true}
                  value={city}
                  onChange={(val) => {
                  setCity(val.currentTarget.value);
                  }}
              />
            
            </Box>
        </Grid>

        <Grid item xs={6}>
            <Box>

              <TextField
                  id="outlined-basic"
                  label="State"
                  name="state"
                  variant="outlined"
                  fullWidth={true}
                  value={state}
                  onChange={(val) => {
                  setState(val.currentTarget.value);
                  }}
              />
            
            </Box>
        </Grid>
        </Grid>

        <Box sx={{ marginTop: 2 }}>

            <TextField
                id="outlined-basic"
                label="Postal code"
                name="postalCode"
                variant="outlined"
                fullWidth={true}
                value={zip}
                onChange={(val) => {
                    setPostalcode(val.currentTarget.value);
                }}
            />
        
        </Box>

        {/* <Box sx={{ marginTop: 1, textAlign: "right" }}>
        <Button
            variant="contained"
            onClick={() => {
            if (lat == null || lng == null) {
                let addressInfo =
                address + " " + city + " " + state + " " + zip;
                getGeocode({ address: addressInfo }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setLat(lat);
                setLng(lng);
                });
            }
            
            onSave(address, city, state, zip, lat, lng);
            }}>
            {createButtonText}
        </Button>
        </Box> */}
    </Box>
    </>
  );
}
