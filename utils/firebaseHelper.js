import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

let firebaseApp;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAYUVRxi4HvL7jkGZ19w0opYnU47IsA0UM",
    authDomain: "mainheartsprouts.firebaseapp.com",
    projectId: "mainheartsprouts",
    storageBucket: "mainheartsprouts.appspot.com",
    messagingSenderId: "1010946085665",
    appId: "1:1010946085665:web:63857716071c36dd32e460",
    measurementId: "G-RKW11JX0E4"
  };

  // Initialize Firebase app
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth with React Native persistence
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

  firebaseApp = app;

  return app;
};
