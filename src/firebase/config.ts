import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBgnrf-TSsklcY7Y7I_vDh4cfG4BHsRVmc',
  authDomain: 'journalapp-5d20a.firebaseapp.com',
  projectId: 'journalapp-5d20a',
  storageBucket: 'journalapp-5d20a.appspot.com',
  messagingSenderId: '1012628453264',
  appId: '1:1012628453264:web:d9ad8443fe7407f1956515',
  measurementId: 'G-LCCY773Y1W',
};

export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);
