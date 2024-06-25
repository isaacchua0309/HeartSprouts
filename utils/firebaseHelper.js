import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getRaectNativePersistence } from "firebase/auth";
// import { ReactNativeAsyncStorage } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

let firebassApp;

export const getFirebaseApp = () => {
    if (firebaseApp) {
        return firebaseApp
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

      const app = getApps().length === 0 ? initializaApp(firebaseConfig) : getApp();
      

      // Initialize Firebasee Auth with React Native persistence
      initializeAuth(app, {
          persistence: getRaectNativePersistence(ReactNativeAsyncStorage)
      })

      firebaseApp = app;

      return app;
    }
