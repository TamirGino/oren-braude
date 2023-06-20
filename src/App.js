import React, { useState } from 'react';
import { Box, Button, Fab, useMediaQuery } from '@mui/material';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import Form from './components/Form/Form';
import MainVideo from './components/Videos/MainVideo';
import './App.css';


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
  }; // <img src={require('/images/image-name.png')} />

  return (
    <>
      <Form fullScreen={fullScreen} open={formOpen} onClose={handleFormClose} handleUserExist={handleUserExist} exist={isUserExist}></Form>
      <MainVideo videoId={'z027uv2AeM8'} title={'40 שניות על גמישות מטבולית והשאלון'} fullScreen={fullScreen} open={videoOpen} onClose={handleVideoClose} handelFormOpen={handelFormOpen}></MainVideo>
      <Box container="true" display='flex' flexDirection='column' sx={{ alignItems: 'center' }}>
      <img src={require("C:/Users/tgino/Desktop/Project/project-oren/src/UI/logo.png")} alt="Logo" className="logo" />
      <Fab
        
          variant='extended'
          onClick={handelVideoOpen}
          sx={{
            mt: 6,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            maxWidth:'300px',
            width:'100%',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          צפה בסרטון הסבר
          <OndemandVideoOutlinedIcon sx={{ mr: 2 }} />
        </Fab>

        
        <Button onClick={handelVideoOpen}>
          <img src={require("C:/Users/tgino/Desktop/Project/project-oren/src/UI/play2.png")} alt="Logo" className="play" />
        </Button>
        
        <Fab 
          variant='extended'
          onClick={handelFormOpen}
          sx={{
            mt: 6,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
            maxWidth:'300px',
            width:'100%',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: '#85E4B9',
            },
          }}
        >
          ענה על השאלון
          <ContentPasteOutlinedIcon sx={{ mr: 4 }} />
        </Fab>
        
        </Box>
    </>
  );
}

export default App;
