// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "womble-roadkill-count.firebaseapp.com",
  databaseURL: process.env.VUE_APP_FIREBASE_RTDB_URL,
  projectId: "womble-roadkill-count",
  storageBucket: "womble-roadkill-count.appspot.com",
  messagingSenderId: "34854222339",
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-HRS7ZYYXJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;