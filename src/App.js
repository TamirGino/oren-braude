import React, { useState } from 'react';
import {  Box, Fab, Stack, Tooltip, useMediaQuery } from '@mui/material';
import { IconButton } from '@mui/material';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import Zoom from '@mui/material/Zoom';
import Form from './components/Form/Form';
import MainVideo from './components/Videos/MainVideo';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isUserExist, setIsUserExist] = React.useState([false, 0]);

  const fullScreen = useMediaQuery('(max-width:600px)');

  const handleUserExist = (score) => {
    setIsUserExist([true, score]);
  };

  const handelFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handelVideoOpen = () => {
    setVideoOpen(true);
  };
  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  return (
    <>
      <Form fullScreen={fullScreen} open={formOpen} onClose={handleFormClose} handleUserExist={handleUserExist} exist={isUserExist}></Form>
      <MainVideo videoId={'z027uv2AeM8'} title={'גמישות מטבולית - מה זה אומר ??'} fullScreen={fullScreen} open={videoOpen} onClose={handleVideoClose}></MainVideo>

      {/* <Tooltip TransitionComponent={Zoom} title='נגן סרטון' onClick={handelVideoOpen} arrow>
        <Fab
          sx={{
            top: 300,
            left: -50,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            height: 80,
            width: 80,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: '#85E4B9',
              },
            }}
          >
            <OndemandVideoOutlinedIcon />
          </IconButton>
        </Fab>
      </Tooltip> */}
      {/* <Tooltip TransitionComponent={Zoom} title='ענה על השאלון' onClick={handelFormOpen} arrow>
        <Fab
          sx={{
            top: 300,
            right: 150,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            height: 80,
            width: 80,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: '#85E4B9',
              },
            }}
          >
            <ContentPasteOutlinedIcon />
          </IconButton>
        </Fab>
      </Tooltip> */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fab
          variant='extended'
          onClick={handelFormOpen}
          sx={{
            // top: 400,
            // right: 150,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            width:'100%',
            // height: 80,
            // width: 80,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          ענה על השאלון
          <ContentPasteOutlinedIcon sx={{ mr: 2 }} />
        </Fab>
        <Fab
          variant='extended'
          onClick={handelVideoOpen}
          sx={{
            mt: 2,
            // top: 300,
            // right: 150,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            width:'100%',
            // height: 80,
            // width: 80,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          צפה בסרטון הסבר
          <OndemandVideoOutlinedIcon sx={{ mr: 2 }} />
        </Fab>
      </Box>
    </>
  );
}

export default App;
