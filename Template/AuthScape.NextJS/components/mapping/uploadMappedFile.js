import React, {useEffect, useState, useRef} from 'react';
// import { apiService, FileUploader} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function UploadMappedFile({loadedUser, url = null, companyId = null, locationId = null, userId = null}) {

    const [documentComponentOptions, setDocumentComponentOptions] = useState(null);

    const [selectedDocumentComponentId, setSelectedDocumentComponentId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };
   
    const fileUploaderRef = useRef(null);


    useEffect(() => {
        if (selectedDocumentComponentId != null)
        {

            // trigger the file uploader, make sure param is filled in
            fileUploaderRef.current.click();

        }
    }, [selectedDocumentComponentId])

    useEffect(() => {

        if (loadedUser)
        {
            const fetchData = async () => {

                let _params = {};

                if (companyId != null)
                {
                    _params.companyId = companyId;
                }

                if (userId != null)
                {
                    _params.userId = userId;
                }

                if (locationId != null)
                {
                    _params.locationId = locationId;
                }

                let response = await apiService().post("/DocumentMapping/GetDocumentComponents", _params);
                if (response != null && response.status == 200)
                {
                    setDocumentComponentOptions(response.data.data);
                }
            }
            fetchData();
        }

    }, [loadedUser])

    return (
        <Box>

            <FileUploader refOveride={fileUploaderRef} params={{

                    documentComponentId: selectedDocumentComponentId,
                    companyId: companyId,
                    locationId: locationId,
                    userId: userId
                            
                }} url={url} multiple={false} variant='custom' onUploadCompleted={() => {

                    setSelectedDocumentComponentId(null); // we need an onUploadCancelled
                    
                }}>

            </FileUploader>

            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={<PublishRoundedIcon />}
                sx={{marginLeft:1}} 
                onClick={(event) => {
                setAnchorEl(event.currentTarget);
                }}>
                Upload File(s)
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}>
                    {documentComponentOptions != null && documentComponentOptions.map((documentComponent) => {

                        return (
                            <MenuItem onClick={() => {

                                // assigns the param document component id
                                setSelectedDocumentComponentId(documentComponent.id);

                                // close the menu
                                handleClose();
                            
                            }}>{documentComponent.name + " (" + documentComponent.documentTypeName + ")"}</MenuItem>
                        )
                    })}
            </Menu>

        </Box>
    )
}
