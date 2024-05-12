// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkDMu4KoqhQOfbxAsVfHE-jnBE61qEijI",
  authDomain: "make-my-day-df562.firebaseapp.com",
  databaseURL: "https://make-my-day-df562-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "make-my-day-df562",
  storageBucket: "make-my-day-df562.appspot.com",
  messagingSenderId: "119706820843",
  appId: "1:119706820843:web:20c30d06dea516c2cb1eae",
  measurementId: "G-49NV11K11T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);       // for 인증
const storage = getStorage(app); // for 스토리지
const db = getFirestore(app);    // for 데이터베이스

export {db}