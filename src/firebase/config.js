// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCktFwF-oSzHMFEoJ1B-fIt-xDGktvgtvo',
  authDomain: 'eshop-3b87b.firebaseapp.com',
  projectId: 'eshop-3b87b',
  storageBucket: 'eshop-3b87b.appspot.com',
  messagingSenderId: '895402800642',
  appId: '1:895402800642:web:8ba28816b8c5edffd1191b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
