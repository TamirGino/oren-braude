import * as React from 'react';
import { Grid } from '@mui/material';
import ReactSpeedometer from 'react-d3-speedometer';
import { db } from '../../config/firebase';
import { addDoc, collection, doc, getDoc, updateDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import {checkEmailExists} from '../Survey/StepOne'



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

  //console.log((props.sum/9)*200)
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
      //console.log(props.userEmail);
      //const score = checkEmailExists(props.userEmail);
      //console.log(score);
      //score.then((data) => {
        //console.log('Received data:', data);
      //});
  updateUserScore(props.userEmail, props.sum);
  }, []);

  return (
    <Grid item container justifyContent='center'>
      <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={(props.sum / 9) * 200}
        currentValueText=' מידת הגמישות המטבולית שלך'
        customSegmentLabels={[
          {
            text: 'Very Bad',
            // position: 'INSIDE',
            color: '#555',
          },
          {
            text: 'Bad',
            // position: 'INSIDE',
            color: '#555',
          },
          {
            text: 'Ok',
            // position: 'INSIDE',
            color: '#555',
            fontSize: '19px',
          },
          {
            text: 'Good',
            // position: 'INSIDE',
            color: '#555',
          },
          {
            text: 'Very Good',
            // position: 'INSIDE',
            color: '#555',
          },
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        // needleTransition='easeLinear'
        needleColor={'#90f2ff'}
        textColor={'#0d446c'}
      />
    </Grid>
  );
}
