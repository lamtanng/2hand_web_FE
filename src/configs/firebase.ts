// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: 'AIzaSyB2-GKrW3AHdwXPdBn9cXRV2kPtAJUPZRs',
  authDomain: 'handweb-884f3.firebaseapp.com',
  projectId: 'handweb-884f3',
  storageBucket: 'handweb-884f3.firebasestorage.app',
  messagingSenderId: '958168707774',
  appId: '1:958168707774:web:46a120c470f495b644a4ef',
  measurementId: 'G-E65FX08CRZ',
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
