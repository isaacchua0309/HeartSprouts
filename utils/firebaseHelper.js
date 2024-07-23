// utils/firebaseHelper.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

let firebaseApp;

const firebaseConfig = {
  apiKey: "AIzaSyAYUVRxi4HvL7jkGZ19w0opYnU47IsA0UM",
  authDomain: "mainheartsprouts.firebaseapp.com",
  projectId: "mainheartsprouts",
  storageBucket: "mainheartsprouts.appspot.com",
  messagingSenderId: "1010946085665",
  appId: "1:1010946085665:web:63857716071c36dd32e460",
  measurementId: "G-RKW11JX0E4"
};

export const getFirebaseApp = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
};

export const firestore = getFirestore(getFirebaseApp());
export const storage = getStorage(getFirebaseApp());
export const auth = getAuth(getFirebaseApp());


