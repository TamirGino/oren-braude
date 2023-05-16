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
  const q = query(collection(db, 'users'), where('email', '==', email));
  const doc = await getDocs(q);
  if (doc.size > 0) {
    return doc.docs[0].data().score;
  } else {
    return -1;
  }
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
      //Email doesn't exist in database!;
      try {
        const newUser = doc(collection(db, 'users'));
        await setDoc(newUser, { id: newUser.id, email: values.email, first_name: values.name, last_name: values.Lname, open: true, score: -1 });
      } catch (err) {
        //console.log(err);
      }
    }
    callSetTimeout(emailExists);
    props.handleEmail(values.email);
  };

  const callSetTimeout = (emailExists) => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      props.handleForm(emailExists);
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
