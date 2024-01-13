// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx3qgjmKSMLsysfgNfdZGfpliNLC7DSsQ",
  authDomain: "todo-raheem.firebaseapp.com",
  databaseURL: "https://todo-raheem-default-rtdb.firebaseio.com",
  projectId: "todo-raheem",
  storageBucket: "todo-raheem.appspot.com",
  messagingSenderId: "995949691300",
  appId: "1:995949691300:web:6f6be48d8f1c2ce78a4131",
  measurementId: "G-97YR48293B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export { db, auth };
