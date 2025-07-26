import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  // This would be replaced with actual Firebase config in production
  apiKey: "demo-api-key",
  authDomain: "aapka-saathi-demo.firebaseapp.com",
  projectId: "aapka-saathi-demo",
  storageBucket: "aapka-saathi-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;