import { initializeApp } from 'firebase/app';
//import { getDatabase } from "firebase/database";
import {initializeFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import {APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from '@env';

// need to run: npm install --save firebase
// We will use the JS SDK with React Native

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {useFetchStreams: false})

//export const db = initializeFirestore(app, {useFetchStreams: false})
//export const db = getFirestore(app);
export const auth =  getAuth();
