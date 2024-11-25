// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiNvHN8TNdhZbhlGTlToX4q855AcFnLF4",
  authDomain: "next-16315.firebaseapp.com",
  projectId: "next-16315",
  storageBucket: "next-16315.firebasestorage.app",
  messagingSenderId: "274233236801",
  appId: "1:274233236801:web:8fb07bead6dac6e418d5c0",
  measurementId: "G-P6JNV4NK18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);