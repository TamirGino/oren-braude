import React from 'react';
import YouTube from 'react-youtube';
import { Container, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MainVideo(props) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(isSmallScreen);

  const handleClose = () => {
    props.onClose();
  };
  

  const opts = {
    height: '500',
    width: '850',
    playerVars: {
      autoplay: 1,
    },
  };
       
  return (
    <Container maxWidth={isSmallScreen ? '100%' : 'md'}>
        <Dialog open={props.open} fullWidth={true} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
          <DialogTitle sx={{ textAlign: 'center', fontStyle: 'italic' }} id='alert-dialog-title'>
            {'גמישות מטבולית'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <YouTube videoId={'IUN664s7N-c'} opts={opts} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
    </Container>
  );
}