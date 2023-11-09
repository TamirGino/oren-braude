import React, { useEffect, useState } from 'react';
import Login from './Login';
import UsersTable from './UsersTable';
import { db } from '../../config/firebase';
import { doc, getDoc } from "firebase/firestore";

const Admin = () => {

const [formDetails,setFormDetails] = useState({user_name: '', password: ''});
const [alertUnmatchedMsg,setAlertUnmatchedMsg] = useState("");
const [isAdmin,setIsAdmin] = useState(false);

useEffect(() => {
const checkAdminData = async () => {
    setAlertUnmatchedMsg("")
    const docRef = doc(db, "admin", "1");
    const docSnap = await getDoc(docRef);
    try {
        if (docSnap.exists()) {
            if (formDetails.user_name === docSnap.data().user_name && formDetails.password === docSnap.data().password) {
                setIsAdmin(true)
            } else{
                setAlertUnmatchedMsg("Wrong User Or Password")
            }
          } else {
            console.log("No such document!");
          }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    if(formDetails.user_name.length !== 0 && formDetails.password.length !== 0 )
    checkAdminData();
  }, [formDetails]);


  return (
    isAdmin ? (
        <UsersTable/>
    ) : (
        <Login setFormDetails={setFormDetails} alertUnmatchedMsg={alertUnmatchedMsg}/>
    )
  );
};

export default Admin;