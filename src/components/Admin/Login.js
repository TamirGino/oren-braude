import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ConstructionOutlined } from '@mui/icons-material';

export default function Login({setFormDetails, alertUnmatchedMsg}) {

  const [userName,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("")

  useEffect(() => {
    if(alertUnmatchedMsg.length !== 0)
    setOpenAlert(true)
    setAlertMsg(alertUnmatchedMsg)
      }, [alertUnmatchedMsg]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleSubmit = (event) => {
    if (userName === "" || password === "") {
      setAlertMsg("All fields are required");
      setOpenAlert(true);
    } else{
        setFormDetails({user_name:userName, password:password})
    }
  };

  const onUserNameChange = (event) => {
    setUserName(event.target.value)
  }

  const onPassChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
    <div style={{display:'flex',flexDirection: 'column', justifyContent:'center',alignItems:'center', height:'100vh'}}>
    <div style={{width:'100%'}}>
    <Container sx={{
            border:"1px solid black",
            backgroundColor: 'black',
            backgroundImage: `
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
            radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)
            `,
            backgroundSize: '550px 550px, 350px 350px, 250px 250px, 150px 150px',
            backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px',
            borderRadius:'10px',
            height:'100%',
        }} component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
            }}
            >
            
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOpenIcon />
            </Avatar>
            <Typography sx={{color:"white"}} component="h1" variant="h5">
                Admin
            </Typography>
            <Box sx={{ mt: 5, display:'flex', flexFlow:'column wrap', gap:'20px', width:'100%', justifyContent:'center' }}>
                <TextField
                onChange={onUserNameChange}
                variant="filled"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
                sx={{
                    backgroundColor: 'white', borderRadius:'5px',
                }}
                />
                <TextField
                onChange={onPassChange}
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                    backgroundColor: 'white', borderRadius:'5px',
                }}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                onClick={handleSubmit}
                >
                Log In
                </Button>
                
            </Box>
            
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{
            vertical: 'top', 
            horizontal: 'center', 
        }}>
            <Alert onClose={handleClose} severity="error" variant="outlined" sx={{ width: '100%' }}>
            {alertMsg} 
            </Alert>
        </Snackbar>
            
        </Container>
    </div>
        
    </div>
    </>
        );
}