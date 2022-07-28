// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8_f7EUtWPaKP8ftaVwnu5KUpjy70zUJM",
  authDomain: "livechatroom-c8bc4.firebaseapp.com",
  projectId: "livechatroom-c8bc4",
  storageBucket: "livechatroom-c8bc4.appspot.com",
  messagingSenderId: "405789763164",
  appId: "1:405789763164:web:d634424183307069c02899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}