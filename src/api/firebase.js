// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyCvd16xyBrISnfefW4GhOXtQeN-SVqUipE',
  authDomain: 'secret-family.firebaseapp.com',
  projectId: 'secret-family',
  storageBucket: 'secret-family.appspot.com',
  messagingSenderId: '564717251448',
  appId: '1:564717251448:web:8992cd88a477de7230f68d'
});

// Initialize Firebase
export const dbFirestore = getFirestore(firebaseConfig);
export const auth = getAuth(firebaseConfig);