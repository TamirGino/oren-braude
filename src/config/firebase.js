import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'project-oren-377a1.firebaseapp.com',
  projectId: 'project-oren-377a1',
  storageBucket: 'project-oren-377a1.appspot.com',
  messagingSenderId: '722141270156',
  appId: '1:722141270156:web:5ccb58a46be83dc34a2ba9',
  measurementId: 'G-Z5BHGBMX24',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
