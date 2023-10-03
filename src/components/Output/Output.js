import * as React from 'react';
import { Box, Fab, Grow, Typography } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ReactSpeedometer from 'react-d3-speedometer';
import { db } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import MainVideo from '../Videos/MainVideo';
import CustomTextField from '../TextField/CustomTextField';


export default function Output(props) {

  const [Delay, setDelay] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);


  const labels = [
    { text: '😭', fontSize: '23' },
    { text: '😔', fontSize: '23' },
    { text: '😐', fontSize: '23' }, 
    { text: '🙂', fontSize: '23' },
    { text: '😁', fontSize: '23' },
  ];

  const scoreRanges = [
    { min: 0, max: 20, label: 'נמוכה מאוד', color: '#FF471A' },
    { min: 21, max: 40, label: 'נמוכה יחסית', color: '#F6961E' },
    { min: 41, max: 60, label: 'בינונית', color: '#ECDB23' },
    { min: 61, max: 80, label: 'בינונית - גבוהה', color: '#AEE228'  },
    { min: 81, max: 100, label: 'גבוהה מאוד', color: '#6AD72D' }
  ];

  React.useEffect(() => {
    console.log(props.valuesArray)
    updateUserScore(props.userEmail, calcScore());
    const timer = setTimeout(() => {
      setDelay(true);
      return () => clearTimeout(timer);
    }, 3500);

    // if (calcScore() <= 30) {
    //   setComment('הגמישות המטבולית שלך נמוכה, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
    // } else if (calcScore() <= 70) {
    //   setComment('הגמישות המטבולית שלך בינונית, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
    // } else {
    //   setComment('הגמישות המטבולית שלך טובה! צפה בסרטון על מנת לקחת אותה לשלב הבא');
    // }
    const score = calcScore();

    switch (true) {
      case score <= 20:
        setComment('הגמישות המטבולית שלך נמוכה מאוד, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
        break;
      case score <= 40:
        setComment('הגמישות המטבולית שלך נמוכה יחסית, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
        break;
      case score <= 60:
        setComment('הגמישות המטבולית שלך בינונית, צפה בסרטון על מנת לרדת במשקל ולהגיע לרמות אנרגיה גבוהות');
        break;
      case score <= 80:
        setComment('הגמישות המטבולית שלך בינונית - גבוהה, צפה בסרטון על מנת לקחת אותה לשלב הבא');
        break;
      case score <= 100:
        setComment('הגמישות המטבולית שלך גבוהה מאוד, צפה בסרטון על מנת לקחת אותה לשלב הבא');
        break;
      default:
        setComment('');
        break;
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
      if (currentScore !== -1 && userData.open) {  
        if (userData.new_score !== -1) {
          await updateDoc(doc(usersRef, userDoc.id), { score: userData.new_score });
          await updateDoc(doc(usersRef, userDoc.id), { new_score: score });
        } else{
          await updateDoc(doc(usersRef, userDoc.id), { new_score: score });
        } 
        await updateDoc(doc(usersRef, userDoc.id), { open: false });
      } else {
          if (currentScore === -1){
            await updateDoc(doc(usersRef, userDoc.id), { score });
          } 
      }
        // console.log(`Score for user ${email} is not -1. Not updating score.`);

      // console.log(`Score updated for user ${email}`);
    } catch (error) {
      // console.error('Error updating user score:', error);
    }
  };

  const updateUserInfo = async () => {
    try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', props.userEmail));
    const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { more_info: true });
        console.log('User information updated successfully!');
      } else {
        console.log('User not found!');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const updateUserQuestion = async (user_question) => {
    try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', props.userEmail));
    const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { question: user_question });
        setOpenSnack(true);
        console.log('User information updated successfully!');
      } else {
        console.log('User not found!');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleCloseAlert = () => {
    setOpenSnack(false);
  };

  const flattenArray = (arr) => {
    const flattenedArray = [];
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        flattenedArray.push(arr[i][j]);
      }
    }
  
    return flattenedArray;
  }
  
  const calculateAverageValue = (arr) => {
    let sum = 0;
    let count = 0;
  
    const flattenedArray = flattenArray(arr);
  
    flattenedArray.forEach(obj => {
      if (obj.value !== null && obj.value !== 0) {
        sum += obj.value;
        count++;
      }
    });
  
    const average = count > 0 ? sum / count : 0;
    return average;
  }


const calcScore = () => {
  if (props.exist[0]) {
      console.log(props.sum)
      return props.sum;
  } else { // not exist
      console.log(calculateAverageValue(props.valuesArray) * 20)
      //return Math.round((props.sum / (props.numOfQuestions * 5)) * 100);
      return Math.round(calculateAverageValue(props.valuesArray) * 20)
  }
};



  const getScoreData = (score) => {
    const matchedRange = scoreRanges.find((range) => score >= range.min && score <= range.max);
    return matchedRange ? { label: matchedRange.label, color: matchedRange.color } : {};
  };

  const handelVideoOpen = () => {
    setVideoOpen(true);
  };
  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  const scoreData = getScoreData(calcScore());

  return (
    <Box container="true" display='flex' flexDirection='column' sx={{ alignItems: 'center' }}>
      <ReactSpeedometer
        height= {props.fullScreen ? 200 : 230} 
        width={props.fullScreen ? 350 : 400}
        needleHeightRatio={props.fullScreen ? 0.5 : 0.6}
        maxValue={5}
        value={calcScore() / 20} // devided by 20 because the range of the Speedometer is 1-5
        ringWidth={47}
        needleTransitionDuration={3333}
        needleColor={'#90f2ff'}
        textColor={'#0d446c'}
        customSegmentLabels={labels}
        currentValueText={' '}
      />
          <Typography component="span" variant='h3' display="block"  textAlign="center" style={{ color: scoreData.color, flex: 1 }}>
            <strong>{calcScore()}</strong>
          </Typography>
          <Typography component="span" variant='h5' display="block"  sx={{flex: 1}} align='center'>
          מידת הגמישות המטבולית שלך 
          </Typography>
          <Typography component="span" variant='h5' display="block"  style={{ color: scoreData.color, flex: 1 }}>
            <strong>{scoreData.label}</strong>
          </Typography>
      <Grow in={Delay} timeout={2000}>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
          <Fab onClick={handelVideoOpen} size='medium' variant='extended' color='primary' sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', width: props.fullScreen ? '100%' : '100%', mt: 3 }}>
            <Typography variant='body1' sx={{ display: 'inline-block' }}>
              המשך לטיפים
            </Typography>
            <TipsAndUpdatesOutlinedIcon sx={{ mr: 2 }} />
          </Fab>
          <CustomTextField onSendQuestion={updateUserQuestion}></CustomTextField>
        </div>
      </Grow>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseAlert} >
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" variant="filled"
              sx={{ width: '100%', justifyContent: 'center' }} >
                &nbsp; השאלות נשלחו, אענה בהקדם (=
          </Alert>
      </Snackbar>

      <MainVideo videoId={'2C4ybI41_v8'} title={comment} fullScreen={props.fullScreen} open={videoOpen} onClose={handleVideoClose} onUpdateUserInfo={updateUserInfo}></MainVideo>
    </Box>
  );
}
