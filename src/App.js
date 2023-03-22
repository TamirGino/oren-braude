import React, { useState } from 'react';
import logo from './UI/logo.png';
import styles from './UI/Style.module.css';
import { Fab, Stack, Tooltip } from '@mui/material';
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
    <div className={styles.header}>
      <img src={logo} alt='Logo' className={styles.img}></img>
      {/* <Typography mt={40} variant="h5" className={styles.paragraph}>אורן ברוידא - תזונאי ואלוף העולם בגמישות מטבולית</Typography>
        <Typography sx={{fontFamily:'Arial',fontStyle: 'italic'}} mt={45} variant="h6" className={styles.paragraph}>ענו על סקר קצר שהכנתי בנושא גמישות מטבולית</Typography>
        <Typography sx={{fontFamily:'Arial',fontStyle: 'italic'}} mt={48} variant="h6" className={styles.paragraph}>ובסוף הסקר תוכלו לדעת כמה אתם גמישים</Typography>
        <Typography sx={{fontFamily:'Arial',fontStyle: 'italic'}} mt={51} variant="h6" className={styles.paragraph}>(; ויש גם סרטון הסבר</Typography> */}
      {formOpen && <Form open={formOpen} onClose={handleFormClose} handleUserExist={handleUserExist} exist={isUserExist}></Form>}
      {videoOpen && <MainVideo open={videoOpen} onClose={handleVideoClose}></MainVideo>}
      <Stack className={styles.content} direction='row' spacing={12}>
        <Tooltip TransitionComponent={Zoom} title='נגן סרטון' onClick={handelVideoOpen} arrow>
          <Fab
            sx={{
              left: 10,
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
              <OndemandVideoOutlinedIcon fontSize='large' />
            </IconButton>
          </Fab>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title='ענה על השאלון' onClick={handelFormOpen} arrow>
          <Fab
            sx={{
              right: 50,
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
              <ContentPasteOutlinedIcon fontSize='large' />
            </IconButton>
          </Fab>
        </Tooltip>
      </Stack>
    </div>
  );
}

export default App;