import React from 'react';
import { TextField, Fab  } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  customTextField: {
    width: '300px',
    position: 'relative',
    '& label': {
      dir:'rtl',
      right: 20,
      transformOrigin: 'top right',
    //    transform: 'translate(0, -50%) scale(0.75)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderTop: 'none',
          borderRadius: '30% 0 5% 0',
          border: '2px solid',
        },
    },
  },
});



const CustomTextField = (props) => {
  const classes = useStyles();

  const [textFieldValue, setTextFieldValue] = React.useState('');

  const handleFabClick = () => {
    console.log(textFieldValue);
    if (textFieldValue !== '') {
        props.onSendQuestion(textFieldValue);
      }
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };


  return (
    <div style={{ position: "relative", marginTop: "10px" }}>
    <TextField
      dir="rtl"
      id="outlined-multiline-static"
      onChange={handleTextFieldChange}
      value={textFieldValue}
      label="מוזמנים לשאול אותי שאלות ואחזור אליכם" 
      multiline
      rows={4}
      variant="outlined"
      className={classes.customTextField}
      sx={{marginTop: '5px'}}
    />

    <Fab
        onClick={handleFabClick}
        color="primary"
        size="small"
        sx={{ position: "absolute", left: 0, bottom: 0, margin: "8px", transform: 'rotate(180deg)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)' }}
      >
        <SendIcon />
      </Fab>
      </div>
  );
};

export default CustomTextField;