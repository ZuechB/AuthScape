import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import { FileUploader, apiService } from 'authscape';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

export function CSVUsersUpload({customFields, showDialog, onClose}) {

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const steps = ['Download CSV Template', 'Upload CSV Template'];

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

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {

        alert("done")
        // const newCompleted = completed;
        // newCompleted[activeStep] = true;
        // setCompleted(newCompleted);
        // handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Dialog
            open={showDialog}
            onClose={() => {
                if (onClose != null)
                {
                    onClose();
                }
            }}
            fullWidth={true}>
            <DialogTitle>
            {"Upload users"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Upload multiple users using a CSV sheet
                </DialogContentText>

                <Box sx={{paddingBottom:0, paddingTop:2}}>

                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                            </StepButton>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                            </Typography> */}

                            <Box sx={{paddingTop:4, paddingBottom:4}}>
                                {activeStep == 0 &&
                                <Box sx={{fontSize:14}}>
                                    Download our CSV template to make sure your CSV is formatted correctly.

                                    <Button startIcon={<CloudDownloadRoundedIcon />} variant="contained" sx={{marginTop:2}} onClick={async () => {

                                        await apiService().DownloadFile("/UserManagement/GetDownloadTemplate?customFields=" + JSON.stringify(customFields), "DownloadFile.csv", () => {

                                        });

                                        // alert("download template")
                                    }}>Download Template</Button>
                                </Box>
                                }

                                {/* {activeStep == 1 &&
                                <Box>
                                    Select your company
                                </Box>
                                } */}

                                {activeStep == 1 &&
                                <Box>
                                    <FileUploader url={"/UserManagement/UploadUsers"} onUploadCompleted={(results) => {
                        
                                        if (onClose != null)
                                        {
                                            onClose();
                                        }
                                        
                                    }} />
                                </Box>
                                }

                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}>
                                    Back
                                </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            {/* {activeStep} {steps.length -1} */}

                            {(activeStep !== steps.length - 1) &&
                                <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next
                                </Button>
                            }

                            {/* {(activeStep === steps.length - 1) &&
                                <Box>
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                        ? 'Finish'
                                        : 'Complete Step'}
                                    </Button>
                                </Box>
                            } */}
                            </Box>
                        </React.Fragment>
                        )}
                    </div>

































                    
                </Box>

                <Box sx={{height:200}}>
                    
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (onClose != null)
                    {
                        onClose();
                    }
                }}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}