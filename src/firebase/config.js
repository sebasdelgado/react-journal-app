// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS3Q16OxCtBtbIYIZr1Fo6v0IcO1WTeU0",
  authDomain: "react-cursos-f8d2d.firebaseapp.com",
  projectId: "react-cursos-f8d2d",
  storageBucket: "react-cursos-f8d2d.appspot.com",
  messagingSenderId: "38452091627",
  appId: "1:38452091627:web:2eb08e7a3b4de767d43cae"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );