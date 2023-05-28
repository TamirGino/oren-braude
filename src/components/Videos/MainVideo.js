import React from 'react';
import YouTube from 'react-youtube';
import { Container, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
// import Link from '@mui/material/Link';


export default function MainVideo(props) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleClose = () => {
    props.onClose();
  };
       
  return (
    <Container maxWidth={isSmallScreen ? '100%' : 'md'}>
      <Dialog open={props.open} fullScreen={props.fullScreen} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
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
        <DialogContent >
          <DialogContentText id='alert-dialog-description' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <YouTube videoId={props.videoId} opts={props.fullScreen ? smallScreen : normal} />        
          </DialogContentText>
          { props.videoId === "2C4ybI41_v8" &&
          <div style={{ textAlign: 'center' }}>
          <Link href="https://tinyurl.com/atrzb8n8" underline="always" target="_blank" sx={{ fontSize: '1.2rem', display: 'inline-block', mt:2 }}>
                {'שלחו לי הודעה כאן'}
          </Link>
          </div>
          }
        </DialogContent>
      </Dialog>
    </Container>
  );
}