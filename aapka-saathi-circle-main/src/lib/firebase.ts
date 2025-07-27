import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
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

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Initialize Analytics (optional - only in production)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

// For development - uncomment these if you want to use Firebase emulators
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectFunctionsEmulator(functions, 'localhost', 5001);
// }

export default app;