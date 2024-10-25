import React, { useState, useRef, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const FileUploader = ({
  url,
  params,
  multiple = false,
  fileLoaderUri = null,
  children,
  isHidden = false,
  refOveride = null,
  primaryColor = "#000",
  onConfirmDelete = null,
  accept = "",
  variant = "filemanager", // custom vs filemanager
  onUploadCompleted = null
}) => {
  // Declare a new state variable, which we'll call "count"
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(0);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [viewDeleteDialog, setViewDeleteDialog] = useState(false);

  const [filesUploaded, setFilesUploaded] = useState([]);

  const [orderFileId, setOrderFileId] = useState(null);

  const [filesDownloadable, setFilesDownloadable] = useState(null);

  const [parameters, setParameters] = useState([]);

  const fileUploader = useRef();

  const handleUpload = async (event) => {
    let selectedFiles = event.target.files;

    setLoaded(0);
    setMessage(event.target.files[0] ? event.target.files[0].name : "");

    if (uploading) return;
    if (!selectedFiles) {
      setMessage("Select a file first");
      return;
    }

    setUploading(true);

    let fileCount = selectedFiles.length;
    let fileIndex = 1;

    let responses = [];

    for (
      let selectedIndex = 0;
      selectedIndex < selectedFiles.length;
      selectedIndex++
    ) {
      const selectedFile = selectedFiles[selectedIndex];

      const data = new FormData();
      data.append("file", selectedFile, selectedFile.name);

      for (let index = 0; index < parameters.length; index++) {
        const element = parameters[index];
        data.append(element.key, element.value);
      }


      let response = null;
      try {
        response = await apiService().post(url, data, {
          onUploadProgress: (ProgressEvent) => {
            let loadedTotal = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );
            let percent = (fileIndex / fileCount) * 100;
            setLoaded(percent);

            if (percent == 100) {
              setTimeout(() => {
                setLoaded(0);
                setMessage("");
                reloadFiles();
              }, 2000);
            }
          },
        });
      } catch (err) {
        setUploading(false);
        setMessage("Failed to upload");
      }

      responses.push(response);

      fileIndex++;
    }

    if (onUploadCompleted != null)
    {
      onUploadCompleted(responses);
    }

    setUploading(false);
    setMessage("Uploaded successfully");
  };

  const handleUploadFileInput = () => {
    fileUploader.current.click();
  };

  useEffect(() => {
    if (params != null) {
      const propertyNames = Object.keys(params);
      const propertyValues = Object.values(params);

      let array = [];

      for (let index = 0; index < propertyNames.length; index++) {
        if (propertyNames[index] != null && propertyValues[index] != null)
        {
          array.push({
            key: propertyNames[index],
            value: propertyValues[index],
          });
        }
      }

      setParameters(array);
    }
  }, [params]);

  const reloadFiles = async () => {
    let response = await apiService().get(fileLoaderUri);
    if (response != null && response.status == 200) {
      setFilesDownloadable(response.data);
    }
  };

  useEffect(() => {
    if (fileLoaderUri != null) {
      const fetchAsync = async () => {
        await reloadFiles();
      };
      fetchAsync();
    }
  }, [fileLoaderUri]);

  return (
    <Box sx={{ display: isHidden ? "none" : "block" }}>
      
        <input
            className="inputfile"
            id="file"
            type="file"
            name="file"
            multiple={multiple}
            accept={accept}
            ref={fileUploader}
            onChange={handleUpload}
            style={{ display: "none" }}
        />

        {variant == "custom" &&
        <Box ref={refOveride} onClick={() => {
            handleUploadFileInput();
        }}>
            {children}
        </Box>
        }

        {variant == "filemanager" &&
        <Grid container spacing={2}>
            <Grid ref={refOveride} item xs={12} onClick={handleUploadFileInput}>
              <Grid
                  container
                  sx={{
                  padding: 2,
                  backgroundColor: "#ECEDED",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  border: "1px dashed #C8D4D5",
                  }}
              >
                  <Grid item xs={2}>
                  <Box>
                      <FileCopyRoundedIcon
                      sx={{ fill: "#C8D4D5", width: 50, height: 50 }}
                      />
                  </Box>
                  </Grid>
                  <Grid item xs={10}>
                  <Box>Drag and drop files here or</Box>
                  <Box sx={{ marginTop: 1 }}>
                      <Stack direction="row" spacing={2}>
                      <UploadRoundedIcon
                          sx={{ fill: primaryColor, width: 30, height: 30 }}
                      />
                      <Typography
                          variant="h3"
                          component={"span"}
                          sx={{ color: primaryColor, paddingTop: 0.6 }}
                      >
                          Upload
                      </Typography>
                      </Stack>
                  </Box>
                  </Grid>
                  <Grid item xs={12}>
                  {loaded > 0 && (
                      <LinearProgress
                      variant="buffer"
                      value={loaded}
                      sx={{ marginTop: 2 }}
                      />
                  )}

                  {loaded == 100 && (
                      <Typography
                      variant="h3"
                      component={"span"}
                      sx={{ color: primaryColor, paddingTop: 0.6 }}>
                      Completed
                      </Typography>
                  )}
                  </Grid>
              </Grid>
            </Grid>

            {children}

            <Grid container sx={{ paddingTop: 1 }}>
            {filesDownloadable != null &&
                filesDownloadable.map((fileUpload, idx) => {
                return (
                    <Grid
                    key={"fileDownloadable-" + idx}
                    item
                    xs={8}
                    sm={8}
                    md={5}
                    lg={3}
                    sx={{
                        marginLeft: 2,
                        padding: 1,
                        marginTop: 1,
                        backgroundColor: "#ECEDED",
                        position: "relative",
                        fontSize: "14px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        border: "1px solid #54C7DD",
                    }}
                    onClick={async () => {
                        window.open(fileUpload.uri);
                    }}
                    >
                    <Tooltip placement="left" arrow title={fileUpload.name}>
                        <Stack    
                        direction="row"
                        spacing={1}
                        display="flex"
                        justifyContent={"space-between"}
                        >
                        <Box display={"flex"} alignItems="center">
                            <FileDownloadOutlinedIcon sx={{ fill: "#92D6E3" }} />
                            <Box
                            sx={{
                                paddingTop: 0.6,
                                marginLeft: "5px",
                            }}
                            >
                            <Typography
                                sx={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width:"350px"
                                }}
                            >
                                {fileUpload.name}
                            </Typography>
                            </Box>

                            <IconButton
                            aria-label="delete"
                            sx={{ position: "absolute", right: "0" }}
                            onClick={(evt) => {
                                evt.stopPropagation();
                                setOrderFileId(fileUpload.id);
                                setViewDeleteDialog(true);
                            }}
                            >
                            <DeleteIcon />
                            </IconButton>
                        </Box>
                        </Stack>
                    </Tooltip>
                    </Grid>
                );
                })}
            </Grid>
        </Grid>
        }

      <Dialog
        open={viewDeleteDialog}
        fullWidth={true}
        maxWidth={"xs"}
        onClose={() => {
          setViewDeleteDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>Remove File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setViewDeleteDialog(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={async () => {

              if (onConfirmDelete != null)
              {
                onConfirmDelete();
              }
              
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

        <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={uploading}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </Box>
  );
}