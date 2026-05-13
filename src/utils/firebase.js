// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX7V0TzF86CKPBe2cgWLldfQy-fjVvaQQ",
  authDomain: "netflix-clone-b4715.firebaseapp.com",
  projectId: "netflix-clone-b4715",
  storageBucket: "netflix-clone-b4715.firebasestorage.app",
  messagingSenderId: "428444724532",
  appId: "1:428444724532:web:1fa75b8071a6cb964b8961",
  measurementId: "G-CP0FB8VM49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);