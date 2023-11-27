import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.open);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = (action) => {
    if(props.msg === "אתה עומד למחוק את המשתמשים הנבחרים. האם אתה בטוח?"){
        props.handleRemoveBtn(action);
    } else {
        props.handleAddTryBtn(action);
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"שים לב !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {props.msg !=="לא נבחרו משתמשים" &&
            <Button onClick={() => handleClose('disagree')}>ביטול</Button>
        }
        <Button onClick={() => handleClose('agree')}>אישור</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}