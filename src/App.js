import React, { useState } from 'react';
import { Fab, useMediaQuery } from '@mui/material';
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
  };

  return (
    <>
      <Form fullScreen={fullScreen} open={formOpen} onClose={handleFormClose} handleUserExist={handleUserExist} exist={isUserExist}></Form>
      <MainVideo videoId={'z027uv2AeM8'} title={'גמישות מטבולית - מה זה אומר ??'} fullScreen={fullScreen} open={videoOpen} onClose={handleVideoClose}></MainVideo>
      <div className="fab-container">
        <Fab
          variant='extended'
          onClick={handelFormOpen}
          sx={{
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
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
        <Fab
          variant='extended'
          onClick={handelVideoOpen}
          sx={{
            mt: 4,
            border: '3px solid aqua',
            backgroundColor: '#cfffe9',
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
        </div>
    </>
  );
}

export default App;
