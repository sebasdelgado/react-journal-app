// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
//Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyBS3Q16OxCtBtbIYIZr1Fo6v0IcO1WTeU0",
//   authDomain: "react-cursos-f8d2d.firebaseapp.com",
//   projectId: "react-cursos-f8d2d",
//   storageBucket: "react-cursos-f8d2d.appspot.com",
//   messagingSenderId: "38452091627",
//   appId: "1:38452091627:web:2eb08e7a3b4de767d43cae"
// };

// Your web app's Firebase configuration
//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDEG5YjL9032JUf8FIW6LMwc7KiYXNjv10",
//   authDomain: "react-cursos-testing-7f0d0.firebaseapp.com",
//   projectId: "react-cursos-testing-7f0d0",
//   storageBucket: "react-cursos-testing-7f0d0.appspot.com",
//   messagingSenderId: "1066464362100",
//   appId: "1:1066464362100:web:d661e568419f46fec31b21"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );