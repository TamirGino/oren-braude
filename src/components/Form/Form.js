import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StepOne from '../Survey/StepOne';
import StepTwo from '../Survey/StepTwo';
import StepThree from '../Survey/StepThree';
import StepFour from '../Survey/StepFour';
import Output from '../Output/Output';
import { Box, Divider, IconButton, Stack, Step, StepLabel, Stepper, Typography, createMuiTheme, useMediaQuery } from '@mui/material';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import CloseIcon from '@mui/icons-material/Close';

// import styles from '../UI/Style.module.css';
import styles from '../../UI/Style.module.css';
import {  useTheme } from '@material-ui/core';

const steps = ['שלב אחד', 'שלב שתיים', 'שלב שלוש', 'שלב ארבע'];

export default function Form(props) {
  // const theme = useTheme();
  // const theme = createMuiTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 300,
  //       sm: 350,
  //       md: 400,
  //       lg: 660,
  //       xl: 1280,
  //     },
  //   },
  // });
  // const isXsmallScreen = useMediaQuery(theme.breakpoints.up('xs'));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  // const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  // const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // const isXlargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  // const fullScreen = useMediaQuery('(max-width:500px)');

  const initialValue = [{ id: 0, value: 0 }];

  const initialArray = [
    { id: 1, value: 3 },
    { id: 2, value: 3 },
    { id: 3, value: 3 },
  ];

  const [userEmail, setUserEmail] = React.useState('');
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [tempArray, setTempArray] = React.useState([{ value: 0 }]);
  const [scoreCount, setScoreCount] = React.useState(initialValue);

  React.useEffect(() => {
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
    if (activeStep === steps.length) {
      props.onClose();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleForm = (score) => {
    if (score === -1) {
      // user doesn't exists
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setBtnDisabled(false);
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
  };

  const handleClose = (event, reason = 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      console.log(reason, event);
    } else {
      props.onClose();
    }
  };

  const handleEmail = (val) => {
    console.log(val);
    setUserEmail(val);
  };
  //maxWidth={isSmallScreen ? '100%' : 'md'} /* margin-top: 10px; margin-right: 10px; */
  //            {activeStep > 0 ? (activeStep === steps.length ? '' : 'הבא') : ''}
  // marginRight: isSmallScreen ?? '2rem' isMediumScreen ? '100%' : '100%' isXsmallScreen

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
          maxHeight: 'none',
        },
      }}
    >
      <DialogTitle>
        <Stack direction='row' spacing={2} alignItems='center'>
          {/* <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              width: '50px',
              height: '50px',
              color: '#4B4F52',
            }}
          >
            <CancelPresentationRoundedIcon
              sx={{
                '&:hover': {
                  color: '#B31232C4',
                },
              }}
            />
          </IconButton> */}

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

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
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
              <Typography sx={{ mt: 2, mb: 1 }}>{scoreCount.reduce((prev, obj) => prev + obj.value, 0)} </Typography>
              <Output fullScreen={props.fullScreen} sum={scoreCount.reduce((prev, obj) => prev + obj.value, 0)} userEmail={userEmail}></Output>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <StepOne handleForm={handleForm} handleEmail={handleEmail} />
              ) : activeStep === 1 ? (
                <StepTwo updateCount={updateCount} />
              ) : activeStep === 2 ? (
                <StepThree updateCount={updateCount} />
              ) : (
                <StepFour updateCount={updateCount} />
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
          <Button disabled={btnDisabled} onClick={handleNext}>
            {activeStep > 0 ? (activeStep === steps.length ? '' : 'הבא') : ''}
          </Button>
          {/* <Button variant='text' color='error' sx={{ fontSize: '20px', justifyContent: 'center' }} onClick={handleClose}>
              {activeStep === steps.length ? 'סיים' : 'ביטול'}
            </Button> */}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
