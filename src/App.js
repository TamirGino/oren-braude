import React, { useState } from 'react';
import { Box, Button, Fab, useMediaQuery } from '@mui/material';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import Form from './components/Form/Form';
import MainVideo from './components/Videos/MainVideo';
import './App.css';
import logo from '../src/UI/new_logo.png'
import oren_desktop from '../src/UI/oren_desktop.jpg'
import oren_mobile from '../src/UI/oren_mobile.jpeg'
import play from '../src/UI/play.png'



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
      <MainVideo videoId={'z027uv2AeM8'} title={'40 שניות על גמישות מטבולית והשאלון'} fullScreen={fullScreen} open={videoOpen} onClose={handleVideoClose} handelFormOpen={handelFormOpen}></MainVideo>

      {/* <Box >
        <img src={logo} alt="Logo" className="logo" />
      </Box> */}

      {/* <Box container="true" display='flex' flexDirection='column' sx={{ alignItems: 'left', position:'fixed' }}>
        <img src={oren_desktop} alt="Logo" className="logo_left" />
      </Box> */}

      <Box container="true" display='flex' flexDirection='column' className="logo_right" 
            sx={{ alignItems: fullScreen ? 'center' : 'right' }}>

      <img onClick={handelVideoOpen} src={play} alt="Logo" className="play" />

      <Fab
          variant='extended'
          onClick={handelVideoOpen}
          sx={{
            color:'white',
            mt: 6,
            border: '3px solid #D25A30',
            backgroundColor: '#384465',
            maxWidth:'300px',
            width:'100%',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              // backgroundColor: '#85E4B9',
              color:'#FFC15E',
              backgroundColor: '#384465',
            },
          }}
        >
          צפה בסרטון הסבר
          <OndemandVideoOutlinedIcon sx={{ mr: 2 }} />
        </Fab>

        <Fab 
          variant='extended'
          onClick={handelFormOpen}
          sx={{
            color:'white',
            mt: 6,
            border: '3px solid #D25A30',
            backgroundColor: '#384465',
            maxWidth:'300px',
            width:'100%',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              // backgroundColor: '#85E4B9',
              color:'#FFC15E',
              backgroundColor: '#384465',
            },
          }}
        >
          ענה על השאלון
          <ContentPasteOutlinedIcon sx={{ mr: 4 }} />
        </Fab>
       </Box>

        {/* <img src={oren_mobile} alt="Logo" className="logo_mobile" /> */}
              
    </>
  );
}

export default App;
