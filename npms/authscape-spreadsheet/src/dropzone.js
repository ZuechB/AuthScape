import { Box } from '@mui/material';
import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

let baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  paddingTop: "50px",
  paddingBottom: "50px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const Dropzone = ({text = "Drag 'n' drop some files here, or click to select files", styleOverride = null, onDrop = null, maxFiles = 1, multiple = false, accept = {
  'image/*': []
}}) => {


  if (styleOverride != null)
  {
    let combined = { ...baseStyle, ...styleOverride } 
    baseStyle = combined;
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
        accept: accept,
        maxFiles: maxFiles,
        multiple: multiple,
        onDrop: files => {

          if (multiple)
          {
            onDrop(files);
          }
          else
          {
            onDrop(files[0]);
          }
          
        }
    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <Box className="container" sx={{cursor:"pointer"}}>
      <Box {...getRootProps({style})}>
        <input {...getInputProps()} />
        <Box>{text}</Box>
      </Box>
    </Box>
  );
}