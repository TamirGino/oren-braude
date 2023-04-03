import React, { useState } from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../Form/FormInput';
import Start from '@mui/icons-material/Start';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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
  const q = query(collection(db, 'users'), where('email', '==', email));
  const doc = await getDocs(q);
  if (doc.size > 0) {
    console.log(doc.docs[0].data().score);
    return doc.docs[0].data().score;
  } else {
    return -1;
  }
};

export default function StepOneOne(props) {
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

  const [isLoading, setIsLoading] = useState(false);

  // 👇 Form Handler
  const onSubmitHandler = async (values) => {
    console.log(values.email);
    const emailExists = await checkEmailExists(values.email);
    if (emailExists !== -1) {
      //alert('Email already exists in database!');
      // props.handleForm(emailExists);
      setIsLoading(true);
      // console.log('If');
      callSetTimeout(emailExists);
    } else {
      try {
        const newUser = doc(collection(db, 'users'));
        await setDoc(newUser, { id: newUser.id, email: values.email, first_name: values.name, last_name: values.Lname, open: true, score: -1 });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(true);
      // console.log("Else")
      callSetTimeout(emailExists);
      // const timer = setTimeout(() => {
      //   setIsLoading(false);
      //   console.log('This will run after 2 second!');
      //   props.handleForm(emailExists);
      //   return () => clearTimeout(timer);
      // }, 2000);
    }
    props.handleEmail(values.email);
  };

  const callSetTimeout = (emailExists) => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('This will run after 2 second!');
      props.handleForm(emailExists);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // 👇 Returned JSX
  return (
    <FormProvider {...methods}>
      <Grid item container justifyContent='center'>
        <Grid item xs={12} sm={6} justifyContent='center'>
          <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <FormInput label='שם פרטי' type='text' name='name' focused required />
            <FormInput label='שם משפחה' type='text' name='Lname' focused required />
            <FormInput label='כתובת מייל' type='email' name='email' focused required />
            <Divider sx={{ borderBottomWidth: 2 }} />{' '}
            <LoadingButton
              variant='outlined'
              type='submit'
              endIcon={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body1' sx={{ display: 'inline-block' }}>
                    התחל
                  </Typography>
                  <KeyboardBackspaceIcon sx={{ mr: 1 }} />
                </Box>
              }
              loading={isLoading}
              sx={{
                fontSize: '15px',
                py: '0.6rem',
                mt: 2,
                width: '45%',
                marginInline: 'auto',
              }}
            ></LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
