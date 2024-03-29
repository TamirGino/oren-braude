import React, { useState } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import { LoadingButton } from '@mui/lab';
import { db } from '../../config/firebase';

import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

// 👇 SignUp Schema with Zod
const signupSchema = object({
  name: string().min(1, 'זהו שדה חובה').max(70),
  Lname: string().min(1, 'זהו שדה חובה').max(70),
  email: string().min(1, 'זהו שדה חובה').email('כתובת מייל לא תקינה'),
});

export const checkEmailExists = async (email) => {
  const secondAttempt = await checkEmailOpen(email);

  if(secondAttempt){ //"open" field is true - the user can make a second attemp
    return 1000
  }
  const q = query(collection(db, 'users'), where('email', '==', email));
  const doc = await getDocs(q);
  //console.log(doc.docs[0].data().scores.first.score)
  if (doc.size > 0) {
    if (doc.docs[0].data().scores.third.score !== -1){
      return doc.docs[0].data().scores.third.score;
    } else if (doc.docs[0].data().scores.second.score !== -1){
      return doc.docs[0].data().scores.second.score;
    } else {
      return doc.docs[0].data().scores.first.score;
    }
  } else { // email does not exist
    return -1;
  }
};

export const checkEmailOpen = async (email) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const doc = await getDocs(q);
  if (doc.size > 0) {
    return doc.docs[0].data().open;
  } 
  // else {
  //   return -1;
  // }
};

export default function Register(props) {

  const [isLoading, setIsLoading] = useState(false);

  // 👇 Default Values
  const defaultValues = {
    name: '',
    Lname: '',
    email: '',
  };
  // 👇 Object containing all the methods returned by useForm
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });


  // 👇 Form Handler
  const onSubmitHandler = async (values) => {
    setIsLoading(true);
    const emailExists = await checkEmailExists(values.email);
    if (emailExists === -1) {
      console.log(emailExists);
      //Email doesn't exist in database!;
      try {

        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        let maxId = 0;

        snapshot.forEach((doc) => {
          const docId = parseInt(doc.id);
          if (docId > maxId) {
            maxId = docId;
          }
        });
        const newUserId = maxId + 1;
        // insert submition date and time 
        // const currentDate = new Date();
        // const day = String(currentDate.getDate()).padStart(2, '0');
        // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        // const year = currentDate.getFullYear();
        // const formattedDate = `${day}-${month}-${year}`;

        // const hours = String(currentDate.getHours()).padStart(2, '0');
        // const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        // const formattedTime = `${hours}:${minutes}`; 

        // Add the new user to Firestore
        const newDocRef = doc(usersRef, String(newUserId));
        await setDoc(newDocRef, { id: newUserId, email: values.email, first_name: values.name,
           last_name: values.Lname, open: true,  more_info: false,
            scores: {first: { date : "", score: -1 },
                    second: { date : "", score: -1 },
                    third: { date : "", score: -1 }},   
          });
        
        // const newUser = doc(collection(db, 'users'));
        // await setDoc(newUser, { id: newUser.id, email: values.email, first_name: values.name, last_name: values.Lname, open: true, score: -1 });
      } catch (err) {
        console.log(err);
      }
    }
    callSetTimeout(emailExists);
    props.handleEmail(values.email);
  };

  const callSetTimeout = (scoreEmailExists) => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      props.handleForm(scoreEmailExists);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <FormProvider {...methods}>
      <Grid item container justifyContent='center'>
        <Grid item xs={12} sm={6} justifyContent='center'>
          <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <FormInput label='שם פרטי' type='text' name='name' focused required />
            <FormInput label='שם משפחה' type='text' name='Lname' focused required />
            <FormInput label='כתובת מייל' type='email' name='email' focused required />
            <LoadingButton
              variant='contained'
              type='submit'
              endIcon={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body1' sx={{ display: 'inline-block' }}>
                    המשך
                  </Typography>
                </Box>
              }
              loading={isLoading}
              loadingIndicator={<CircularProgress color='primary' size={40} />}
              sx={{
                fontSize: '15px',
                py: '0.6rem',
                mt: 4,
                width: '100%',
                marginInline: 'auto',
                borderRadius:'5px'
              }}
            ></LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}