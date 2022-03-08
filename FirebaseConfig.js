import { initializeApp } from 'firebase/app';
//import { getDatabase } from "firebase/database";
import { getFirestore} from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);

//export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const auth =  getAuth();
