import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCEXLBj3MqQi4DmEtt_kvdVNhBBp6E88kQ',
  authDomain: 'travelpal-bt3103.firebaseapp.com',
  projectId: 'travelpal-bt3103',
  storageBucket: 'travelpal-bt3103.appspot.com',
  messagingSenderId: '356625691288',
  appId: '1:356625691288:web:0547868dfe171ffa8dd6ed'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firestore and export
const db = getFirestore(firebaseApp)

export { firebaseApp, db }
