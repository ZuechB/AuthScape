import React, {useEffect, useState, useRef, useMemo } from 'react';
import { Box } from '@mui/system';
import { apiService } from 'authscape';
import ReactCrop from 'react-image-crop'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Grid from '@mui/material/Grid';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import FilterBAndWRoundedIcon from '@mui/icons-material/FilterBAndWRounded';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import LensBlurRoundedIcon from '@mui/icons-material/LensBlurRounded';
import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

// remove when publishing
// import {Dropzone} from './dropzone';
// import { useDebounceEffect } from './useDebounceEffect';
// import { canvasPreview } from './canvasPreview';
// import {SliderEditor} from './sliderEditor';

export function PhotoEditor({isOpen, photoUrls = [], rowData = null, onCancelEditor = null, onPhotoUpdated = null, onPhotoDelete = null}) {

    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const hiddenAnchorRef = useRef(null);
    const blobUrlRef = useRef('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(undefined);
    const [photoDimensions, setPhotoDimensions] = useState(null);

    const [imageUrls, setImageUrls] = useState(photoUrls);
    
    const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls.length > 0 ? 
      {
        url: imageUrls[0].url,
        id: imageUrls[0].id,
      } : null);

    const [hasFiltersReset, setHasFiltersReset] = useState(true);

    const DEFAULT_OPTIONS = [
      {
        name: 'Brightness',
        icon: <BrightnessHighRoundedIcon />,
        property: 'brightness',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
      },
      {
        name: 'Contrast',
        icon: <ContrastRoundedIcon />,
        property: 'contrast',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
      },
      {
        name: 'Saturation',
        icon: <WaterDropRoundedIcon />,
        property: 'saturate',
        value: 100,
        range: {
          min: 0,
          max: 200
        },
        unit: '%'
      },
      {
        name: 'Grayscale',
        icon: <FilterBAndWRoundedIcon />,
        property: 'grayscale',
        value: 0,
        range: {
          min: 0,
          max: 100
        },
        unit: '%'
      },
      {
        name: 'Sepia',
        icon: <DonutSmallRoundedIcon />,
        property: 'sepia',
        value: 0,
        range: {
          min: 0,
          max: 100
        },
        unit: '%'
      },
      {
        name: 'Hue Rotate',
        icon: <InvertColorsRoundedIcon />,
        property: 'hue-rotate',
        value: 0,
        range: {
          min: 0,
          max: 360
        },
        unit: 'deg'
      },
      {
        name: 'Blur',
        icon: <LensBlurRoundedIcon />,
        property: 'blur',
        value: 0,
        range: {
          min: 0,
          max: 20
        },
        unit: 'px'
      }
    ]

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex]

    useEffect(() => {

      if (!isOpen)
      {
        // reset the filters
        setOptions(DEFAULT_OPTIONS);

        setSelectedImageUrl(photoUrls.length > 0 ? 
          {
            url: photoUrls[0].url,
            id: photoUrls[0].id
          } : null);
      }
      else
      {
        setImageUrls(photoUrls);

        setSelectedImageUrl(photoUrls.length > 0 ? 
          {
            url: photoUrls[0].url,
            id: photoUrls[0].id
          } : null);
      }

    }, [isOpen])

    function handleSliderChange({ target }) {
      setOptions(prevOptions => {
        return prevOptions.map((option, index) => {
          if (index !== selectedOptionIndex) return option
          return { ...option, value: target.value }
        })
      });

      setHasFiltersReset(false);
    }
  
    const getImageStyle = useMemo (function getImageStyle() {
      const filters = options.map(option => {
        return `${option.property}(${option.value}${option.unit})`
      })
  
      return { filter: filters.join(' ') }
    }, [options])

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop,
              scale,
              rotate,
            )
          }
        },
        100,
        [completedCrop, scale, rotate],
    )

    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect,
      ) {
        return centerCrop(
          makeAspectCrop(
            {
              unit: '%',
              width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
          ),
          mediaWidth,
          mediaHeight,
        )
    }

    function handleToggleAspectClick() {
        if (aspect) {
          setAspect(undefined)
        } else {
          setAspect(16 / 9)
    
          if (imgRef.current) {
            const { width, height } = imgRef.current
            const newCrop = centerAspectCrop(width, height, 16 / 9)
            setCrop(newCrop)
            // Updates the preview
            setCompletedCrop(convertToPixelCrop(newCrop, width, height))
          }
        }
    }

    async function onDownloadCropClick() {
        
      // const canvas = document.getElementById('myCanvas'); // Get the canvas element
      previewCanvasRef.current.toBlob(function(blob) {
        
        const data = new FormData();
        data.append("file", blob, "updatedphoto.jpg");

        apiService().post("/AuthScapeSpreadSheet/UploadPhoto", data);


      }, 'image/jpeg', 0.95); // Specify the image format and quality
      
      const image = imgRef.current
      image.crossOrigin = 'anonymous';


      const previewCanvas = previewCanvasRef.current
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error('Crop canvas does not exist')
      }
  
      // This will size relative to the uploaded image
      // size. If you want to size according to what they
      // are looking at on screen, remove scaleX + scaleY
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
  
      const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
      )
      const ctx = offscreen.getContext('2d')
      if (!ctx) {
        throw new Error('No 2d context')
      }
  
      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height,
      )


      // You might want { type: "image/jpeg", quality: <0 to 1> } to
      // reduce image size
      const blob = await offscreen.convertToBlob({
        type: 'image/png',
      })
  
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
  
      if (hiddenAnchorRef.current) {
        hiddenAnchorRef.current.href = blobUrlRef.current
        hiddenAnchorRef.current.click()
      }
    }

    function onImageLoad(e) {
      if (aspect) {
        const { width, height } = e.currentTarget
        setCrop(width, height, aspect)
      }

      // send the dimentions
      setPhotoDimensions({
        height : e.currentTarget.naturalHeight,
        width : e.currentTarget.naturalWidth
      });

    }


    async function urlToBlob(url) {
      // Fetch the resource from the URL
      const response = await fetch(url);
      // Convert the response to a Blob
      const blob = await response.blob();
      return blob;
    }



    return (
        <Dialog
            open={isOpen}
            maxWidth={"md"}
            onMouseDown={e => e.stopPropagation()}
            fullWidth={true}
            onClose={() => {
                if (onCancelEditor != null)
                {
                  onCancelEditor();
                }
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            {"Upload Photo"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => {
                if (onCancelEditor != null)
                {
                  onCancelEditor();
                }
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description"> */}

                {(selectedImageUrl != null && imageUrls != [] && imageUrls != null) &&
                <Box>

                  <Grid container spacing={0}>
                    <Grid item xs={4}>

                    <List className='sidebar' sx={{paddingTop:2}}>
                      {/* <ListItem disablePadding>
                        <ListItemButton onClick={handleToggleAspectClick}>
                          <ListItemIcon>
                            <InboxRounded />
                          </ListItemIcon>
                          <ListItemText primary={aspect ? "Disable Aspect Mode" : "Enable Aspect Mode"} />
                        </ListItemButton>
                      </ListItem> */}
                      <ListItem disablePadding onClick={async () => {

                        // await apiService().DownloadFile("/AuthScapeSpreadSheet/RemoveBackground", "", (blob) => {

                        //   imgRef.current.src = URL.createObjectURL(blob);;

                        // }, "post", { Url: imageUrls}, "image/png", true);

                        const canvas = document.createElement('canvas');
                        canvas.width = photoDimensions.width;
                        canvas.height = photoDimensions.height;

                        const ctx = canvas.getContext('2d');
                        
                        // Apply filters to the canvas
                        ctx.filter = getImageStyle.filter;

                        // Draw the image onto the canvas
                        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

                        canvas.toBlob(function(blob) {



                          const data = new FormData();
                          data.append("file", blob, "updatedphoto.jpg");

                          apiService().DownloadFile("/AuthScapeSpreadSheet/RemoveBackground", "", (blob) => {

                            imgRef.current.src = URL.createObjectURL(blob);

                            setHasFiltersReset(false);

                          }, "post", data, "image/png", true);
                  

                        }, 'image/png'); // Specify the image format and quality



                      }}>
                        <ListItemButton>
                          <ListItemIcon>
                            <WallpaperRoundedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Remove Background" />
                        </ListItemButton>
                      </ListItem>

                      <Divider sx={{marginTop:2, marginBottom: 2}} />

                      {options.map((option, index) => {
                        return (
                          <ListItem disablePadding key={index} sx={{ backgroundColor: index === selectedOptionIndex ? "lightgray" : "white"}} active={index === selectedOptionIndex} onClick={() => setSelectedOptionIndex(index)}>
                            <ListItemButton >
                              <ListItemIcon>
                                {option.icon}
                              </ListItemIcon>
                              <ListItemText primary={option.name} />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </List>

                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{textAlign:"center"}}>
                          {(selectedImageUrl != null) &&
                          <>
                              <ReactCrop crop={crop} onChange={c => setCrop(c)} disabled={false} circularCrop={false} aspect={aspect} minHeight={100} onComplete={(c) => setCompletedCrop(c)}>
                                  <img ref={imgRef} crossOrigin="anonymous" src={selectedImageUrl.url} className="main-image" style={{...getImageStyle, objectFit:"contain", width:400, height:400, transform: `scale(${scale}) rotate(${rotate}deg)` }} onLoad={onImageLoad} />
                              </ReactCrop>
                          </>
                          }

                        <Box sx={{paddingTop:2}}>
                          {photoDimensions != null &&
                            <Box sx={{textAlign:"center"}}>
                              Photo Dimensions: {photoDimensions.width} X {photoDimensions.height}
                            </Box>
                          }
                        </Box>

                      </Box>
                    </Grid>


                    <Grid item xs={2} sx={{borderLeft:"1px solid lightgray;", paddingLeft:1}}>

                    {(imageUrls.length > 0) &&
                      <Box>
                        <Stack direction={"column"} spacing={2} sx={{height:500, overflowY:"auto"}}>
                          <Box>
                            <Box sx={{width:100, height:100, backgroundColor:"red"}}>
                              <Dropzone text="Upload Photo" multiple={false} styleOverride={{
                                paddingTop:30, paddingBottom: 0, height:100
                              }} onDrop={async (file) => {

                                let fileUrl = URL.createObjectURL(file);

                                // send notification, return back the new URL from the developers side
                                let response = await onPhotoUpdated({
                                  url: fileUrl,
                                  id: null,
                                  rowData: rowData,
                                  status: "new"
                                });




                                // if (response == null)
                                // {
                                //   fileUrl = URL.createObjectURL(file);
                                // }

                                if (response != null)
                                {
                                  let copyPaths = [...imageUrls];
                                  
                                  copyPaths.push({
                                    id: response.id,
                                    url: response.url
                                  });

                                  setImageUrls(copyPaths);
                                }


                                }} />
                            </Box>
                          </Box>

                          {imageUrls.map((item, index) => {

                                return (
                                  <Box key={index} sx={{position:"relative"}} onClick={() => {
                                    
                                    setSelectedImageUrl({
                                      url: item.url,
                                      id: item.id
                                    });

                                    // reset the filters
                                    setOptions(DEFAULT_OPTIONS);
                                    setHasFiltersReset(true);

                                  }}>

                                    <IconButton aria-label="delete" size="large" sx={{position:"absolute", right: -10, top: 25}} onClick={(event) => {

                                      event.stopPropagation();

                                      if (onPhotoDelete != null)
                                      {
                                        onPhotoDelete(item);
                                      }


                                      let copyPaths = [...imageUrls];
                                      
                                      let updatedList = copyPaths.filter(item2 => item2.id !== item.id);

                                      setImageUrls(updatedList);



                                      // onCancelEditor();

                                    }}>
                                      <DeleteIcon fontSize="inherit" />
                                    </IconButton>

                                    <img
                                      srcSet={`${item.url}`}
                                      src={`${item.url}`}
                                      loading="lazy"
                                      style={{cursor:"pointer", width:100, height:100, objectFit:"contain"}}
                                    />


                                  </Box>
                                )

                          })}
                        </Stack>
                      </Box>
                    }

                    </Grid>

                  </Grid>
                  <Box>
                    Adjusting your filter
                  </Box>
                  <Box sx={{paddingBottom:2}}>
                    <SliderEditor 
                      min={selectedOption.range.min}
                      max={selectedOption.range.max}
                      value={selectedOption.value}
                      handleChange={handleSliderChange}
                    />
                  </Box>


                  

                </Box>                  
                }

                {(selectedImageUrl == null) &&
                  <Box>

                   <Dropzone text="Drag 'n' drop your photo or click to select photo" multiple={false} onDrop={async (file) => {

                      let url = URL.createObjectURL(file);

                      // send notification, return back the new URL from the developers side
                      let response = await onPhotoUpdated({
                        url: url,
                        id: null,
                        rowData: rowData,
                        status: "new"
                      });

                      if (onCancelEditor != null)
                      {
                        onCancelEditor();
                      }

                   }} />
                  </Box>
                }

                


              {/* </DialogContentText> */}
            </DialogContent>


            {hasFiltersReset &&
              <DialogActions>

              {(selectedImageUrl != null) &&
              <>
                <Box sx={{flexGrow: 1}}>
                  <Button startIcon={<DownloadRoundedIcon/>} variant="text" sx={{paddingLeft:2}} onClick={() => {

                    const canvas = document.createElement('canvas');

                    // hard set width and height
                    // canvas.width = width; // Set the width of the canvas
                    // canvas.height = height; // Set the height of the canvas

                    canvas.width = photoDimensions.width;
                    canvas.height = photoDimensions.height;

                    const ctx = canvas.getContext('2d');
                    
                    // Apply filters to the canvas
                    ctx.filter = getImageStyle.filter;

                    // Draw the image onto the canvas
                    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

                    var dataURL = canvas.toDataURL('image/png');

                    // Create a link element to trigger the download
                    var link = document.createElement('a');
                    link.download = "photo.png";
                    link.href = dataURL;

                    // Append the link to the body and trigger the download
                    document.body.appendChild(link);
                    link.click();

                    // Remove the link from the body after download
                    document.body.removeChild(link);

                  }}>Download Photo</Button>
                </Box>

                <Box>
                  <Button onClick={() => {
                      if (onCancelEditor != null)
                      {
                        onCancelEditor();
                      }
                  }}>Close</Button>
                  {/* <Button  onClick={() => {


                    imageUrls.forEach(async (i) => {

                      let blob = await urlToBlob(i.url);
                      

                      onPhotoUpdated({
                        url: i.url,
                        id: i.id
                      });


                    });



                    // const canvas = document.createElement('canvas');

                    // canvas.width = photoDimensions.width;
                    // canvas.height = photoDimensions.height;

                    // const ctx = canvas.getContext('2d');
                    
                    // // Apply filters to the canvas
                    // ctx.filter = getImageStyle.filter;

                    // // Draw the image onto the canvas
                    // ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

                    // canvas.toBlob(function(blob) {

                    //   onPhotoUpdated(blob);
              
                    // }, 'image/png'); // Specify the image format and quality









                  }} autoFocus>
                      Upload
                  </Button> */}
                </Box>
              </>
              }
              
              </DialogActions>
            }

            {!hasFiltersReset &&
              <DialogActions sx={{backgroundColor:"lightgray"}}>

                {(selectedImageUrl != null) &&
                <>
                  <Box sx={{flexGrow: 1}}>
                    <Button startIcon={<DownloadRoundedIcon/>} variant="text" sx={{paddingLeft:2}} onClick={() => {

                      const canvas = document.createElement('canvas');

                      // hard set width and height
                      // canvas.width = width; // Set the width of the canvas
                      // canvas.height = height; // Set the height of the canvas

                      canvas.width = photoDimensions.width;
                      canvas.height = photoDimensions.height;

                      const ctx = canvas.getContext('2d');
                      
                      // Apply filters to the canvas
                      ctx.filter = getImageStyle.filter;

                      // Draw the image onto the canvas
                      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

                      var dataURL = canvas.toDataURL('image/png');

                      // Create a link element to trigger the download
                      var link = document.createElement('a');
                      link.download = "photo.png";
                      link.href = dataURL;

                      // Append the link to the body and trigger the download
                      document.body.appendChild(link);
                      link.click();

                      // Remove the link from the body after download
                      document.body.removeChild(link);

                    }}>Download Photo</Button>
                  </Box>

                  <Box>
                    <Button onClick={() => {
                        
                        // reset the filters
                        setOptions(DEFAULT_OPTIONS);
                        setHasFiltersReset(true);

                    }}>Cancel</Button>
                    <Button variant="contained" onClick={() => {

                      // need to know which photo position this is so we can update it....

                      const canvas = document.createElement('canvas');
                      // canvas.width = width; // Set the width of the canvas
                      // canvas.height = height; // Set the height of the canvas

                      canvas.width = photoDimensions.width;
                      canvas.height = photoDimensions.height;

                      const ctx = canvas.getContext('2d');
                      
                      // Apply filters to the canvas
                      ctx.filter = getImageStyle.filter;

                      // Draw the image onto the canvas
                      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

                      canvas.toBlob(function(blob) {

                        let newArrayList = [...imageUrls];
                        
                        newArrayList.find(a => a.id == selectedImageUrl.id).url = URL.createObjectURL(blob);

                        setImageUrls(newArrayList);

                        setOptions(DEFAULT_OPTIONS);
                        setHasFiltersReset(true);

                        setSelectedImageUrl({
                          url: newArrayList.find(a => a.id == selectedImageUrl.id).url,
                          id: newArrayList.find(a => a.id == selectedImageUrl.id).id
                        });

                        // send to the front end
                        onPhotoUpdated({
                          url: newArrayList.find(a => a.id == selectedImageUrl.id).url,
                          id: newArrayList.find(a => a.id == selectedImageUrl.id).id,
                          status: "modified"
                        });
                
                      }, 'image/png'); // Specify the image format and quality

                    }} autoFocus>
                        Accept Changes
                    </Button>
                  </Box>
                </>
                }
                
              </DialogActions>
            }


        </Dialog>
    )
}