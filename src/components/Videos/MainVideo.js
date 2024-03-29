import React, { useRef } from 'react';
import YouTube from 'react-youtube';
import { Box, Button, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

// import Link from '@mui/material/Link';


export default function MainVideo(props) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const videoRef = useRef(null);

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


  const handleButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.pauseVideo();
    }
    props.onUpdateUserInfo();
  };

  const handleFormOpen = () => {
    if (videoRef.current) {
      videoRef.current.pauseVideo();
    }
    props.handelFormOpen();
  };
       
  return (
    <React.Fragment>
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
            <YouTube videoId={props.videoId} opts={props.fullScreen ? smallScreen : normal} 
              onReady={(event) => {
              // Set the videoRef when the video is ready
              videoRef.current = event.target;
            }}/>        
          </DialogContentText>
          <div style={{ textAlign: 'center' }}>
          { props.videoId === "2C4ybI41_v8" ?
          <>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Fab
            variant='extended'
            size='medium'
            color='primary'
            component={Link}
            href="https://lp.smoove.io/oh6i"
            underline="always"
            target="_blank"
            sx={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
              width: props.fullScreen ? '100%' : '50%',
              mt: 3,
              fontSize: '1.2rem',
              display: 'inline-block',
            }}
            onClick={handleButtonClick}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='subtitle2' sx={{ display: 'inline-block' }}>
                אורן, תעזור לי לרדת במשקל
              </Typography>
              <Typography variant='subtitle2' sx={{ display: 'inline-block' }}>
                מבלי לספור קלוריות!
              </Typography>            
            </Box>
          </Fab>

            <Fab
            variant='extended'
            size='medium'
            color='primary'
            component={Link}
            href="https://lp.smoove.io/tqcs"
            underline="always"
            target="_blank"
            sx={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
              width: props.fullScreen ? '100%' : '50%',
              mt: 3,
              fontSize: '1.2rem',
              display: 'inline-block',
            }}
            onClick={handleButtonClick}
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='subtitle2' sx={{ display: 'inline-block' }}>
                לצפייה בהדרכה במתנה על
              </Typography>
              <Typography variant='subtitle2' sx={{ display: 'inline-block' }}>
                השיטה המטבולית להרזייה!
              </Typography>            
            </Box>

            </Fab>
          </Box>
          </>
          
          : <Fab 
          variant='extended'
          size='medium'
          color='primary'
          onClick={handleFormOpen}
          sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', width: props.fullScreen ? '100%' : '50%', mt: 3 }}>
        
          המשך לשאלון  
          <ContentPasteOutlinedIcon sx={{ mr: 4 }} />
        </Fab>
          }
          </div>
        </DialogContent>
      </Dialog>
    </Container>
    </React.Fragment>
  );
}