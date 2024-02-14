// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX3653Rn0y9-UOe6M-5PX5-wTIm5j-SCc",
  authDomain: "startbrains-tutor-dashboard.firebaseapp.com",
  projectId: "startbrains-tutor-dashboard",
  storageBucket: "startbrains-tutor-dashboard.appspot.com",
  messagingSenderId: "834177057566",
  appId: "1:834177057566:web:67f80a98ff7970c8897f0f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase
