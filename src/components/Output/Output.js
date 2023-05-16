import * as React from 'react';
import { Box, Fab, Grow, Typography } from '@mui/material';
import ReactSpeedometer from 'react-d3-speedometer';
import { db } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import MainVideo from '../Videos/MainVideo';

export default function Output(props) {

  const [Delay, setDelay] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const labels = [
    { text: '😭', fontSize: '23' },
    { text: '😔', fontSize: '23' },
    { text: '😐', fontSize: '23' }, 
    { text: '🙂', fontSize: '23' },
    { text: '😁', fontSize: '23' },
  ];

  React.useEffect(() => {
    updateUserScore(props.userEmail, calcScore());
    const timer = setTimeout(() => {
      setDelay(true);
      return () => clearTimeout(timer);
    }, 3500);

    if (calcScore() <= 30) {
      setComment('הגמישות המטבולית שלך נמוכה, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
    } else if (calcScore() <= 70) {
      setComment('הגמישות המטבולית שלך בינונית, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
    } else {
      setComment('הגמישות המטבולית שלך טובה! צפה בסרטון על מנת לקחת אותה לשלב הבא');
    }
  }, []);

  const updateUserScore = async (email, score) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // console.error('No matching documents');
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const currentScore = userData.score;
      if (currentScore !== -1) {
        // console.log(`Score for user ${email} is not -1. Not updating score.`);
        return;
      }
      await updateDoc(doc(usersRef, userDoc.id), { score });
      // console.log(`Score updated for user ${email}`);
    } catch (error) {
      // console.error('Error updating user score:', error);
    }
  };

  const calcScore = () => {
    if (props.exist[0]) {
        return props.sum;
    } else { // not exist
        return Math.round((props.sum / (props.numOfQuestions * 5)) * 100);
    }
  };

  const handelVideoOpen = () => {
    setVideoOpen(true);
  };
  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  return (
    <Box container="true" display='flex' flexDirection='column' sx={{ alignItems: 'center' }}>
      <ReactSpeedometer
        width={props.fullScreen ? 350 : 500}
        needleHeightRatio={props.fullScreen ? 0.5 : 0.7}
        maxValue={5}
        value={calcScore() / 20}
        ringWidth={47}
        needleTransitionDuration={3333}
        needleColor={'#90f2ff'}
        textColor={'#0d446c'}
        customSegmentLabels={labels}
        currentValueText={' '}
      />
      <Typography sx={{ fontSize: 23, fontFamily: 'Roboto', color: '#022641', mt: -2 }} variant='h6'>
        מידת הגמישות המטבולית שלך היא: <strong>{calcScore()}</strong>
      </Typography>
      <Grow in={Delay} timeout={2000}>
        <Fab onClick={handelVideoOpen} size='medium' variant='extended' color='primary' sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', width: props.fullScreen ? '100%' : '50%', mt: 3 }}>
          <Typography variant='body1' sx={{ display: 'inline-block' }}>
            המשך לטיפים
          </Typography>
          <TipsAndUpdatesOutlinedIcon sx={{ mr: 2 }} />
        </Fab>
      </Grow>
      <MainVideo videoId={'2C4ybI41_v8'} title={comment} fullScreen={props.fullScreen} open={videoOpen} onClose={handleVideoClose}></MainVideo>
    </Box>
  );
}
