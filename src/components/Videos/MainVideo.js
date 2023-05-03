import React from 'react';
import YouTube from 'react-youtube';
import { Container, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';


export default function MainVideo(props) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(props.fullScreen);

  const handleClose = () => {
    props.onClose();
  };
  

  const normal = {
    height: '500',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };

  const smallScreen ={
    height: '500',
    width: '320',
    playerVars: {
      autoplay: 1,
    },
  };
       
  return (
    <Container maxWidth={isSmallScreen ? '100%' : 'md'}>
      <Dialog open={props.open} fullScreen={props.fullScreen} maxWidth={true} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle sx={{ textAlign: 'center', fontStyle: 'italic', fontSize: '20px', fontFamily: 'Roboto' }} id='alert-dialog-title'>
          {props.title}
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <YouTube videoId={props.videoId} opts={props.fullScreen ? smallScreen : normal} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
}