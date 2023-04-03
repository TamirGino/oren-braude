import * as React from 'react';
import { Box, Button, Fab, Grid, Grow, IconButton, Typography } from '@mui/material';
import ReactSpeedometer from 'react-d3-speedometer';
import { db } from '../../config/firebase';
import { addDoc, collection, doc, getDoc, updateDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import {checkEmailExists} from '../Survey/StepOne'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import MainVideo from '../Videos/MainVideo'




export default function Output(props) {

  // const checkEmailExists = (email) => {
  //   //console.log(email)
  //   const q = query(collection(db, 'users'), where('email', '==', email));
  //   const doc = getDocs(q);
  //   console.log(doc)
  //   if (doc.size > 0) {
  //     console.log(doc.docs[0].data().score);
  //     return doc.docs[0].data().score;
  //   } else {
  //     return -1;
  //   }
  // };
const [Delay, setDelay] = React.useState(false);
const [videoOpen, setVideoOpen] = React.useState(false);
const [comment, setComment] = React.useState('');

// const updateUserScore = async (email, score) => {
//   const usersRef = collection(db, 'users');
//   const q = query(usersRef, where('email', '==', email));

//   try {
//     const querySnapshot = await getDocs(q);
//     if (querySnapshot.empty) {
//       console.error('No matching documents');
//       return;
//     }
//     // console.log(querySnapshot.docs[0]);
//     const userDoc = querySnapshot.docs[0];
//     await updateDoc(doc(usersRef, userDoc.id), { score });
//     console.log(`Score updated for user ${email}`);
//   } catch (error) {
//     console.error('Error updating user score:', error);
//   }
// };
const updateUserScore = async (email, score) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.error('No matching documents');
      return;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const currentScore = userData.score;
    if (currentScore !== -1) {
      console.log(`Score for user ${email} is -1. Not updating score.`);
      return;
    }
    await updateDoc(doc(usersRef, userDoc.id), { score });
    console.log(`Score updated for user ${email}`);
  } catch (error) {
    console.error('Error updating user score:', error);
  }
};

    //await setDoc(userRef, { score }, { merge: false });
//     await updateDoc(userRef, { score });
//     console.log(`Score updated for user ${email}`);
//   } catch (error) {
//     console.error('Error updating user score:', error);
//   }
// };

  React.useEffect(() => {
  updateUserScore(props.userEmail, props.sum);
  const timer = setTimeout(() => {
    setDelay(true);
    return () => clearTimeout(timer);
  }, 3500);

  if (props.sum <= 15) {
    setComment('הגמישות המטבולית שלך נמוכה, צפה בסרטון על מנת לרדת במשקל ולהיות ברמות אנרגיה גבוהות');
  } else if (props.sum <= 27) {
    setComment('הגמישות המטבולית שלך בינונית, צפה בסרטון על מנת לרדת במשקל ולהיות ברמות אנרגיה גבוהות');
  } else {
    setComment('הגמישות המטבולית שלך טובה! צפה בסרטון על מנת לקחת אותה לשלב הבא');
  }
  }, []);


  const handelVideoOpen = () => {
    setVideoOpen(true);
  };
  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  return (
    // <Grid item container justifyContent='center'>
    <Box container display='flex' flexDirection='column' sx={{ alignItems: 'center' }}>
      <ReactSpeedometer
        width={props.fullScreen ? 350 : 500}
        needleHeightRatio={props.fullScreen ? 0.5 : 0.7}
        maxValue='5'
        value={props.sum / 9}
        currentValueText=' מידת הגמישות המטבולית שלך'
        customSegmentLabels={[
          {
            text: 'רמה נמוכה מאוד',
            // position: 'INSIDE',
            // color: '#555',
            fontSize: props.fullScreen ? 12 : 15,
          },
          {
            text: 'רמה נמוכה',
            // position: 'INSIDE',
            // color: '#555',
          },
          {
            text: 'ממוצע',
            // position: 'INSIDE',
            // color: '#555',
            fontSize: '20px',
          },
          {
            text: 'רמה גבוהה',
            // position: 'INSIDE',
            // color: '#555',
          },
          {
            text: 'רמה גבוהה מאוד',
            // position: 'INSIDE',
            // color: '#555',
            fontSize: props.fullScreen ? 12 : 15,
          },
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        // needleTransition='easePolyOut'
        needleColor={'#90f2ff'}
        textColor={'#0d446c'}
      />
      <Grow in={Delay} timeout={2000}>
        {/* <Button variant='outlined'>המשך לטיפים</Button> */}
        {/* <IconButton fontSize='large'>
          <TipsAndUpdatesOutlinedIcon />
        </IconButton> */}
        <Fab onClick={handelVideoOpen} size='medium' variant='extended' color='primary' sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', width: '50%' }}>
          <Typography variant='body1' sx={{ display: 'inline-block' }}>
            המשך לטיפים
          </Typography>
          <TipsAndUpdatesOutlinedIcon sx={{ mr: 2 }} />
        </Fab>
      </Grow>
      <MainVideo title={comment} fullScreen={props.fullScreen} open={videoOpen} onClose={handleVideoClose}></MainVideo>
    </Box>
  );
}
