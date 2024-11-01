import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid2';
// import { RichTextEditor } from "./RichTextEditor";

export const findTheValue = (fieldObject, field) => {

    let result = "";
    if (fieldObject != null)
    {
      Object.getOwnPropertyNames(fieldObject).forEach(element => {

        if (field.toLowerCase() == element.toLowerCase())
        {
          result = fieldObject[element];
        }

      });
    }

    return result;
}

const findCustomFieldValue = (fieldObject, field) => {

    let result = null;
    if (fieldObject != null && fieldObject.customFields)
    {
        fieldObject.customFields.forEach(userCustomField => {

            if (field.toLowerCase() == userCustomField.name.toLowerCase())
            {
              if (userCustomField.customFieldType == 5)
              {
                result = (userCustomField.value === "true")
              }
              else
              {
                result = userCustomField.value;
              }
            }
            
        });
    }

    return result;
}

export const renderCustomField = (identifier, fieldObject, control, errors, register, setValue, customFields) => {

  return (
      <>
      {(identifier != -1 ? fieldObject != null : true) && customFields.map((field) => {

          let result = findCustomFieldValue(fieldObject, field.name);

          return (
            <Grid size={field.size != null ? field.size : 12}>
              {/* {JSON.stringify(field)} */}
              <Controller
                name={field.customFieldId}
                control={control}
                defaultValue={result}
                // defaultChecked={result}
                rules={{ required: field.isRequired }}
                render={({ field: { onChange, value } }) => (
                  <>
                    {(field.customFieldType === 1) && (
                      <TextField
                        label={field.name}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register(field.customFieldId, { required: field.isRequired })}
                        onChange={onChange}
                        value={value || ''}
                      />
                    )}
                    {(field.customFieldType == 2) && (
                      <Box sx={{height:10}}>
                        




                        {/* <div>
                          <label htmlFor="editor1">Editor 1</label>
                          <RichTextEditor name="editor1" setValue={setValue} />
                          <textarea
                              {...register("editor1")}
                              style={{ display: "none" }} // Hide the textarea
                          />
                        </div>              */}




                        {/* <RichTextEditor height={200} html={value} onSave={(html) => {
                          onChange(html);
                        }} /> */}
                      </Box>

                      // <TextField
                      //   label={field.name}
                      //   variant="outlined"
                      //   margin="normal"
                      //   fullWidth
                      //   {...register(field.customFieldId, { required: field.isRequired })}
                      //   onChange={onChange}
                      //   value={value || ''}
                      // />
                    )}
                    {field.customFieldType === 5 && (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={value || false}
                            {...register(field.customFieldId, { required: field.isRequired })}
                            onChange={onChange}
                          />
                        }
                        label={field.name}
                      />
                    )}
                  </>
                )}
              />
              {errors[field.customFieldId] && (
                <Typography color="red">{field.name} is required.</Typography>
              )}
            </Grid>
          )

      })}
      </>
  )
}


export const renderSystemField = (identifier, fieldObject, control, errors, register, customFields) => {

  return (
      <>
      {(identifier != -1 ? fieldObject != null : true) && customFields.map((field) => {

          let result = findTheValue(fieldObject, field);

          let isRequied = true;
          if (field == "PhoneNumber")
          {
            isRequied = false;
          }

          return (
          <Box>

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
                        required: isRequied,
                    }}
                    render={({renderField}) => 
                    <TextField
                        label={field}
                        variant="outlined"
                        defaultValue={result}
                        margin="normal"
                        fullWidth
                        {...register(field, { required: isRequied })}
                        {...renderField}
                    />
                    }
                />
                {errors[field] && <Typography color={"red"}>{field} is required.</Typography>}
            </Box>
            }
          </Box>
          )

      })}
      </>
  )
}