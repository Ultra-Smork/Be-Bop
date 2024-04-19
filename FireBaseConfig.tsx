import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "Your own",
  authDomain: "Your own",
  projectId: "Your own",
  storageBucket: "Your own",
  messagingSenderId: "Your own",
  appId: "Your own"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
