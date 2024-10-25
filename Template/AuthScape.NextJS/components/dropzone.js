import Box from '@mui/material/Box';
import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import Script from 'next/script';

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

const handleFilePick = () => {
    const odOptions = {
      clientId: 'clientId',
      action: 'share',
      multiSelect: false,
      advanced: {
        redirectUri: 'http://localhost:3000/fileUploading',
      },
      success: (files) => {
        console.log('Files picked:', files);
      },
      cancel: () => {
        console.log('File picking cancelled');
      },
      error: (error) => {
        console.error('Error picking file:', error);
      },
    };
    OneDrive.open(odOptions);
};



export const Dropzone = ({text = "Drag 'n' drop some files here, or click to select files", image = null, styleOverride = null, onDrop = null, maxFiles = 1, multiple = false, accept = {
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
    <>
        <Script crossorigin src="https://js.live.net/v7.2/OneDrive.js" />
        <Box className="container" sx={{cursor:"pointer"}}>
            
            <Box onClick={() => {
                handleFilePick();
            }}>
                OneDrive
            </Box>

            <Box {...getRootProps({style})}>
                <input {...getInputProps()} />
                <Box sx={{paddingBottom:1}}>
                {image != null &&
                    <img src={image} width={200} height={200} style={{objectFit: "contain"}} />
                }
                </Box>
                <Box>{text}</Box>
            </Box>
        </Box>
    </>
  );
}