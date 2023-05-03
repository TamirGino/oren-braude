import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StepOne from '../Survey/StepOne';
import StepThree from '../Survey/StepThree';
import StepFour from '../Survey/StepFour';
import StepFive from '../Survey/StepFive';
import StepTwo from '../Survey/StepTwo';
import Output from '../Output/Output';
import { Box, Divider, IconButton, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['רישום', 'צום', 'תלות בפחמימות', 'אנרגיה וריכוז', 'רעב ואימונים'];

export default function Form(props) {
  
  const [openSnack, setOpenSnack] = React.useState(false);

  const initialValue = [{ id: 0, value: 0 }];

  const initialArray = [
    { id: 1, value: 6 },
    { id: 2, value: 6 },
    { id: 3, value: 7 },
    { id: 4, value: 5 },
  ];

  
  const numOfQuestions = initialArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value;
  }, 0);

  const [userEmail, setUserEmail] = React.useState('');
  const [naxtBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [tempArray, setTempArray] = React.useState([{ value: 0 }]);
  const [scoreCount, setScoreCount] = React.useState(initialValue);


  React.useEffect(() => {
    console.log(props.exist[1]);
    console.log(props.open);
    if (props.exist[0]) {
      console.log('EXIST');
      setScoreCount(props.exist[1]);
      setActiveStep(steps.length);
    } else {
      console.log('NOT EXIST');
      setScoreCount(initialArray);
    }
  }, []);

  const handleNext = () => {
    if (naxtBtnDisabled){
      console.log("TRUEEEEEE")
      setOpenSnack(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setNextBtnDisabled(true);
    }
  };

  const handleForm = (score) => {
    if (score === -1) {
      // user doesn't exists
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // setBtnDisabled(false);
    } else {
      // user exists
      const newArray = [...tempArray];
      newArray[0].value = score;
      setTempArray(newArray);
      setScoreCount(tempArray);
      console.log(tempArray);
      props.handleUserExist(tempArray);
      setActiveStep(steps.length);
    }
  };

  const checkValuesArray = (valuesArray) => {
    console.log(valuesArray)
    const isZeroArray = Object.values(valuesArray).map(val => val === 0 || val === null);
    console.log(isZeroArray)
    setNextBtnDisabled(isZeroArray.includes(true))
  }


  const updateCount = (count) => {
    if (activeStep === 1) {
      scoreCount[0].value = count;
    }
    if (activeStep === 2) {
      scoreCount[1].value = count;
    }
    if (activeStep === 3) {
      scoreCount[2].value = count;
      console.log(scoreCount);
    }
    if (activeStep === 4) {
      scoreCount[3].value = count;
      console.log(scoreCount);
    }
    console.log(scoreCount,scoreCount.reduce((prev, obj) => prev + obj.value, 0));
  };

  const handleClose = (event, reason = 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      console.log(reason, event);
    } else {
      props.onClose();
    }
  };

  const handleCloseAlert = () => {
    setOpenSnack(false);
  };

  const handleEmail = (val) => {
    console.log(val);
    setUserEmail(val);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll={'paper'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      fullScreen={props.fullScreen}
      PaperProps={{
        style: {
          margin: 0,
          maxWidth: 'none',
          maxHeight: '{props.fullScreen ? 100% : 90%}'
        },
      }}
    >
      <DialogTitle>
        <Stack direction='row' spacing={2} alignItems='center' sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: -5,
              top: -5,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon
              sx={{
                '&:hover': {
                  color: '#B31232C4',
                },
              }}
            />
          </IconButton>
          <Stepper activeStep={activeStep} sx={{ height: 90, '& .MuiStepConnector-root ': { width: '0px' } }} alternativeLabel>
            {steps.map((label, index) => {
              const labelProps = {};
              const stepProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          {activeStep === steps.length ? (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>{scoreCount.reduce((prev, obj) => prev + obj.value, 0)} </Typography> */}
              <Output numOfQuestions={numOfQuestions} fullScreen={props.fullScreen} sum={scoreCount.reduce((prev, obj) => prev + obj.value, 0)} userEmail={userEmail} exist={props.exist}></Output>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <StepOne handleForm={handleForm} handleEmail={handleEmail} />
              ) : activeStep === 1 ? (
                <StepTwo section={'sectionOne'} updateCount={updateCount} checkValuesArray={checkValuesArray} />
              ) : activeStep === 2 ? (
                <StepThree section={'sectionTwo'} updateCount={updateCount} checkValuesArray={checkValuesArray}/>
              ) : activeStep === 3 ? (
                <StepFour section={'sectionThree'} updateCount={updateCount} checkValuesArray={checkValuesArray}/>
              ) : (
                <StepFive section={'sectionFour'} updateCount={updateCount} checkValuesArray={checkValuesArray}/>
              )}
            </React.Fragment>
          )}
        </DialogContentText>
      </DialogContent>
      {/* <Divider></Divider> */}
      {activeStep > 0 ?? <Divider></Divider>}
      <DialogActions>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        {activeStep !== 0 && activeStep !== steps.length && (
              <Button
                onClick={handleNext}
                variant="outlined"
                sx={{ fontSize: '18px' }}
              >
                {activeStep === steps.length - 1 ? 'לתוצאות' : 'הבא'}
                <KeyboardBackspaceIcon sx={{ mr: 1 }} />
              </Button>
              
            )}
              <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseAlert} >
                <Alert severity="error" sx={{ width: '100%', justifyContent: 'center' }}>
                    &nbsp; יש לענות על כל השאלות 
                </Alert>
              </Snackbar>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
