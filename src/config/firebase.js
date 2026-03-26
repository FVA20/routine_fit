import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJ7nqNMRI-zw-zbt2alFzxG8UD48UUW74",
  authDomain: "routinefit-40f14.firebaseapp.com",
  projectId: "routinefit-40f14",
  storageBucket: "routinefit-40f14.firebasestorage.app",
  messagingSenderId: "387361037173",
  appId: "1:387361037173:web:c80ab8518917ea6cce513c",
  measurementId: "G-T3EC1ZLBSW"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
