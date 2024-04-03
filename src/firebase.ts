import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and export
const db = getFirestore(firebaseApp)

const storage = getStorage(firebaseApp)

export { firebaseApp, db, storage }

