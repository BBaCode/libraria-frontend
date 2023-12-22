import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVU9fB1VueBzPiF7jFn0-5O3V4BAQ-EL0",
  authDomain: "libraria-732ca.firebaseapp.com",
  projectId: "libraria-732ca",
  storageBucket: "libraria-732ca.appspot.com",
  messagingSenderId: "115290080062",
  appId: "1:115290080062:web:d24a2ccd8faceaa3ca226f",
  measurementId: "G-5ZBYF76BTN",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
};
