import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCUkdLNX97CYn9EebL-gagIP7WUc8lVMoY",
  authDomain: "project-helper-app.firebaseapp.com",
  projectId: "project-helper-app",
  storageBucket: "project-helper-app.appspot.com",
  messagingSenderId: "838571349569",
  appId: "1:838571349569:web:6c2225ae9cde747ef1d8c0"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);