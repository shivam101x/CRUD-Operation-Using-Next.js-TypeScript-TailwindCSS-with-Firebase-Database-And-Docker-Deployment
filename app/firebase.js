// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkeRprkA-I2yqCuHYqzgwCAbTnGncqML4",
  authDomain: "webapp-5b739.firebaseapp.com",
  projectId: "webapp-5b739",
  storageBucket: "webapp-5b739.appspot.com",
  messagingSenderId: "744700188942",
  appId: "1:744700188942:web:cbfab78ed51e35ca731f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);