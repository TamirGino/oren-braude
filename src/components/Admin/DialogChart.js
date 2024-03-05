import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import { LineChart, tickMinStep } from '@mui/x-charts';
import GradientChart from './GradientChart';


// const data = [ 20, 40, 60];
// const xData = ['0', 'תקופה 1', 'תקופה 2', 'תקופה 3'];

export default function DialogChart(props) {
    const [data, setData] = useState([0, 0, 0]);
    const [xData, setXData] = useState([null, null, null]);

    useEffect(() => {
        // Update score data
        const firstScore = props.userData.scores?.first?.score === -1 ? 0 : props.userData.scores?.first?.score || 0;
    const secondScore = props.userData.scores?.second?.score === -1 ? 0 : props.userData.scores?.second?.score || 0;
    const thirdScore = props.userData.scores?.third?.score === -1 ? 0 : props.userData.scores?.third?.score || 0;

        setData([firstScore, secondScore, thirdScore]);
        // setData([40, 48, 50, 42, 44, 55])
        // Update date data
        const formatDate = (timestamp) => {
            if (!timestamp) return null;
            const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
            const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
            return `${day}/${month}/${year}`;
        };

        const firstDate = formatDate(props.userData.scores?.first?.date);
        const secondDate = formatDate(props.userData.scores?.second?.date);
        const thirdDate = formatDate(props.userData.scores?.third?.date);

        setXData([firstDate, secondDate, thirdDate]);
        // setXData(['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F'])
    }, [props.userData.scores]); // Re-run effect when userData.scores changes

  const handleClose = () => {
    props.setDialogChartOpen(false);
  };

  const combineStrings = (str1, str2) => {
    return `${str1} ${str2}`;
}

  return (
    <React.Fragment>
      <Dialog
        // fullWidth={true}
        // maxWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2, display:'flex', justifyContent:'center' }} id="customized-dialog-title">
                {/* <Typography component="div" variant="h6">{props.userData.first_name}</Typography> */}
                <Typography component="div" variant="h6">
                  {combineStrings(props.userData.first_name, props.userData.last_name)}
                </Typography>
                {/* <Typography component="div" variant="h6">{props.userData.last_name}</Typography> */}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <div>
                <GradientChart xData={xData} data={data} />
            </div>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}