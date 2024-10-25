import React, {useEffect, useRef, useState} from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import FmdBadRoundedIcon from '@mui/icons-material/FmdBadRounded';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
// import { apiService } from 'authscape';
import CircularProgress from '@mui/material/CircularProgress';
import { DialogContentText } from '@mui/material';

export function AddDomain({open, azureWebsite, azureTxtValue, handleClose}) {

    const steps = ['Enter a domain', 'Setup DNS Record', 'Go Live'];

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    // const [domain, setDomain] = useState(null);
    const [subDomains, setSubDomains] = useState(null);
    // const [topLevelDomains , setTopLevelDomains ] = useState(null);

    const [fullDomain, setFullDomain] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const refDomain = useRef(null);

    const refCNameTarget = useRef(null);
    const reftxtTarget = useRef(null);

    const refCNameName = useRef(null);
    const reftxtName = useRef(null);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    
    };

    const getSubdomain = (hostName) => {
        const host = hostName; // e.g., subdomain.example.com
        const parts = host.split('.');
        if (parts.length > 2) {
          return parts[0]; // This will be 'subdomain'
        }
        return null; // No subdomain found
    };

    const handleStep = (step) => () => {
    setActiveStep(step);
    };

    const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    }));

    const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    };

    const createTheDomainRequest = async () => {

        if (fullDomain == null || fullDomain == "")
        {
            return;
        }

        let response = await apiService().post("/PrivateLabel/GenerateDomain", {
            hostName: fullDomain
        });

        if (response != null && response.status == 200)
        {
            if (handleClose != null)
            {
                handleClose();
            }
        }
        else
        {
            let aStep = activeStep - 1;
            setActiveStep(aStep);
            setErrorMessage(response.data);
        }
    }


    useEffect(() => {

        if (activeStep == 2)
        {
            createTheDomainRequest();
        }

    }, [activeStep]);


    const copyToClipboard = async (text) => {
        try {
            const permissions = await navigator.permissions.query({name: "clipboard-write"})
            if (permissions.state === "granted" || permissions.state === "prompt") {
                await navigator.clipboard.writeText(text);
                //alert('Copied to clipboard!');
            } else {
                throw new Error("Can't access the clipboard. Check your browser permissions.")
            }
        } catch (error) {
            alert('Error copying to clipboard:', error);
        }
    };

    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
    }

    return (
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" sx={{backgroundColor: "rgba(0, 0, 0, 0.6)"}} fullWidth={true} maxWidth={"md"} open={open}>
            <Box sx={{padding:4}}>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={{color:"#fff"}}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>

            {activeStep == 0 &&
            <>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:2, lineHeight: 1}}>
                    What domain would you like to connect to {process.env.companyName}?
                </BootstrapDialogTitle>
                <DialogContent>
                    
                    <Box>
                        <TextField inputRef={refDomain} id="domainTxt" label="Enter subdomain URL e.g catalog.mydomain.com" fullWidth={true} variant="outlined" sx={{color:"white", marginTop:2 }} />
                    </Box>
                    <Box sx={{marginTop:2}}>
                    <Typography gutterBottom sx={{textAlign:"center", fontSize:14}}>
                        <FmdBadRoundedIcon sx={{color:"#1976d2", position:"relative", top:8}} /> You must own the domain and have the ability to add records
                    </Typography>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {

                        if (refDomain.current.value == "")
                        {
                            return;
                        }

                        setFullDomain(refDomain.current.value);




                        let _subDomain = getSubdomain(refDomain.current.value);
                        setSubDomains(_subDomain);

                        // var domainLand = parseDomain(refDomain.current.value);
                        // setDomain(domainLand.domain);
                        // setSubDomains(domainLand.subDomains);
                        // setTopLevelDomains(domainLand.topLevelDomains);

                        handleNext();
                    }}>
                        Next: Setup DNS
                    </Button>
                </DialogActions>
            </>
            }




            {activeStep == 1 &&
            <>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:2}}>
                    Configure your DNS
                </BootstrapDialogTitle>
                <DialogContent>

                    <Box>
                        <Typography gutterBottom sx={{textAlign:"center", fontSize:14}}>
                            Add a CNAME and TXT Record to your domain by visiting your DNS provider.
                        </Typography>
                    </Box>
                    
                    <Box sx={{backgroundColor:"#f7f7f7", marginTop:5, paddingLeft:4, paddingRight:4}}>
                        <Grid container spacing={2} fullWidth={true} >
                            <Grid item xs={2}>
                                Type
                                
                                <FormControl fullWidth sx={{paddingTop:2}}>
                                    <Select
                                        value={1} readOnly={true}>
                                        <MenuItem value={1}>CNAME</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={5}>
                                Name
                                <TextField inputRef={refCNameName} id="NameDomainTxt" label="" fullWidth={true} value={subDomains} variant="outlined" sx={{color:"white", paddingTop:2 }} />

                                <Box sx={{textAlign:"center", paddingTop:1}}>
                                    <Button startIcon={<ContentCopyRoundedIcon/>} sx={{width:"100%"}} variant="contained" onClick={() => {
                                        copyToClipboard(refCNameName.current.value);
                                    }}>
                                        Copy
                                    </Button>
                                </Box>

                            </Grid>
                            <Grid item xs={5}>
                                Target
                                <TextField inputRef={refCNameTarget} id="targetDomainTxt" label="" fullWidth={true} value={azureWebsite} variant="outlined" sx={{color:"white", paddingTop:2 }} />

                                <Box sx={{textAlign:"center", paddingTop:1}}>
                                    <Button startIcon={<ContentCopyRoundedIcon/>} sx={{width:"100%"}} variant="contained" onClick={() => {
                                        copyToClipboard(refCNameTarget.current.value);
                                    }}>
                                        Copy
                                    </Button>
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{backgroundColor:"#f7f7f7", paddingLeft:4, paddingRight:4, marginTop:2, paddingBottom:4}}>
                        <Grid container spacing={2} fullWidth={true} >
                            <Grid item xs={2}>
                                Type
                                
                                <FormControl fullWidth sx={{paddingTop:2}}>
                                    <Select
                                        value={1} readOnly={true}>
                                        <MenuItem value={1}>TXT</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={5}>
                                Name
                                <TextField inputRef={reftxtName} id="NameDomain2Txt" label="" fullWidth={true} value={"asuid." + subDomains} variant="outlined" sx={{color:"white", marginTop:2 }} />

                                <Box sx={{textAlign:"center", paddingTop:1}}>
                                    <Button startIcon={<ContentCopyRoundedIcon/>} sx={{width:"100%"}} variant="contained" onClick={() => {
                                        copyToClipboard(reftxtName.current.value);
                                    }}>
                                        Copy
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                Target
                                <TextField inputRef={reftxtTarget} id="targetDomain2Txt" label="" fullWidth={true} value={azureTxtValue} variant="outlined" sx={{color:"white", marginTop:2 }} />

                                <Box sx={{textAlign:"center", paddingTop:1}}>
                                    <Button startIcon={<ContentCopyRoundedIcon/>} sx={{width:"100%"}} variant="contained" onClick={() => {
                                        copyToClipboard(reftxtTarget.current.value);
                                    }}>
                                        Copy
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {
                        handleNext();
                    }}>
                        Go Live
                    </Button>
                </DialogActions>
            </>
            }

            {activeStep == 2 &&
                <Box>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:4}}>
                        Creating your private label experience
                    </BootstrapDialogTitle>
                    <DialogContent>
                        <Box sx={{paddingTop:2, textAlign:"center"}}>
                            <Typography gutterBottom sx={{textAlign:"center", fontSize:18}}>
                                Please wait while we complete a few things on our side.
                            </Typography>
                            <Box sx={{paddingTop:2}}>
                                <CircularProgress color="inherit" />
                            </Box>
                        </Box>
                    </DialogContent>
                </Box>
            }

            </Box>


            <Dialog
                open={errorMessage != null ? true : false}
                onClose={() => {
                    setErrorMessage(null);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                {"Issue Detected"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {errorMessage}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setErrorMessage(null);
                }} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>

        </BootstrapDialog>
    )
}