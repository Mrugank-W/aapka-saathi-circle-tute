// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7-KSU-Gz1mFdSeHLcbHbYI1eTb904Qo0",
  authDomain: "aapka-saathi-mrugank.firebaseapp.com",
  projectId: "aapka-saathi-mrugank",
  storageBucket: "aapka-saathi-mrugank.firebasestorage.app",
  messagingSenderId: "203784017418",
  appId: "1:203784017418:web:7f57a3d685ef53c927f1f3",
  measurementId: "G-SV90NH4F3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);