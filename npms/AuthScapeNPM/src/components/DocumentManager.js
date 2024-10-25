import { AppBar, Box, Button, Toolbar, Typography, Grid, Paper } from '@mui/material';
import React, {useEffect, useState, useRef} from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Tooltip from '@mui/material/Tooltip';

// remove before merging back
// import { FileUploader, apiService, NextImage } from 'authscape';

export const DocumentManager = ({loadedUser, setIsLoading, viewDocumentType = 1, disablePreview = false, openToFolderId = null, xs=12, sm=6, md=4, lg=2, overrideLockMessage = "The directory cannot be removed.", zeroStateView = null, fieldId1 = null, fieldId2 = null, fieldId3 = null}) => {

    const fileUploaderRef = useRef();
    const [files, setFiles] = useState(null);
    const [update, setUpdate] = useState(false);
    const [folderParent, setFolderParent] = useState(null);
    const [masterFolder, setMasterFolder] = useState(null);
    const [breadCrumb, setBreadCrumb] = useState([]);

    const [uploadParentId, setUploadParentId] = useState(null);

    const [contextMenu, setContextMenu] = useState(null);
    const [contextFile, setContextFile] = useState(null);

    const [dialogDelete, setDialogDelete] = useState(false);
  
    const handleContextMenu = (event, file) => {
      event.preventDefault();

      setContextFile(file);

      if (!file.isLocked)
      {
        setContextMenu(
          contextMenu === null
            ? {
                mouseX: event.clientX + 2,
                mouseY: event.clientY - 6,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null,
        );
      }

    };

    useEffect(() => {

      if (loadedUser)
      {
        const fetchDocuments = async () => {

          let folderId = null;
          if (folderParent == null && openToFolderId != null)
          {
            folderId = openToFolderId;
            // should get the current document...

            let folderResponse = await apiService().get("/Document/GetDocumentByFolderId?folderId=" + folderId);
            if (folderResponse != null && folderResponse.status == 200)
            {
                setFolderParent(folderResponse.data);
                setMasterFolder(folderResponse.data);
                folderId = folderResponse.id;
            }
          }
          else if (folderParent != null)
          {
            folderId = folderParent.id;
          }


          setUploadParentId(folderId);


          let params = "";
          if (fieldId1 != null)
          {
            params = "&fieldId1=" + fieldId1;
          }

          if (fieldId2 != null)
          {
            params = "&fieldId2=" + fieldId2;
          }

          if (fieldId3 != null)
          {
            params = "&fieldId3=" + fieldId3;
          }

        
          if (folderId != null)
          {
            let response = await apiService().get("/Document/GetDocumentsAndFiles?parentFolderId=" + folderId + "&ViewDocumentType=" + viewDocumentType + params);
            if (response != null && response.status == 200)
            {
              // setTimeout(() => {
                setFiles(response.data);
              // }, 500);
            }
          }
          else
          {
            let response = await apiService().get("/Document/GetDocumentsAndFiles?ViewDocumentType=" + viewDocumentType + params);
            if (response != null && response.status == 200)
            {
              setFiles(response.data);  
            }
          }

        };
        fetchDocuments();
      }

    }, [loadedUser, folderParent, update])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      setContextMenu(null);
    };

    const StyledMenu = styled((props) => (
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
      />
    ))(({ theme }) => ({
      '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
          },
          '&:active': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    }));

    const handleFileClick = async (file, addToBread = true) => {
      
      if (file.type == "folder")
      {
        setFolderParent(file);

        if (addToBread)
        {
          let newBC = [...breadCrumb];
          newBC.push(file);
          setBreadCrumb(newBC);
        }
        else
        {
          let newList = [];
          let hasBeenFound = false;
          for (let index = 0; index < breadCrumb.length; index++) {
            
            const element = breadCrumb[index];
            if (element.id == file.id)
            {
              hasBeenFound = true;
              newList.push(element);
              break;
            }

            if (!hasBeenFound)
            {
                newList.push(element);
            }

          }

          setBreadCrumb(newList);
          
        }

      }
      else
      {
        setIsLoading(true);

        await apiService().DownloadFile("/Document/DownloadDocument?documentId=" + file.id + "&ViewDocumentType=" + viewDocumentType, file.name, () => {
          setIsLoading(false);
        });
        
      }
    }

    const dialogDeleteClosed = () => {
      setContextFile(null);
      setContextMenu(null);
      setDialogDelete(false);
    }

    return (
      <>
      <Box sx={{ flexGrow: 1 }}>

      {(files != null && files.documentSegments.length == 0 || folderParent != null) &&
        <AppBar position="static" color='inherit' elevation={0}>
          <Toolbar>


            <Box>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={async () => {

                  let newDocumentName = prompt("New folder name");
                  if (newDocumentName != null && newDocumentName != "")
                  {
                    let response = await apiService().post("/Document/CreateFolder", {
                      folderName:  newDocumentName,
                      parentFolderId: folderParent != null ? folderParent.id : null,
                      viewDocumentType: viewDocumentType
                    });

                    if (response != null && response.status == 200)
                    {
                      // refresh
                      setUpdate(!update);
                    }

                  }

                }}
                startIcon={<InsertDriveFileIcon />}>
                New Folder
              </Button>
            </Box>
          

            {(files != null && files.documentSegments.length == 0 || folderParent != null) &&
            <FileUploader refOveride={fileUploaderRef} url={"/Document/UploadFile"} params={{
                    
                    viewType : viewDocumentType,
                    parentFolderId: uploadParentId,
                  
                  }} multiple={true} variant='custom' onUploadCompleted={() => {
                        setUpdate(!update);
                        handleClose();
                      }}>

                  <Button
                    id="FileUploader"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    startIcon={<PublishRoundedIcon />}
                    sx={{marginLeft:1}}>
                    Upload File(s)
                  </Button>

            </FileUploader>
            }
          </Toolbar>
        </AppBar>
      }

        <Divider />

        <Breadcrumbs aria-label="breadcrumb" separator={">"} sx={{marginLeft:1, marginBottom:2, marginTop:2}}>
          <Link underline="hover" color="inherit" sx={{cursor:"pointer", fontWeight:"bold"}} onClick={() => {

            setFolderParent(null);
            setBreadCrumb([]);

          }}>
            {masterFolder == null && <>My Files</>}
            {masterFolder != null && <>{masterFolder.name}</>}
          </Link>
          {breadCrumb.map((bread, index) => {
            return (
              <Link
                key={index}
                underline="hover"
                sx={{cursor:"pointer"}}
                color="inherit" onClick={() => {
                  handleFileClick(bread, false);
                }}>
                {bread.name}
              </Link>
            )
          })}            
        </Breadcrumbs>
      </Box>

      <Box sx={{height: "85vh", width: '100%' }}>

        {files != null &&
        <>

        {masterFolder == null &&
        <>
            {(files.documentSegments.length > 0 && folderParent == null) && files.documentSegments.map((segment, index) => (
            
                <Box sx={{paddingTop:3}}>
                <Typography variant="h6" gutterBottom>
                    {segment.name}
                </Typography>


                <Grid container spacing={2}>
                    {files.documentAndFiles.filter(item => item.segmentId == segment.id).map((file, index) => (
                    
                    <Grid onContextMenu={(event) => {
                        handleContextMenu(event, file);
                    }} item key={index} xs={xs} sm={sm} md={md} lg={lg} onClick={() => handleFileClick(file)}>
                        <Paper
                        sx={{
                            padding: 2,
                            flexDirection: 'column',
                            height: "100%", display: "flex", alignItems: "center",
                            cursor: 'pointer',
                            maxHeight:300,
                            position:"relative",
                            '&:hover': {
                            backgroundColor: '#F5F5F5'
                            }
                        }}>

                            {file.type === 'folder'  && 
                            <Box sx={{position:"absolute", top:45, color:"white"}}>
                            {file.count}
                            </Box>}

                            {file.isLocked &&
                            <Box sx={{position:"absolute", top:10, right: 10, color:"black"}}>
                                <Tooltip title={overrideLockMessage}>
                                <LockRoundedIcon />
                                </Tooltip>
                            </Box>
                            }

                        {file.type === 'folder' ? (
                            <FolderIcon sx={{ fontSize: 80, color:"orange" }} />
                        ) : (

                            file.documentFileExtentionType == 0 || disablePreview ? <InsertDriveFileOutlinedIcon sx={{ fontSize: 60 }} /> : <NextImage src={file.uri} alt={"Image"} width={80} height={80} />
                            
                        )}
                        <Typography variant="subtitle1" sx={{paddingTop:1, fontSize:14}}>{file.name}</Typography>
                        <Typography variant="subtitle2" sx={{paddingTop:0, fontSize:11}}>{file.lastUpdated}</Typography>
                        </Paper>
                    </Grid>

                    ))}
                </Grid>

                {(files != null && 
                    files.documentAndFiles != null && 
                    zeroStateView != null) &&
                    
                    <Box>
                    {zeroStateView(segment, files.documentAndFiles)}
                    </Box>
                }

                </Box>

            ))}
        </>
        }
          
          {(files.documentSegments.length == 0 || folderParent != null) &&
          <>
            <Grid container spacing={2}>
              {files.documentAndFiles.map((file, index) => (
                
                <Grid onContextMenu={(event) => {
                  handleContextMenu(event, file);
                }} item key={index} xs={xs} sm={sm} md={md} lg={lg} onClick={() => handleFileClick(file)}>
                  <Paper
                    sx={{
                      padding: 2,
                      flexDirection: 'column',
                      height: "100%", display: "flex", alignItems: "center",
                      cursor: 'pointer',
                      maxHeight:300,
                      position:"relative",
                      '&:hover': {
                        backgroundColor: '#F5F5F5'
                      }
                    }}>

                      {file.type === 'folder'  && 
                      <Box sx={{position:"absolute", top:45, color:"white"}}>
                        {file.count}
                      </Box>}

                      {file.isLocked &&
                        <Box sx={{position:"absolute", top:10, right: 10, color:"black"}}>
                          <Tooltip title={overrideLockMessage}>
                            <LockRoundedIcon />
                          </Tooltip>
                        </Box>
                      }

                    {file.type === 'folder' ? (
                      <FolderIcon sx={{ fontSize: 80, color:"orange" }} />
                    ) : (

                        file.documentFileExtentionType == 0 || disablePreview ? <InsertDriveFileOutlinedIcon sx={{ fontSize: 60 }} /> : <NextImage src={file.uri} alt={"Image"} width={80} height={80} />
                      
                    )}
                    <Typography variant="subtitle1" sx={{paddingTop:1, fontSize:14}}>{file.name}</Typography>
                    <Typography variant="subtitle2" sx={{paddingTop:0, fontSize:11}}>{file.lastUpdated}</Typography>
                  </Paper>
                </Grid>

              ))}
            </Grid>
            

            {(files != null && files.documentAndFiles != null && zeroStateView != null) &&
              
              <Box>
                {zeroStateView()}
              </Box>
            }

          </>
          }

        </>
        }





        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }>
          {/* <MenuItem onClick={handleClose}>Move</MenuItem>
          <MenuItem onClick={handleClose}>Copy</MenuItem>
          <Divider /> */}
          <MenuItem startIcon={<DeleteRoundedIcon />} onClick={() => {
            
            setDialogDelete(true);
            handleClose();
            
          }}>Delete</MenuItem>
        </Menu>
      </Box>


      <Dialog
        open={dialogDelete}
        onClose={() => {
          dialogDeleteClosed();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Are you sure you wan to delete {contextFile != null ? contextFile.name : ""}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {(contextFile != null && contextFile.type != null && contextFile.type == 'folder') &&
              <>
                If you delete {contextFile != null ? contextFile.name : ""}, you will delete all files and folders within  {contextFile != null ? contextFile.name : ""}.
              </>
            }

            {(contextFile != null && contextFile.type != null && contextFile.type != 'folder') &&
              <>
                If you delete {contextFile != null ? contextFile.name : ""} this file will be gone forever.
              </>
            }
          
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {

            dialogDeleteClosed();

          }}>Cancel</Button>
          <Button onClick={async () => {
            dialogDeleteClosed();

            if (contextFile.type == "folder")
            {
              let response = await apiService().delete("/Document/DeleteFolder?documentId=" + contextFile.id);
              if (response != null && response.status == 200)
              {
                setUpdate(!update);
              }
            }
            else
            {
              let response = await apiService().delete("/Document/DeleteFile?documentId=" + contextFile.id);
              if (response != null && response.status == 200)
              {
                setUpdate(!update);
              }
            }

          }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );

};