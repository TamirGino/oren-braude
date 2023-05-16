import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Register from "../Register/Register";
import Output from "../Output/Output";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import QuestionList from "../Questionary/QuestionList";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
});

const steps = [
  "רישום",
  "צום",
  "תלות בפחמימות",
  "אנרגיה וריכוז",
  "רעב ואימונים",
];

export default function Form(props) {
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

  const [activeStep, setActiveStep] = React.useState(0);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [naxtBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [tempArray, setTempArray] = React.useState([{ value: 0 }]);
  const [scoreCount, setScoreCount] = React.useState(initialValue);
  const [userEmail, setUserEmail] = React.useState("");
  const [valuesArray, setValuesArray] = React.useState([[], [], [], []]);

  React.useEffect(() => {
    if (props.exist[0]) {
      //Exist
      setScoreCount(props.exist[1]);
      setActiveStep(steps.length);
    } else {
      // Not Exist
      setScoreCount(initialArray);
    }
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Register handleForm={handleForm} handleEmail={handleEmail} />;
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <QuestionList
            collectionNum={step}
            valuesArray={valuesArray}
            updateValues={updateValues}
            moveForwardAndUpdate={moveForwardAndUpdate}
          />
        );
      case 5:
        return (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>{scoreCount.reduce((prev, obj) => prev + obj.value, 0)} </Typography> */}
          <Output
            numOfQuestions={numOfQuestions}
            fullScreen={props.fullScreen}
            sum={scoreCount.reduce((prev, obj) => prev + obj.value, 0)}
            userEmail={userEmail}
            exist={props.exist}
          />
          </React.Fragment>
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    // if (naxtBtnDisabled) {
    //   setOpenSnack(true);
    // } else {
       console.log(valuesArray[activeStep - 1])

      if (checkMoveForward(valuesArray[activeStep -1])){
        setNextBtnDisabled(false);
        setOpenSnack(true);
      } else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNextBtnDisabled(true);
      }   
    //}
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextBtnDisabled(false)
  };

  const handleForm = (score) => {
    if (score === -1) {
      // user doesn't exists
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // user exists
      const newArray = [...tempArray];
      newArray[0].value = score;
      setTempArray(newArray);
      setScoreCount(tempArray);
      props.handleUserExist(tempArray);
      setActiveStep(steps.length);
    }
  };

  const checkMoveForward = (valuesArr) => {
    //console.log(valuesArr)
    if (valuesArr.length === 0) {
      return true;
    }
    for (let i = 0; i < valuesArr.length; i++) {
      const val = valuesArr[i].value;
      if (val === 0 || val === null) {
        return true;
      }
    }
    return false;
  }

  const moveForwardAndUpdate = (valuesArr) => {
    if (checkMoveForward(valuesArr)){
      setNextBtnDisabled(true);
      return;
    } else{
      setNextBtnDisabled(false);
    }

    const sum = valuesArr.reduce((accumulator, item) => accumulator + item.value, 0);
    const updatedScoreCount = [...scoreCount];
    const index = updatedScoreCount.findIndex(item => item.id === (activeStep));
    if (index !== -1) {
      updatedScoreCount[index].value = sum;
      setScoreCount(updatedScoreCount);
    }
  };

  const updateValues = (values) => {
    if (activeStep >= 1 && activeStep <= 4) {
      const updatedValues = [...valuesArray]; // Create a copy of the original array

      // Replace the object at the activeStep index with the new values
      updatedValues[activeStep - 1] = values;
      //console.log(updatedValues);
      setValuesArray(updatedValues);
    }
  };
  const handleClose = (event, reason = "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") {
      // console.log(reason, event);
    } else {
      props.onClose();
    }
  };

  const handleCloseAlert = () => {
    setOpenSnack(false);
  };

  const handleEmail = (val) => {
    setUserEmail(val);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullScreen={props.fullScreen}
      PaperProps={{
        style: {
          margin: 0,
          maxWidth: "none",
          maxHeight: "{props.fullScreen ? 100% : 90%}",
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: -5,
              top: -5,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon
              sx={{
                "&:hover": {
                  color: "#B31232C4",
                },
              }}
            />
          </IconButton>
          <Stepper
            activeStep={activeStep}
            sx={{ height: 90, "& .MuiStepConnector-root ": { width: "0px" } }}
            alternativeLabel
          >
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
      <Divider sx={{ borderBottomWidth: 2 }}/>
      <DialogContent>{getStepContent(activeStep)}</DialogContent>
      {activeStep > 0 && activeStep !== steps.length && <Divider sx={{ borderBottomWidth: 2 }}/> }
      <DialogActions sx={{ display: "flex", flexDirection: "row", pt: 0 }}>
      {activeStep !== 0 && activeStep !== steps.length && activeStep !== 1 && (
        <Button
          sx={{ fontSize: "18px" }}
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="text"
          // sx={{ mr: 1 }}
        >
          {/* <EastIcon sx={{ ml: 0 }} /> */}
          הקודם
        </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep !== 0 && activeStep !== steps.length && (
          <Button
            onClick={handleNext}
            variant="text"
            sx={{ fontSize: "18px" }}
          >
            {activeStep === steps.length - 1 ? "לתוצאות" : "הבא"}
            {/* <WestIcon sx={{ mr: 0 }} /> */}
          </Button>
        )}
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseAlert} >
                <Alert severity="error" sx={{ width: '100%', justifyContent: 'center' }}>
                    &nbsp; יש לענות על כל השאלות 
                </Alert>
              </Snackbar>
      </DialogActions>
    </Dialog>
  );
}
